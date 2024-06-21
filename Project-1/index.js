const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Middleware plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("Hello from Middleware 1");
    // return res.json( { msg : "Hello from middleware 1" } );
    fs.appendFile("logs.txt", `${Date.now()}: ${req.method}: ${req.path}`, (err, data) => {
        next();
    })
})

app.get("/users", (req, res) => {
    const html = `
        <ul>
            ${users.map((user) => `<li> ${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
});

// REST API routes
app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post("/api/users/", (req, res) => {
    // ToDo: Add a new user
    const body  = req.body;
    console.log('body', body);

    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) =>{
        return res.json ({ status : "success", id: users.length + 1 });
    });

    
});

app.patch("/api/users/", (req, res) => {
    // ToDo: Edit the new user
    res.json ({ status : "pending" });
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