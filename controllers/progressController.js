const db = require("../config/db");

//SELECT 
// pt.progress_id,
// pt.progress_time,
// pt.progress_description,
// b.book_id,
// b.book_date,

// u.user_id,
// u.username,
// u.full_name,
// u.email,
// u.phone_number
// FROM 
// progress_trackers pt
// JOIN 
// books b ON pt.book_id = b.book_id
// JOIN 
// users u ON b.user_id = u.user_id;

const getAllProgress = async(req, res) =>{
    try {
        const result = await db.query('SELECT pt.progress_id, pt.progress_time, pt.progress_description, b.book_id, b.book_date, u.user_id, u.username, u.full_name, u.email, u.phone_number FROM progress_trackers pt JOIN books b ON pt.book_id = b.book_id JOIN users u ON b.user_id = u.user_id');


        const AllProgress = result.rows;

        res.status(200).json(AllProgress);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// SELECT u.user_id, u.username, b.book_id, b.book_date, b.cellphone_model, b.remark, rs.status_name AS repair_status, aps.status_name AS appointment_status, pt.progress_id, pt.progress_time, pt.progress_description FROM progress_trackers pt JOIN books b ON pt.book_id = b.book_id JOIN users u ON b.user_id = u.user_id JOIN repair_statuses rs ON b.repair_status_id = rs.repair_status_id JOIN appointment_statuses aps ON b.appointment_status_id = aps.appointment_status_id WHERE u.username = $1 ORDER BY pt.progress_time;

const getAllUserProgress = async(req, res) =>{
    const query = 'SELECT u.user_id, u.username, b.book_id, b.book_date, b.cellphone_model, b.remark, rs.status_name AS repair_status, aps.status_name AS appointment_status, pt.progress_id, pt.progress_time, pt.progress_description FROM progress_trackers pt JOIN books b ON pt.book_id = b.book_id JOIN users u ON b.user_id = u.user_id JOIN repair_statuses rs ON b.repair_status_id = rs.repair_status_id JOIN appointment_statuses aps ON b.appointment_status_id = aps.appointment_status_id WHERE u.username = $1 ORDER BY pt.progress_time DESC'
    try {
        const result = await db.query(query,
            [
                `${req.params.username}`
            ]
        );


        const AllUserProgress = result.rows;

        res.status(200).json(AllUserProgress);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getBookProgress = async(req, res) =>{
    try {
        const result = await db.query('SELECT pt.progress_id, pt.progress_time, pt.progress_description, b.book_id, b.book_date, u.user_id, u.username, u.full_name, u.email, u.phone_number FROM progress_trackers pt JOIN books b ON pt.book_id = b.book_id JOIN users u ON b.user_id = u.user_id where b.book_id = $1', 
        [

            `${req.params.book_id}`
        ]);


        const AllProgress = result.rows;

        res.status(200).json(AllProgress);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getUserBookProgress = async(req, res) =>{
    let query = 'SELECT    u.user_id,   u.username,   b.book_id,   b.book_date,   b.cellphone_model,   b.remark,   rs.status_name AS repair_status,   aps.status_name AS appointment_status,   pt.progress_id,   pt.progress_time,   pt.progress_description FROM    users u JOIN    books b ON u.user_id = b.user_id JOIN    repair_statuses rs ON b.repair_status_id = rs.repair_status_id JOIN    appointment_statuses aps ON b.appointment_status_id = aps.appointment_status_id LEFT JOIN    progress_trackers pt ON b.book_id = pt.book_id WHERE    u.username = $1 ORDER BY    b.book_id, pt.progress_time'

    try {
        const result = await db.query(query, 
        [

            `${req.params.user_id}`
        ]);


        const AllProgress = result.rows;

        res.status(200).json(AllProgress);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




module.exports ={
    getAllProgress,
    getAllUserProgress,
    getBookProgress,
    getUserBookProgress
}
