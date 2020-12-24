const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")

const User = require("../models/UserModel")
const AppError = require("../middlewares/errorHandler")





exports.updatePassword = asyncHandler(async (req, res) => {
	const { userId } = req
	const {
		
		password,
		
	} = req.body

	const user = await User.findById(userId)

	if (!user) {
		throw new AppError("User not found.", 404)
	}

	if (password) {
		const hashed_password = await bcrypt.hash(password, 10)

		user.hashed_password = hashed_password
	}

	

	await user.save(() => {
		res.json({
			status: "success",
			payload: "Profile Updated Successfully.",
		})
	})
})

