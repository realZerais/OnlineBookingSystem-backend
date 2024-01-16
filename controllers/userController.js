const jwt = require("jsonwebtoken");
const db = require("../config/db");
const bcrypt = require('bcryptjs');

const generateToken = (_username) => {
    return jwt.sign({ _username }, process.env.JWT_SECRET, { expiresIn: "3d" });
};



const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {

        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        // const user = result.rows[0];

        // Check if user exist
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the hashed password
        const isValidPassword = await bcrypt.compare(password, result.rows[0].password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const accessToken = generateToken(username);
        res.cookie('token', accessToken, { httpOnly: true });
        res.status(200).json({ accessToken });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }


}
const signupUser = async (req, res) => {
    const user_role = 'user';

    const { username, password, email, full_name, phone_number } = req.body;

    const userExist = async () => {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) { // if true, username is valid
            return true;
        } else {
            return false;
        }
    }


    const query = 'INSERT INTO users (username, password, email, full_name, phone_number, user_role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ';

    try {
        const isValidUser = await userExist();

        if (!isValidUser) {
            return res.status(401).json({ message: 'Username is already taken!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(query, [username, hashedPassword, email, full_name, phone_number, user_role]);

        // res.status(201).send(result.rows[0]);

        const accessToken = generateToken(username);
        res.cookie('token', accessToken, { httpOnly: true });
        res.status(200).json({ accessToken, username });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




module.exports = {
    signupUser,
    loginUser,
};
