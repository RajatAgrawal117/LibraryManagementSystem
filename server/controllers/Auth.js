const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const mailSender = require("../utils/mailSender")
require("dotenv").config()

// Signup Controller for Registering USers

async function sendVerificationEmail(email) {

	// Send the email
	try {
    const title = "Signup Success"
		const mailResponse = await mailSender(
			email,
			title,
      "You have successfully registered with us."
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

exports.signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const {
      username,
      password,
      email,
      accountType,
    } = req.body
    // Check if All Details are there or not
    if (
      !username ||
      !password ||
      !email || 
      !accountType
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      })
    }

    // Check if user already exists
    const existingUser_email = await User.findOne({ email })
    const existingUser_username = await User.findOne ({ username })
    if (existingUser_email || existingUser_username) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      })
    }


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create entry in db
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      accountType,
    })
      // send mail to user
      // const title = "Login Success"
      // const body = `Hello ${user.username}, You have successfully logged in.`
      // mailSender(user.email, title, body);
      await sendVerificationEmail(user.email)
    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    })
  }
}

// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    //get data from req.body
    const { username, password } = req.body

    // Check if email or password is missing
    if (!username || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      })
    }

    // check if user exists in db
    // Find user with provided email
    const user = await User.findOne({ username }).populate("borrowed_books")
    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      })
    }

    //generate JWT token after matching password and compare password

    if (bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { 
          expiresIn: "24h",
        }
      )

      // Save token to user document in database
      user.token = token
      user.password = undefined
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }



      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      })
    }
  } catch (error) {
    console.error(error)
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    })
  }
}



