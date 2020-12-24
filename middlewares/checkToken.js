const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const AppError = require("../middlewares/errorHandler")

exports.checkToken = asyncHandler(async (req, res, next) => {
	const { authorization } = req.headers

	const token = authorization.split(" ")[1]

	const decoded = jwt.verify(token, process.env.JWT_SECRET)

	if (!decoded) {
		throw new AppError("Token fail.", 400)
	}

	req.userId = decoded.id

	next()
})