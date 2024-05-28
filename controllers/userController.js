const jwt = require("jsonwebtoken");
const db = require("../config/db");
const bcrypt = require('bcryptjs');

const generateToken = (_username, _role) => {
    return jwt.sign({ _username, _role }, process.env.JWT_SECRET, { expiresIn: "3d" });
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

        const role = result.rows[0].user_role;
        // console.log(role);

        // Compare the hashed password
        const isValidPassword = await bcrypt.compare(password, result.rows[0].password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const accessToken = generateToken(username, role);
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('username', username, { httpOnly: true });
        res.cookie('role', role, { httpOnly: true });
        res.status(200).json({ accessToken, username, role });


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
        await db.query(query, [username, hashedPassword, email, full_name, phone_number, user_role]);

        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        const role = result.rows[0].user_role;

        const accessToken = generateToken(username, role);
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('username', username, { httpOnly: true });
        res.cookie('accessToken', role, { httpOnly: true });
        res.status(200).json({ accessToken, username, role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getUserInfo = async (req, res) => {
    const username = req.username;

    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        const userInfo = result.rows[0];

        // console.log("called")
        res.status(200).json(userInfo);
        // res.status(200).json({ message: 'hello ' + username });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }




}

const getAllUserInfo = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');

        const allUserInfo = result.rows;

        // console.log("called")
        res.status(200).json(allUserInfo);
        // res.status(200).json({ message: 'hello ' + username });


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const editUser = async (req, res) => {
    const { username, full_name, user_role, email, phone_number, registration_date, user_id } = req.body;
    try {
        const result = await db.query('UPDATE users SET username = $2, full_name = $3, user_role = $4, email = $5, phone_number = $6, registration_date = $7 WHERE user_id = $1',
            [
                user_id,
                username,
                full_name,
                user_role,
                email,
                phone_number,
                registration_date
            ]
        )

        res.status(200).json({ message: "User edited successfully!" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteUser = async (req, res)=>{
    const {user_id} = req.body;

    try {
        const result = await db.query('DELETE FROM users WHERE user_id = $1',
            [
                user_id,
            ]
        )

        console.log(result);
        res.status(200).json({ message: `User deleted successfully! User ID: ${user_id}.` });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getUserBooks = async (req, res) =>{

    try {
        const result = await db.query(' SELECT * FROM books INNER JOIN users ON books.user_id = users.user_id WHERE users.user_id = $1',
            [
                req.params.userId,
            ]
        )

        const userBooks = result.rows;
        res.status(200).json(userBooks);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const searchedUserInfo = async (req, res) => {

    
    //select * from users where username like '%a%';

    try {
        const result = await db.query('SELECT * FROM users WHERE username LIKE $1', 
        [
            `%${req.params.username}%`
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
    signupUser,
    loginUser,
    getUserInfo,
    getAllUserInfo,
    editUser,
    deleteUser,
    getUserBooks,
    searchedUserInfo
};
