const userModel = require("../models/userModels");
const bookModel = require("../models/bookModels");

const { isValidRequestBody, isValidData, isValidISBN, isValidReleasedAt, isValidObjectId } = require("../utils/validator");

//============================================< CREATE BOOK >===============================================//

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

        if (!isValidObjectId.test(userId)) {
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

        if (!isValidISBN.test(ISBN)) {
            return res.status(400).send({ status: false, message: "ISBN is invalid" });
        }

        if (!isValidData(category)) {
            return res.status(400).send({ status: false, message: "Category is Required" });
        }

        if (!isValidData(subcategory)) {
            return res.status(400).send({ status: false, message: "Subcategory is Required" });
        }

        if (!Array.isArray(subcategory)) {
            if(subcategory.length==0){
            return res.status(400).send({ status: false, message: "Subcategory Must be in Array" });
        }
    }

        if (!isValidData(releasedAt)) {
            return res.status(400).send({ status: false, message: "Please Provide the release date of the book" });
        }

        if (!isValidReleasedAt.test(releasedAt)) {
            return res.status(400).send({ status: false, message: "The Format of the release date should be look like 'YYYY-MM-DD'" });
        }

        let newBook = await bookModel.create(requestBody)
        res.status(201).send({ status: true, message: "Book is created successfully", data: newBook });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

//============================================< GET BOOKS BY QUERY >===============================================//

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

//============================================< GET BOOKS BY PARAMS >===============================================//

const getBooksById = async function (req, res) {
    try {
        let bookId = req.params.bookId;

        if (!isValidObjectId.test(bookId)) {
            return res.status(400).send({ status: false, message: "Please enter the valid book Id" })
        }

        let findBookId = await bookModel.findById({ _id: bookId }).select({ ISBN: 0 })
        if (findBookId.length == 0)
            return res.status(404).send({ status: false, msg: "No Book Data Found" })

        res.status(200).send({ status: true, msg: "All Books", data: findBookId })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }

}

//============================================< UPDATE BOOK >===============================================//

const updateBooks = async function (req, res) {
    try {
        let bookId = req.params.bookId;
        let requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "No data provided" });
        }

         if (!isValidObjectId.test(bookId)) {
            return res.status(400).send({ status: false, message: "Please enter the valid book Id" })
        }
        
        let findBookId = await bookModel.findById({ _id: bookId, isDeleted: false })
        if (findBookId.length == 0)
        return res.status(404).send({ status: false, msg: "No Book Data Found" })
        
        let { title, excerpt, releasedAt, ISBN } = requestBody

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

        if (!isValidData(releasedAt)) {
            return res.status(400).send({ status: false, message: "Please Provide the release date of the book" });
        }

        if (!isValidReleasedAt.test(releasedAt)) {
            return res.status(400).send({ status: false, message: "The Format of the release date should be look like 'YYYY-MM-DD'" });
        }

        if (!isValidData(ISBN)) {
            return res.status(400).send({ status: false, message: "ISBN is Required" });
        }

        let duplicateISBN = await bookModel.findOne({ ISBN });
        if (duplicateISBN) {
            return res.status(400).send({ status: false, msg: "ISBN already exist" });
        }

        if (!isValidISBN.test(ISBN)) {
            return res.status(400).send({ status: false, message: "ISBN is invalid" });
        }

        let updateBook = await bookModel.findOneAndUpdate({findBookId},{...requestBody},{new:true})
        return res.status(200).send({status:true, message:"Book Data Updated Successfully", data: updateBook})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });

    }
}

//============================================< DELETE BOOK >===============================================//

const deleteBooks = async function(req,res){
    try {
        let bookId = req.params.bookId;

        if (!isValidObjectId.test(bookId)) {
            return res.status(400).send({ status: false, message: "Please enter the valid book Id" })
        }
        
        let findBookId = await bookModel.findById({ _id: bookId, isDeleted: false })
        if (findBookId.length == 0)
        return res.status(404).send({ status: false, msg: "No Book Data Found" })

        const deleteBook = await bookModel.findOneAndUpdate({findBookId},{isDeleted:true,deletedAt: new Date()},{new:true})
        return res.status(200).send({status:true, message:"Book Data Updated Successfully", data: deleteBook})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });   
    }
}


module.exports = { createBook, getBooks, getBooksById , updateBooks, deleteBooks};


