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

function myHandler (req, res){
    console.log("New Request received");
    // console.log(req.headers);

    if (req.url === "/favicon.ico") return res.end();

    const log = `${Date.now()}: ${req.url} New Req received\n`;
    const myUrl = url.parse(req.url, true);   
    console.log(myUrl);

    fs.appendFile("log.txt", log, (err, data) => {

        switch(myUrl.pathname) {
            case "/": 
                res.end("HomePage");
                break;
            case "/about": 
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
                break;

            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here is your search reuslt: " + search);

            case "/signup": 
                if (req.method === "GET") res.end("This is a signup form");

                else if (req.method === "POST") {
                    // DB query
                    res.end("User has been registered");
                }
            default: res.end("404 Not found");
        }

        // res.end("Hello from server again");
    })


}

const myserver = http.createServer(app);

myserver.listen(8000, () => {
    console.log("Server is listening on port 8000")
});
