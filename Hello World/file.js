const fs = require('fs');
const os = require('os');
// Synchronous 
// fs.writeFileSync("./test.txt", "Hello World1");

// Asynchronous
// fs.writeFile("./test.txt", "Hello World2", (err))

// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

// fs.readFile("./contacts.txt", "utf-8", (err, result) => { // here readfile doesn't return result, 
//     if (err){                                               // so we need to use callback function to get the result
//         console.log(err);
//     }
//     else {
//         console.log(result);
//     }
// })

// Asynchronous doesn't return 

// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
// fs.appendFileSync("./test.txt", `Hey There\n`);


console.log(os.cpus().length);
