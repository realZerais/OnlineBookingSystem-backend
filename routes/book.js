const express = require("express");
const { addBook, getAllBook } = require("../controllers/bookController")
const { cookieJwtAuth } = require("../middlewares/authMiddleware")


const router = express.Router();

router.post("/addBook", cookieJwtAuth, addBook);
router.get("/allBookInfo", cookieJwtAuth, getAllBook);

module.exports = router;