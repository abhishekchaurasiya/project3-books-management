const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");
const bookModel = require("../models/bookModels");

// const {isValidObjectId}= require("../utils/validator")

const authentication = async function(req, res, next) {
    try {
        let token = req.headers["x-User-key"];
        if (!token)token =req.headers["x-user-key"];
        if(!token)return res.status(400).send({ status: false, message: "Token required! Please login to generate token" });
        
        let decodedToken = await jwt.verify(token, "Project-03_group-28");
        if (!decodedToken)
            return res.status(400).send({ status: false, message: "Inter valid token" });
        
        req.userId = decodedToken.userId

        next();


    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}




// const authorisation = async function(req,res,next){
//     try {
//         const bookId = req.params.bookId;
//         const userId = req.userId;

//         if(!isValidObjectId.test(bookId)){
//             return res.status(400).send({ status: false, message: "bookId is Invalid" });
//         }

//         const bookDetails= await bookModel.findById({bookId})
//         if(!bookDetails){
//             return res.status(404).send({ status: false, message: "Book Not Found" }); 
//         }

//         if(userId != bookDetails.userId){
//             return res.status(403).send({ status: false, message: "You Are not Authorised" });  
//         }

//         next()

//     } catch (error) {
//         res.status(500).send({ status: false, message: error.message });
//     }
// }


module.exports ={ authentication }