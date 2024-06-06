const express = require("express");
const { 
    addBook, getAllBook, editBook, getAllPendingBooks, getAllUserBook,

    getAllPendingAppointment, editPendingAppointment, getAllNonPendingAppointment, getAllApprovedAppointment,

    getAllPendingRepairs, EditPendingBook, updateRepairingBook, getAllRepairingBooks, getAllCompletedBooks,

    deleteBook, searchedBookInfo
} = require("../controllers/bookController")
const { cookieJwtAuth } = require("../middlewares/authMiddleware")


const router = express.Router();


router.get("/allBookInfo", getAllBook);//

router.post("/addBook", addBook);//

router.put("/editBook", editBook);//

router.get("/getAllUserBook/:username", getAllUserBook);

router.get("/pendingBooks", getAllPendingBooks);//

router.patch("/editPendingBook", cookieJwtAuth, EditPendingBook)


router.get("/pendingAppointment", getAllPendingAppointment);//
router.get("/getAllApprovedAppointment", getAllApprovedAppointment);
router.get("/getAllNonPendingAppointment", getAllNonPendingAppointment);//
router.patch("/editPendingAppointment",cookieJwtAuth, editPendingAppointment);//


router.get("/getAllPendingRepairs", getAllPendingRepairs);//
router.patch("/updateRepairingBook", cookieJwtAuth, updateRepairingBook)
router.get("/getAllRepairingBooks", getAllRepairingBooks);//
router.get("/completeBooks", getAllCompletedBooks);//

router.delete("/deleteBook", deleteBook)//

router.get("/search/:book_id", searchedBookInfo)//

module.exports = router;