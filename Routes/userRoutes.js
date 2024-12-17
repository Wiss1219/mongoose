const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
// Route to create a new user
router.post("/createUser", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ msg: "User created", user: newUser });
    } catch (error) {
        res.status(500).json({ msg: error.message });  // Changed to error.message
    }
});
// Route to get all users
router.get("/getUser", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ msg: "Users found", users });  // Corrected response
    } catch (error) {
        res.status(500).json({ msg: error.message });  // Changed to error.message
    }
});
// Route to update a user by ID
router.put('/updateUser/:id', async (req, res) => {
     // User ID from URL
    // Data to update from the body
    try {
        // Find and update the user
const user = await User.findByIdAndUpdate({_id:req.params.id}, {...req.body}, { new: true });    // If no user is found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return the updated user
        res.status(200).json({ msg: "User updated", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user', error: error.message });  // Added error details
    }
});
module.exports = router;
