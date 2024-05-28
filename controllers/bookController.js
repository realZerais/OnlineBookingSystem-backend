const db = require("../config/db");

const addBook = async (req, res) => {
    const { user_id, booking_date, cellphone_model, issue_description } = req.body;

    const query = 'INSERT INTO books (user_id, booking_date, cellphone_model, issue_description) VALUES ($1, $2, $3, $4) ';

    try {
        const result = await db.query(query, [user_id, booking_date, cellphone_model, issue_description]);
        res.status(200).json({ message: "Book added successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllBook = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM books');

        const allBookingInfo = result.rows;

        // console.log("called")
        res.status(200).json(allBookingInfo);

        // res.status(200).json({ message: 'hello ' + username });


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const editBook = async (req, res) => {
    const { booking_id, booking_date, cellphone_model, issue_description, repair_status, user_id, appointment_status } = req.body;

    try {
        const result = await db.query('UPDATE books SET user_id = $2, booking_date = $3, cellphone_model = $4, issue_description = $5, repair_status = $6, appointment_status = $7 WHERE booking_id = $1',
            [
                booking_id,
                user_id,
                booking_date,
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

const getAllPendingBook = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM books WHERE repair_status = $1 AND appointment_status = $2',
            [
                'Pending',
                'Approved'
            ]);

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

const getAllRepairingBook = async(req, res) =>{
    try {
        const result = await db.query('SELECT * FROM books WHERE repair_status = $1',
            [
                'Repairing'
            ]);

        const allRepairing = result.rows;

        res.status(200).json(allRepairing);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllDoneBook = async(req, res) =>{
    try {
        const result = await db.query('SELECT * FROM books WHERE repair_status = $1',
            [
                'Done'
            ]);

        const allDone = result.rows;

        res.status(200).json(allDone);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const editRepairingBook = async (req, res) => {
    const { booking_id, repair_status } = req.body;

    try {
        const result = await db.query('UPDATE books SET repair_status = $2 WHERE booking_id = $1',
            [
                booking_id,
                repair_status,
            ]
        )

        console.log(result);
        res.status(200).json({ message: `Repair Finish! Booking ID: ${booking_id}.` });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const getAllPendingAppointment = async(req, res) =>{
    try {
        const result = await db.query('SELECT * FROM books WHERE appointment_status = $1',
            [
                'Pending'
            ]);

        const allPendingAppointment = result.rows;

        res.status(200).json(allPendingAppointment);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllApprovedAppointment = async(req, res) =>{
    try {
        const result = await db.query('SELECT * FROM books WHERE appointment_status = $1',
            [
                'Approved'
            ]);

        const allPendingAppointment = result.rows;

        res.status(200).json(allPendingAppointment);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const editAllPendingAppointment = async (req, res) => {
    const { booking_id, appointment_status } = req.body;

    try {
        const result = await db.query('UPDATE books SET appointment_status = $2 WHERE booking_id = $1',
            [
                booking_id,
                appointment_status,
            ]
        )

        console.log(result);
        res.status(200).json({ message: `Appointment edited successfully! Book ID: ${booking_id}.` });

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
        const result = await db.query('SELECT * FROM books WHERE booking_id = $1', 
        [
            `${req.params.booking_id}`
        ]);

        const userInfo = result.rows;

        // console.log("called")
        res.status(200).json(userInfo);
        // res.status(200).json({ message: 'hello ' + username });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }




}

module.exports = {
    addBook,
    getAllBook,
    editBook,
    getAllPendingBook,
    EditPendingBook,
    getAllRepairingBook,
    getAllDoneBook,
    editRepairingBook,
    getAllPendingAppointment,
    editAllPendingAppointment,
    getAllApprovedAppointment,
    deleteBook,
    searchedBookInfo
}