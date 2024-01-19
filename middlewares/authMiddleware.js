const jwt = require('jsonwebtoken');



const cookieJwtAuth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "authorization token required" })
    }

    const accessToken = authorization.split(' ')[1];
    console.log(accessToken)

    try {

        const { _username } = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.username = _username;
        next();

    } catch (error) {
        res.clearCookie("accessToken");
        res.status(400).json({ error: "authorization error" });
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