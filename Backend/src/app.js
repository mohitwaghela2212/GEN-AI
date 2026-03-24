// src/app.js
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Trust the proxy (Render uses one) to allow secure cookies
app.set("trust proxy", 1); 

app.use(cors({
    // Remove any trailing slash from the URL
    origin: "https://gen-ai-orcin.vercel.app", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

// Health Check
app.get("/", (req, res) => res.status(200).json({ message: "API is healthy" }));

const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;