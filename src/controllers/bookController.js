const userModel = require("../models/userModels");
const bookModel = require("../models/bookModels");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const { isValidRequestBody, isValidData, isValidISBN, isValidReleasedAt } = require("../utils/validator");

function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}


const createBook = async function (req, res) {
    try {
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "No data provided" });
        }

        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt, } = requestBody;

        if (!isValidData(title)) {
            return res.status(400).send({ status: false, message: "Title is Required" });
        }

        let duplicateTitle = await bookModel.findOne({ title });
        if (duplicateTitle) {
            return res.status(400).send({ status: false, msg: "Title already exist" });
        }

        if (!isValidData(excerpt)) {
            return res.status(400).send({ status: false, message: "Excerpt is Required" });
        }

        if (!isValidData(userId)) {
            return res.status(400).send({ status: false, message: "userId is Required" });
        }

        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "userId is Invalid" });
        }

        let userDetails = await userModel.findById({ _id: userId });
        if (!userDetails) {
            return res.status(404).send({ status: false, msg: "User does not exists" });
        }

        if (!isValidData(ISBN)) {
            return res.status(400).send({ status: false, message: "ISBN is Required" });
        }

        let duplicateISBN = await bookModel.findOne({ ISBN });
        if (duplicateISBN) {
            return res.status(400).send({ status: false, msg: "ISBN already exist" });
        }

        if (!isValidISBN.test(requestBody.ISBN)) {
            return res.status(400).send({ status: false, message: "ISBN is invalid" });
        }

        if (!isValidData(category)) {
            return res.status(400).send({ status: false, message: "Category is Required" });
        }

        if (!isValidData(subcategory)) {
            return res.status(400).send({ status: false, message: "Subcategory is Required" });
        }

        if (!isValidData(releasedAt)) {
            return res.status(400).send({ status: false, message: "Please Provide the release date of the book" });
        }

        if (!isValidReleasedAt.test(requestBody.releasedAt)) {
            return res.status(400).send({ status: false, message: "The Format of the release date should be look like 'YYYY-MM-DD'" });
        }

        let newBook = await bookModel.create(requestBody)
        res.status(201).send({ status: true, message: "Book is created successfully", data: newBook });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


const getBooks = async function (req, res) {
    try {
        let requestQuery = req.query;

        let findBooks = await bookModel.find({ ...requestQuery, isDeleted: false }).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })

        findBooks.sort(function (a, b) {
            return a.title.localeCompare(b.title)
        })

        //we have Lowercase & UpperCase Name in the Title So we use .lowerCase() here
        // findBooks.sort((a,b)=> (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1))

        if (findBooks.length == 0)
            return res.status(404).send({ status: false, msg: "No Book Data Found" })

        res.status(200).send({ status: true, msg: "All Books", data: findBooks })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createBook, getBooks };