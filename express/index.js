const http = require('http');
// const fs = require('fs');
// const url = require('url');
const express = require('express');

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello from Home Page");
});

app.get("/about", (req, res) => {
    return res.send("Hello from About Page" + ' hey ' + req.query.myname + ' you are ' + req.query.age);
});


app.listen(8001, () => console.log("server started!"));