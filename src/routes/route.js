const express = require('express');
const router = express.Router()

const { createUser, loginUser } = require("../controllers/userController");

const { createBook, getBooks, getBooksById, updateBooks } = require("../controllers/bookController");
//const middlewares = require("../middlewares/mid");






router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/books", createBook);

router.get("/books", getBooks);

router.get("/books/:bookId", getBooksById);

router.put("/books/:bookId", updateBooks);


module.exports = router;