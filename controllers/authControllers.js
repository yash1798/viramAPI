const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const AppError = require("../middlewares/errorHandler")
const User = require("../models/UserModel")

exports.signup = asyncHandler(async (req, res) => {
	const { email, name, password } = req.body

    const hashed_password = await bcrypt.hash(password, 10)
    
    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new AppError("User Already Exists.", 401)
    }

	const user = await User.create({
		email,
		name,
		hashed_password,
	})

	if (!user) {
		throw new AppError("Something went wrong.", 500)
	}
	res.json({ status: "success", payload: "Signup completed." })
})

exports.signin = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user) {
		const { hashed_password } = user
		const decoded = await bcrypt.compare(password, hashed_password)
		if (decoded) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "1d",
			})
			return res.json({
				status: "success",
				payload: {
					id: user._id,
					name: user.name,
					token,
				},
			})
		}
		throw new AppError("Invalid username or password.", 400)
	}

	throw new AppError("Invalid username or password.", 400)
})