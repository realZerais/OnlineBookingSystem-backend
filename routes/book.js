const express = require("express");
const { addBook, getAllBook, editBook } = require("../controllers/bookController")
const { cookieJwtAuth } = require("../middlewares/authMiddleware")


const router = express.Router();

router.post("/addBook", cookieJwtAuth, addBook);
router.get("/allBookInfo", cookieJwtAuth, getAllBook);

router.put("/editBook", cookieJwtAuth, editBook)

module.exports = router;