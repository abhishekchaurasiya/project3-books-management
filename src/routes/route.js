const express = require('express');
const router = express.Router()

const { createUser,loginUser } = require("../controllers/userController");

const { createBook,getBooks } = require("../controllers/bookController");
//const middlewares = require("../middlewares/mid");






router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/books", createBook);

router.get("/books", getBooks);

module.exports = router;