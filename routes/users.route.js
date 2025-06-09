const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateToken = require("../middleware/validateToken");


// user registration

router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email }); // checks if the user is already registered
        if (userExists) {
            console.log("helooo")
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        await User.create(req.body);
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

//user login
router.post("/login", async (req, res) => {
 try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    //check if the password is right
    const validPassword = await bcrypt.compare(req.body.password, user.password); // compares the encrypted password with the one with user just entered
    if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
    }

    //create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY); //encrypts the user id with a secret key
    return res.status(200).json({ token, message: "Login successful" });
    
 } catch (error) {
    return res.status(500).json({ message: error.message });
    
 }
});


// get the current user
router.get("/current", validateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        return res.status(200).json({data: user, message: "User fetched successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
//Get all users (Admin Function)
router.get("/get-all-users", validateToken, async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        return res.status(200).json({ data: users });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put("/update-user", validateToken, async (req, res) => {
    try {
    
        await User.findByIdAndUpdate(req.body.userId, req.body);
        return res.status(200).json({message: "User updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});



module.exports = router;
