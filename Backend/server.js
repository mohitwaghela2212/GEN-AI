require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

// Connect to the database
connectToDB();

// Use process.env.PORT for deployment, defaulting to 3000 for local development
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});