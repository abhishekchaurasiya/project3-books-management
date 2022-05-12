const reviewModel = require("../models/reviewModels")

const bookReview = async function (req, res) {

    const requestBody = req.body;

    const reviewCreation = await reviewModel.create(requestBody);
    res.status(201).send({ status: true, data: reviewCreation })
}

module.exports = { bookReview }