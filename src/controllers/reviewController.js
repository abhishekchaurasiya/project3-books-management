const reviewModel = require("../models/reviewModels");
const bookModel = require("../models/bookModels");
const userModel = require("../models/userModels");

const { isValidRequestBody, isValidData, isValidObjectId } = require("../utils/validator");

const bookReview = async function(req, res) {
    try {

        const booksId = req.params.bookId
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "No data provided" });
        }

        if (!isValidObjectId.test(booksId)) {
            return res.status(400).send({ status: false, message: "Please enter the valid book Id" })
        }

        let findBookId = await bookModel.findById({ _id: booksId })

        if (findBookId.length == 0) {
            return res.status(404).send({ status: false, msg: "No Book Data Found" })
        }
        let { bookId, reviewedBy, reviewedAt, rating, review } = requestBody


        if (!isValidData(bookId)) {
            return res.status(400).send({ status: false, msg: "Please provied bookId " })
        }

        if (!isValidObjectId.test(bookId)) {
            return res.status(400).send({ status: false, message: "Please enter the valid book Id" })
        }
        if (booksId !== bookId) {
            return res.status(400).send({ status: false, msg: "Params booksId not match with request bookId " })

        }
        if (!isValidData(reviewedBy)) {
            return res.status(400).send({ status: false, msg: "Please provied reviewers name " })
        }
        if (!isValidData(reviewedAt)) {
            return res.status(400).send({ status: false, msg: "Please provied review Date " })

        }
        if (!isValidData(rating)) {
            return res.status(400).send({ status: false, msg: "Please provied  the rating  " })
        }
        if (!(rating >= 1 && rating <= 5)) {
            return res.status(400).send({ status: false, msg: "Rating Should be minimum 1 and maximum 5 ", });
        }
        if (!isValidData(review)) {
            return res.status(400).send({ status: false, msg: "Please provied reviewers name " })
        }

        let updatedBook = await bookModel.findByIdAndUpdate({ _id: booksId })   
        //Meme.findOneAndUpdate(post, post.likes: post.likes + 1)


        const reviewCreation = await reviewModel.create(requestBody);
        res.status(201).send({ status: true, data: reviewCreation })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { bookReview }