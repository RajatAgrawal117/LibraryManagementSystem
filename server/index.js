const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const database = require('./config/database');
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 4000;

// Middleware
app.use(cookieParser());
app.use(express.json()); 

// CORS configuration
const corsOptions = {
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Connecting to database
database.connectDB();

// Routes
const userRoutes = require("./routes/user");
const borrowRoutes = require("./routes/Borrow");
const getUserRoutes = require("./routes/getUser");
const bookRoutes = require("./routes/Book");
app.use("/api/auth", userRoutes);
app.use("/api", borrowRoutes);
app.use('/api/users', getUserRoutes);
app.use('/api', bookRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
