const express = require("express");
const { handleGetAllUsers } = require("../controllers/user");

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
router.get("/", async (req, res) => {
    // console.log(req.headers);
    const allDbUsers = await User.find({});
    res.setHeader("X-MyName", "Rutwik More");
    return res.json(allDbUsers);
});

router
    .route(":id")
    .get( async (req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg : "User not found"});
        // const id = Number(req.params.id);
        // const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .post( async (req, res) => {
        // ToDo: Add a new user
        const body  = req.body;
        console.log('body', body);
        
        if (!body || !body.first_name || !body.last_name || !body.email || !body.gender){
            return res.status(400).json({ msg : "All fields are required"});
        }
        
        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            jobTitle: body.job_title,
            gender: body.gener
        });
        // console.log('result', result);
        return res.status(201).json({ msg : "User created" });
    })
    .patch( async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, { lastName : "changed"});
        res.json ({ status : "Success" });
    })
    .delete( async (req, res) => {
        await User.findByIdAndDelete(req.params.id);
        res.json ({ status : "Success" });
    });

module.exports = router;