const db = require("../config/db");

const addBook = async (req, res) => {
    const { user_id, book_date, cellphone_model, issue_description } = req.body;

    const query = 'INSERT INTO books (user_id, book_date, cellphone_model, issue_description) VALUES ($1, $2, $3, $4) ';

    try {
        const result = await db.query(query, [user_id, book_date, cellphone_model, issue_description]);
        res.status(200).json({ message: "Book added successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



// SELECT 
//   b.book_id,
//   b.book_date,
//   u.user_id,
//   u.username,
//   u.full_name,
//   u.email,
//   u.phone_number,
//   rs.status_name AS repair_status,
//   aps.status_name AS appointment_status,
//   b.cellphone_model,
//   b.remark
// FROM 
//   books b
// JOIN 
//   users u ON b.user_id = u.user_id
// JOIN 
//   repair_statuses rs ON b.repair_status_id = rs.repair_status_id
// JOIN 
//   appointment_statuses aps ON b.appointment_status_id = aps.appointment_status_id;


const getAllBook = async (req, res) => {
    let query = 'SELECT b.book_id, b.issue_description, b.book_date, u.user_id, u.username, u.full_name, u.email, u.phone_number,  rs.status_name AS repair_status, aps.status_name AS appointment_status, b.cellphone_model, b.remark FROM books b JOIN users u ON b.user_id = u.user_id JOIN repair_statuses rs ON b.repair_status_id = rs.repair_status_id JOIN appointment_statuses aps ON b.appointment_status_id = aps.appointment_status_id'
    try {
        const result = await db.query(query);

        const allBookInfo = result.rows;

        // console.log("called")
        res.status(200).json(allBookInfo);

        // res.status(200).json({ message: 'hello ' + username });


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// UPDATE books SET 
// user_id = $2, 
// booking_date = $3, 
// cellphone_model = $4, 
// issue_description = $5, 
// repair_status_id = (SELECT repair_status_id FROM repair_statuses WHERE status_name = $6), 
// appointment_status_id = (SELECT appointment_status_id FROM appointment_statuses WHERE status_name = $7) 
// WHERE book_id = $1

const editBook = async (req, res) => {
    const { book_id, book_date, cellphone_model, issue_description, repair_status, user_id, appointment_status } = req.body;

    try {
        const result = await db.query('UPDATE books SET user_id = $2, book_date = $3, cellphone_model = $4, issue_description = $5, repair_status_id = (SELECT repair_status_id FROM repair_statuses WHERE status_name = $6), appointment_status_id = (SELECT appointment_status_id FROM appointment_statuses WHERE status_name = $7) WHERE book_id = $1',
            [
                book_id,
                user_id,
                book_date,
                cellphone_model,
                issue_description,
                repair_status,
                appointment_status
            ]
        )

        console.log(result);
        res.status(200).json({ message: "Book edited successfully!" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



const getAllPendingBooks = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM books WHERE repair_status_id = 1 AND appointment_status_id = 1')
        const allPending = result.rows;

        res.status(200).json(allPending);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const EditPendingBook = async (req, res) => {
    const { booking_id, repair_status } = req.body;

    try {
        const result = await db.query('UPDATE books SET repair_status = $2 WHERE booking_id = $1',
            [
                booking_id,
                repair_status,
            ]
        )

        console.log(result);
        res.status(200).json({ message: `You are now fixing booking id: ${booking_id}.` });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


//select users.username, users.full_name, users.user_id, books.booking_id, books.booking_date, books.cellphone_model, books.issue_description, books.repair_status from users INNER JOIN books on users.user_id=books.user_id;

const getAllPendingAppointment = async(req, res) =>{
    try {
        const result = await db.query('select users.username, books.book_id, books.user_id, books.book_date, books.cellphone_model, books.issue_description from books INNER JOIN users on users.user_id=books.user_id WHERE appointment_status_id = 1');

        const allPendingAppointment = result.rows;

        res.status(200).json(allPendingAppointment);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllApprovedAppointment = async(req, res) =>{
    try {
        const result = await db.query('select users.username, books.book_id, books.repair_status_id, books.user_id, books.book_date, books.cellphone_model, books.issue_description from books INNER JOIN users on users.user_id=books.user_id WHERE appointment_status_id = 2');

        const allApprovedAppointment = result.rows;

        res.status(200).json(allApprovedAppointment);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const getAllNonPendingAppointment = async(req, res) =>{
    try {
        const result = await db.query('SELECT b.book_id, b.issue_description, b.book_date, u.user_id, u.username, u.full_name, u.email, u.phone_number,  rs.status_name AS repair_status, aps.status_name AS appointment_status, b.cellphone_model, b.remark FROM books b JOIN users u ON b.user_id = u.user_id JOIN repair_statuses rs ON b.repair_status_id = rs.repair_status_id JOIN appointment_statuses aps ON b.appointment_status_id = aps.appointment_status_id WHERE (aps.appointment_status_id = 2) OR (aps.appointment_status_id = 3) ORDER BY b.book_date DESC');


        const allPendingAppointment = result.rows;

        res.status(200).json(allPendingAppointment);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const editPendingAppointment = async (req, res) => {
    const { book_id, appointment_status, remark } = req.body;

    try {
        const result = await db.query('UPDATE books SET appointment_status_id = (SELECT appointment_status_id FROM appointment_statuses WHERE status_name = $2 ), remark = $3 WHERE book_id = $1',
            [
                book_id,
                appointment_status,
                remark
            ]
        )

        console.log(result);
        res.status(200).json({ message: `Appointment edited successfully! Book ID: ${book_id}.` });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const deleteBook = async (req, res)=>{
    const {booking_id} = req.body;

    try {
        const result = await db.query('DELETE FROM books WHERE booking_id = $1',
            [
                booking_id,
            ]
        )

        console.log(result);
        res.status(200).json({ message: `Book deleted successfully! Book ID: ${booking_id}.` });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const searchedBookInfo = async (req, res) => {

    
    //select * from users where username like '%a%';

    try {
        const result = await db.query('SELECT b.book_id, b.issue_description, b.book_date, u.user_id, u.username, u.full_name, u.email, u.phone_number,  rs.status_name AS repair_status, aps.status_name AS appointment_status, b.cellphone_model, b.remark FROM books b JOIN users u ON b.user_id = u.user_id JOIN repair_statuses rs ON b.repair_status_id = rs.repair_status_id JOIN appointment_statuses aps ON b.appointment_status_id = aps.appointment_status_id WHERE book_id = $1', 
        [
            `${req.params.book_id}`
        ]);

        const userInfo = result.rows;

        // console.log("called")
        res.status(200).json(userInfo);
        // res.status(200).json({ message: 'hello ' + username });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }




}

const getAllPendingRepairs = async(req, res) =>{
    try {
        const result = await db.query('SELECT b.book_id, b.issue_description, b.book_date, u.user_id, u.username, u.full_name, u.email, u.phone_number,  rs.status_name AS repair_status, aps.status_name AS appointment_status, b.cellphone_model, b.remark FROM books b JOIN users u ON b.user_id = u.user_id JOIN repair_statuses rs ON b.repair_status_id = rs.repair_status_id JOIN appointment_statuses aps ON b.appointment_status_id = aps.appointment_status_id WHERE (rs.repair_status_id = 1) OR (aps.appointment_status_id = 2) ORDER BY b.book_date DESC');


        const allPendingAppointment = result.rows;

        res.status(200).json(allPendingAppointment);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllRepairingBooks = async(req, res) =>{
    try {
        const result = await db.query('SELECT * FROM books WHERE repair_status_id = 2')

        const allRepairing = result.rows;

        res.status(200).json(allRepairing);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllCompletedBooks = async(req, res) =>{
    try {
        const result = await db.query('SELECT * FROM books WHERE repair_status_id = 3')

        const allDone = result.rows;

        res.status(200).json(allDone);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateRepairingBook = async (req, res) => {
    const { book_id, repair_status, progress_time, progress_description} = req.body;

    const progressQuery = 'INSERT INTO progress_trackers (book_id, progress_time, progress_description) VALUES ($1, $2, $3)';
    try {
        const result = await db.query('UPDATE books SET repair_status_id = (SELECT repair_status_id FROM repair_statuses WHERE status_name = $2 ) WHERE book_id = $1',
            [
                book_id,
                repair_status,
            ]
        )

        const progressResult = await db.query(progressQuery,[
            book_id,
            progress_time,
            progress_description,
        ])

        console.log(result, progressResult);
        res.status(200).json({ message: `Repair Updated! Booking ID: ${book_id}.` });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = {
    addBook,
    getAllBook,
    editBook,

    getAllPendingBooks,
    EditPendingBook,

    getAllPendingAppointment,
    getAllApprovedAppointment,
    editPendingAppointment,
    getAllNonPendingAppointment,


    getAllPendingRepairs,
    getAllRepairingBooks,
    getAllCompletedBooks,
    updateRepairingBook,
    
    deleteBook,
    searchedBookInfo
}