const jwt = require('jsonwebtoken');

const authenticateToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        res.send(user);
    });
}

// // Sample middleware for authorization
// const authorize = (role) => {
//     return (req, res, next) => {
//         if (req.user.role !== role) return res.sendStatus(403);
//         next();
//     };
// }

module.exports = {
    authenticateToken,

}