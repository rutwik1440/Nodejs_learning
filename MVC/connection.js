const mongoose = require("mongoose");

async function connectMongoDB(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectMongoDB,
};

    
    // .then(() => console.log("MongoDB connected"))
    // .catch((err) => console.log("Mong0 err", err));