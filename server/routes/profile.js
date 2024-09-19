const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth")
const {
  // deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
} = require("../controllers/profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delete User Account
// router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)

router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router
