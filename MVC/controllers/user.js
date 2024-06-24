const { model } = require("mongoose");
const User = require("../models/User");

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    res.setHeader("X-MyName", "Rutwik More");
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg : "User not found"});
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastName : "changed"});
    res.json ({ status : "Success" });
}

async function  handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    res.json ({ status : "Success" });
}

async function handleCreateUser(req, res) {
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
}

model.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser,
}