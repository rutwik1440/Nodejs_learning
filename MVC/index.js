// MVC: Model View Controller
const express = require("express");

const { connectMongoDB } = require("./connection");
const { userRouter } = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 8000;

// Connection 
connectMongoDB("mongodb://localhost:27017/mongoose-tut");

// Middleware plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

app.use("/api/user", userRouter);

app.listen(PORT, () => console.log("Server is running on port 8000"));