const express = require("express");
const { 
    addBook, getAllBook, editBook, 
    getAllPendingBooks, EditPendingBook, editRepairingBook, getAllRepairingBook, getAllCompletedBooks,
    getAllPendingAppointment, editPendingAppointment, getAllNonPendingAppointment, getAllApprovedAppointment,
    deleteBook, searchedBookInfo
} = require("../controllers/bookController")
const { cookieJwtAuth } = require("../middlewares/authMiddleware")


const router = express.Router();


router.get("/allBookInfo", getAllBook);//

router.post("/addBook", addBook);//

router.put("/editBook", editBook);//


router.get("/pendingBooks", getAllPendingBooks);//
router.get("/completeBooks", getAllCompletedBooks);//
router.patch("/editPendingBook", cookieJwtAuth, EditPendingBook)


router.patch("/editRepairingBook", cookieJwtAuth, editRepairingBook)
router.get("/repairingBooks", getAllRepairingBook);//

router.get("/pendingAppointment", getAllPendingAppointment);//
router.get("/getAllApprovedAppointment", getAllApprovedAppointment);
router.get("/getAllNonPendingAppointment", getAllNonPendingAppointment);//

router.patch("/editPendingAppointment",cookieJwtAuth, editPendingAppointment);//


router.delete("/deleteBook", deleteBook)//

router.get("/search/:book_id", searchedBookInfo)//

module.exports = router;