const express = require("express");
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUser } = require("../controllers/user");

const router = express.Router();

// router.use((req, res, next) => {
//     console.log("Hello from Middleware 1");
//     // return res.json( { msg : "Hello from middleware 1" } );
//     fs.appendFile("logs.txt", `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`, (err, data) => {
//         next();
//     })
// })

// ASSUME THAT THIS ROUTER IS ONLY FOR USER

// REST API routes
// router.get("/", handleGetAllUsers).post(handleCreateUser);
router
    .route("/")
    .get(handleGetAllUsers)
    .post(handleCreateUser);

router
    .route(":id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router;