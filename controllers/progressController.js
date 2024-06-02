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

module.exports ={
    getAllProgress,
    getBookProgress,
}
