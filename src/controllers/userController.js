const userModel = require('../models/userModels');
const jwt = require("jsonwebtoken");

//Destructuring All Variable
const { isValidData, isValidRequestBody, isValidEmail, isValidPhone} = require("../utils/validator");
const res = require('express/lib/response');


const createUser = async function (req, res) {
    try {
        let requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "No data provided" })

        };

        let { title, name, phone, email, password, address} = requestBody;

        if (!isValidData(title)) {
            return res.status(400).send({ status: false, message: "Title is required." })
        };

        if (requestBody.title !== "Mr" && requestBody.title !== "Mrs" && requestBody.title !== "Miss") {
            return res.status(400).send({ status: false, message: "title should be  Mr, Mrs, Miss" })
        }

        if (!isValidData(name)) {
           return res.status(400).send({ status: false, message: "Name is required." })
            
        };

        if (!isValidData(phone)) {
           return res.status(400).send({ status: false, message: "Phone is required." })
            
        };

        if (!isValidPhone.test(phone)) {
           return res.status(400).send({ status: false, message: "Please enter valid phone number" });
            
        };

        let duplicatePhone = await userModel.findOne({ phone })
        if (duplicatePhone) {
            return res.status(400).send({ status: false, msg: 'Phone number already exist' })
        };

        if (!isValidData(email)) {
           return res.status(400).send({ status: false, message: "Email is required." })
            
        };

        if (!isValidEmail.test(email)) {
            return res.status(400).send({ status: false, message: "Please enter valid email number" });
            
        };

        let duplicateEmail = await userModel.findOne({ email })
        if (duplicateEmail) {
            return res.status(400).send({ status: false, msg: 'Email already exist' })
        };

        if (!isValidData(password)) {
            return res.status(400).send({ status: false, message: "Password is required." })    
         };
 
        if(!(password.length>=8 && password.length<=15)){
         return res.status(400).send({status:false, msg:"Password Should be minimum 8 characters and maximum 15 characters"})
        }
         
        if (!isValidData(address)) {
            return res.status(400).send({ status: false, message: "Address is required." })    
         };

        let createData = await userModel.create(requestBody);
        res.status(201).send({ status: true, message: "User data created successfully", data: createData })


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
};


module.exports = { createUser }