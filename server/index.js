const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const database = require('./config/database') ;

const port = process.env.PORT || 4000 ;
// Middleware
app.use(express.json()); 

// CORS
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// Connecting to database
database.connectDB();


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});