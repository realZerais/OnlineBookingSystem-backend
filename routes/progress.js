const express = require("express");
const { cookieJwtAuth } = require("../middlewares/authMiddleware")
const router = express.Router();

const {getAllProgress, getBookProgress} = require("../controllers/progressController")

router.get("/allProgress", getAllProgress)//

router.get("/getBookProgress/:book_id", getBookProgress)//




module.exports = router;