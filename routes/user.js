const express = require("express");
const { signupUser, loginUser, getUserInfo, getAllUserInfo, editUserRole } = require("../controllers/userController")
const { cookieJwtAuth } = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/login", loginUser);
router.get("/login", (req, res) => {
    res.status(400).json({ "test": "test" })
})

router.post("/signup", signupUser);

router.get("/info", cookieJwtAuth, getUserInfo)
router.get("/allUserInfo", cookieJwtAuth, getAllUserInfo)

router.put("/editUserRole", cookieJwtAuth, editUserRole)

module.exports = router;