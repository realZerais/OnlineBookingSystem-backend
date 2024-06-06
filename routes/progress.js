const express = require("express");
const { cookieJwtAuth } = require("../middlewares/authMiddleware")
const router = express.Router();

const {getAllProgress, getAllUserProgress, getBookProgress, getUserBookProgress} = require("../controllers/progressController")

router.get("/allProgress", getAllProgress)//

router.get("/getBookProgress/:book_id", getBookProgress)//

router.get("/getAllUserProgress/:username", getAllUserProgress)//

router.get("/getAllUserProgress/:username", getUserBookProgress)//




module.exports = router;