const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const PORT = 8000;

mongoose
    .connect("mongodb://localhost:27017/mongoose-tut")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Monog err", err));

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }
},
    { timestamps: true }
);

const User = mongoose.model("user", userSchema);


// Middleware plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("Hello from Middleware 1");
    // return res.json( { msg : "Hello from middleware 1" } );
    fs.appendFile("logs.txt", `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`, (err, data) => {
        next();
    })
})

app.get("/users", async (req, res) => {

    const allDbUsers = await User.find({});

    const html = `
        <ul>
            ${allDbUsers.map((user) => `<li> ${user.firstName} - ${user.email}</li>`).join("")}
        </ul>
    `;
    res.send(html);
});

// REST API routes
app.get("/api/users", async (req, res) => {
    // console.log(req.headers);
    const allDbUsers = await User.find({});
    res.setHeader("X-MyName", "Rutwik More");
    return res.json(allDbUsers);
});

app.get("/api/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg : "User not found"});
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post("/api/users/", async (req, res) => {
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

});

app.patch("/api/users/:id", async (req, res) => {
    // ToDo: Edit the new user
    await User.findByIdAndUpdate(req.params.id, { lastName : "changed"});
    res.json ({ status : "Success" });
});

app.delete("/api/users/:id", async (req, res) => {
    // ToDo: Edit the new user
    await User.findByIdAndDelete(req.params.id);
    res.json ({ status : "Success" });
});
// Or we can do as following
// app
//     .route("/api/users/:id")
//     .get((req, res) => {
//         const id = Number(req.params.id);
//         const user = users.find((user) => user.id === id);
//         return res.json(user);
//     })
//     .post((req, res) => {
//         res.json ({ status : "pending" });
//     })
//     .patch((req, res) => {
//         res.json ({ status : "pending" });
//     });


app.listen(PORT, () => console.log("Server is running on port 8000"));