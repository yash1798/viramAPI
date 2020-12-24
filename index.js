const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")


const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

const mongooseConnect = require("./middlewares/mongooseConnect")
const errorController = require("./controllers/errorController")

dotenv.config()

const app = express()

mongooseConnect(process.env.MONGO_URI, process.env.NODE_ENV)


	app.use(morgan("dev"))


app.use(express.json())


app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)


app.use(errorController)

const PORT = process.env.PORT || 5000



app.listen(PORT, () => console.log(`Server running on port ${PORT}.`))