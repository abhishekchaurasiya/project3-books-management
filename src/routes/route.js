const express = require('express');
const router = express.Router()

const { createUser } = require("../controllers/userController");
//const middlewares = require("../middlewares/mid");






router.post("/register", createUser);

//router.post("/login", userController.loginUser);


module.exports = router;