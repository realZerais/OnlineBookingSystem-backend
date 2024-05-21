const express = require("express");
const { signupUser, loginUser, getUserInfo, getAllUserInfo, editUser } = require("../controllers/userController")
const { cookieJwtAuth } = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/info", cookieJwtAuth, getUserInfo)
// router.get("/allUserInfo", getAllUserInfo)
router.get("/allUserInfo", cookieJwtAuth, getAllUserInfo)

router.put("/editUser", cookieJwtAuth, editUser)


module.exports = router;