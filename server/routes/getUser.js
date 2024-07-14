const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");
const { auth, isAdmin } = require("../middleware/auth");

router.get("/", auth,isAdmin, getAllUsers);

module.exports = router;
