const express = require("express");
const { signupUser, loginUser } = require("../controllers/userController")
const { authenticateToken } = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/login", loginUser);
router.get("/login", (req, res) => {
    res.status(400).json({ "test": "test" })
})
router.post("/signup", signupUser);
router.get("/protected", authenticateToken)

module.exports = router;