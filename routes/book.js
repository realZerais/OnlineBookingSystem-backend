const express = require("express");
const { addBook, getAllBook, editBook, getAllPendingBook, EditPendingBook } = require("../controllers/bookController")
const { cookieJwtAuth } = require("../middlewares/authMiddleware")


const router = express.Router();


router.get("/allBookInfo", cookieJwtAuth, getAllBook);
router.get("/pendingBooks", getAllPendingBook);

router.post("/addBook", cookieJwtAuth, addBook);

router.put("/editBook", cookieJwtAuth, editBook);

router.patch("/editPendingBook", cookieJwtAuth, EditPendingBook)



module.exports = router;