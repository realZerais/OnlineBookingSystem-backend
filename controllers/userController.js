const jwt = require("jsonwebtoken");
const db = require("../config/db");
const bcrypt = require('bcryptjs');

const generateToken = (_username, _role) => {
    return jwt.sign({ _username, _role }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// SELECT 
//   u.user_id,
//   u.username,
//   u.password,
//   u.full_name,
//   ur.role_name AS user_role,
//   u.email,
//   u.phone_number,
//   u.registration_date
// FROM 
//   users u
// JOIN 
//   user_roles ur ON u.role_id = ur.role_id;


const getAllUserInfo = async (req, res) => {
    try {
        const result = await db.query('SELECT u.user_id, u.username, u.full_name, u.email, u.phone_number, u.registration_date, ur.role_name AS user_role FROM users u JOIN user_roles ur ON u.role_id = ur.role_id');

        const allUserInfo = result.rows;

        // console.log("called")
        res.status(200).json(allUserInfo);
        // res.status(200).json({ message: 'hello ' + username });


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getUserInfo = async (req, res) => {
    const username =  req.username;

    try {
        const result = await db.query('SELECT u.user_id, u.username, u.full_name, u.email, u.phone_number, u.registration_date, ur.role_name AS user_role FROM users u JOIN user_roles ur ON u.role_id = ur.role_id WHERE username = $1', [username]);

        const userInfo = result.rows[0];

        // console.log("called")
        res.status(200).json(userInfo);
        // res.status(200).json({ message: 'hello ' + username });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }




}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {

        const result = await db.query('SELECT u.username, u.password, ur.role_name AS user_role FROM users u JOIN user_roles ur ON u.role_id = ur.role_id WHERE u.username =  $1', [username]);
        // const user = result.rows[0];

        // Check if user exist
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        console.log(result.rows[0]);
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
    const role_id = 1;

    const { username, password, email, full_name, phone_number } = req.body;

    const userExist = async () => {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) { // if true, username is valid
            return true;
        } else {
            return false;
        }
    }

//     INSERT INTO users (username, password, full_name, role_id, email, phone_number) VALUES  
// ('user1', 'password1', 'User One', (SELECT role_id FROM user_roles WHERE role_name = 'user'), 'user1@example.com', '123-456-7890');

    const query = 'INSERT INTO users (username, password, email, full_name, phone_number, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ';

    try {
        const isValidUser = await userExist();

        if (!isValidUser) {
            return res.status(401).json({ message: 'Username is already taken!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(query, [username, hashedPassword, email, full_name, phone_number, role_id]);

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


const editUser = async (req, res) => {
    const { username, full_name, user_role, email, phone_number, user_id } = req.body;

    try {
        const result = await db.query('UPDATE users SET username = $2, full_name = $3, role_id = (SELECT role_id FROM user_roles WHERE role_name = $4), email = $5, phone_number = $6 WHERE user_id = $1',
            [
                user_id,
                username,
                full_name,
                user_role,
                email,
                phone_number,
            ]
        )

        console.log(result);

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
        const result = await db.query('SELECT u,user_id, u.username, u.full_name, u.email, u.phone_number, u.registration_date, ur.role_name AS user_role FROM users u JOIN user_roles ur ON u.role_id = ur.role_id WHERE username LIKE $1', 
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
