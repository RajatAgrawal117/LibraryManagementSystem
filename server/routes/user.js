// Import the required modules
const express = require("express")
const router = express.Router()

const { login, signup } = require("../controllers/Auth")
const { getAllUsers } = require("..//controllers/userController")
const {auth} = require("../middleware/auth");

// Authentication routes
router.post("/login" , login) ;
router.post("/signup" , signup) ;
router.post("/users",auth, getAllUsers);


module.exports = router