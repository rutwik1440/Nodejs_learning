const express = require('express');
const cluster = require('node:cluster');
const os = require('os');

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++){
        cluster.fork();
    }
}

else {
    const app = express();
    const PORT = 8000;

    app.get('/', (req, res) => {
        return res.json( { message : `Hello from express server ${process.pid}  🚀` } );
    }); 

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}