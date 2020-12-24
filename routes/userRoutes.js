const express = require("express")

const { updatePassword } = require("../controllers/userControllers")
const {
	
	checkToken,
	
} = require("../middlewares/checkToken")

const router = express.Router()


router.put("/updatePassword", checkToken, updatePassword)


module.exports = router