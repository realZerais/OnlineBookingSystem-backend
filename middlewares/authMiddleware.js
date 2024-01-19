const jwt = require('jsonwebtoken');



const cookieJwtAuth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const accessTokentoken = authHeader && authHeader.split(' ')[1];

    try {
        if (accessTokentoken == null) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { _username } = jwt.verify(accessTokentoken, process.env.JWT_SECRET);

        req.username = _username;
        next();
    } catch (error) {
        // res.clearCookie("accessToken");
        res.status(400).json({ error: error.message });
    }
}

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         res.send(user);
//     });
// }


// // Sample middleware for authorization
// const authorize = (role) => {
//     return (req, res, next) => {
//         if (req.user.role !== role) return res.sendStatus(403);
//         next();
//     };
// }

module.exports = {
    cookieJwtAuth,

}