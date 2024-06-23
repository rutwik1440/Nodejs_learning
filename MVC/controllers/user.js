const User = require("../models/User");

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    res.setHeader("X-MyName", "Rutwik More");
    return res.json(allDbUsers);
}