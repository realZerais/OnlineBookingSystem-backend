const express = require("express");
const { addBook, getAllBook, editBook, getAllPendingBook, EditPendingBook, editRepairingBook, getAllRepairingBook} = require("../controllers/bookController")
const { cookieJwtAuth } = require("../middlewares/authMiddleware")


const router = express.Router();


router.get("/allBookInfo", cookieJwtAuth, getAllBook);

router.post("/addBook", cookieJwtAuth, addBook);

router.put("/editBook", cookieJwtAuth, editBook);


router.get("/pendingBooks", cookieJwtAuth, getAllPendingBook);
router.patch("/editPendingBook", cookieJwtAuth, EditPendingBook)


router.patch("/editRepairingBook", cookieJwtAuth, editRepairingBook)
router.get("/repairingBooks", getAllRepairingBook);

module.exports = router;