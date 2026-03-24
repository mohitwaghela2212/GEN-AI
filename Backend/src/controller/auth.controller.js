const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

const cookieOptions = {
    httpOnly: true,
    secure: true,      // Required for HTTPS
    sameSite: 'none',  // Required for cross-site (Vercel to Render)
    maxAge: 24 * 60 * 60 * 1000 
};

async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username, email, password: hash });
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, cookieOptions);
        res.status(201).json({ message: "User registered", user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, cookieOptions);
        res.status(200).json({ message: "LoggedIn successfully", user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function logoutUserController(req, res) {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({ message: "Logged out" });
}

async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id);
        res.status(200).json({ user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = { registerUserController, loginUserController, logoutUserController, getMeController };