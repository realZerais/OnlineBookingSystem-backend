const db = require("../config/db");

const addBook = async (req, res) => {
    const { id, date, model, issue } = req.body;

    const query = 'INSERT INTO cellphone_repair_booking (user_id, booking_date, cellphone_model, issue_description) VALUES ($1, $2, $3, $4) ';

    try {
        const result = await db.query(query, [id, date, model, issue]);
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllBook = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM cellphone_repair_booking');

        const allBookingInfo = result.rows;

        // console.log("called")
        res.status(200).json(allBookingInfo);
        // res.status(200).json({ message: 'hello ' + username });


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    addBook,
    getAllBook
}