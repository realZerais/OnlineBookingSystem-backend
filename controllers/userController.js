const jwt = require("jsonwebtoken");
const db = require("../config/db");
const bcrypt = require('bcryptjs');



const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {

        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user || password != user.password) {
            return res.status(401).send('Invalid username or password');
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
        res.send({ token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }


}
const signupUser = async (req, res) => {
    const user_role = 'user';
    const { username, password, email, full_name, phone_number } = req.body;

    const query = 'INSERT INTO users (username, password, email, full_name, phone_number, user_role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ';
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(query, [username, hashedPassword, email, full_name, phone_number, user_role]);
        res.status(201).send(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




module.exports = {
    signupUser,
    loginUser,
};
