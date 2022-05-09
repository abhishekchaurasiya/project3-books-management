const userModel = require('../models/userModels');
const jwt = require("jsonwebtoken");

//Destructuring All Variable
const { isValidData, isValidRequestBody, isValidEmail, isValidPhone, isValidPassword } = require("../utils/validator")


const createUser = async function (req, res) {
    try {
        let requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: "No data provided" })
            return;
        };

        let { title, name, phone, email, password, address } = requestBody;

        if (!isValidData(title)) {
            res.status(400).send({ status: false, message: "Title is required." })
            return
        };

        if (!isValidData(name)) {
            res.status(400).send({ status: false, message: "Name is required." })
            return
        };

        if (!isValidData(phone)) {
            res.status(400).send({ status: false, message: "Phone is required." })
            return
        };

        if (!isValidPhone.test(phone)) {
            res.status(400).send({ status: false, message: "Please enter valid phone number" });
            return
        };





        let createData = await userModel.create(requestBody);
        res.status(201).send({ status: true, message: "User data created succenfully", data: createData })


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
};











module.exports = { createUser }