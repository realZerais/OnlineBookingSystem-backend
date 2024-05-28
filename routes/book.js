const express = require("express");
const { 
    addBook, getAllBook, editBook, 
    getAllPendingBook, EditPendingBook, editRepairingBook, getAllRepairingBook, getAllDoneBook,
    getAllPendingAppointment, editAllPendingAppointment, getAllApprovedAppointment,
    deleteBook, searchedBookInfo
} = require("../controllers/bookController")
const { cookieJwtAuth } = require("../middlewares/authMiddleware")


const router = express.Router();


router.get("/allBookInfo", cookieJwtAuth, getAllBook);

router.post("/addBook", cookieJwtAuth, addBook);

router.put("/editBook", cookieJwtAuth, editBook);


router.get("/pendingBooks", cookieJwtAuth, getAllPendingBook);
router.get("/doneBooks",cookieJwtAuth, getAllDoneBook);
router.patch("/editPendingBook", cookieJwtAuth, EditPendingBook)


router.patch("/editRepairingBook", cookieJwtAuth, editRepairingBook)
router.get("/repairingBooks", cookieJwtAuth, getAllRepairingBook);

router.get("/pendingAppointment",cookieJwtAuth, getAllPendingAppointment);
router.get("/approvedAppointment",cookieJwtAuth, getAllApprovedAppointment);
router.patch("/editAppointment",cookieJwtAuth, editAllPendingAppointment);

router.delete("/deleteBook", deleteBook)

router.get("/search/:booking_id", searchedBookInfo)
module.exports = router;