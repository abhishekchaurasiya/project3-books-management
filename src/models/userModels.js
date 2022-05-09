const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        enum: ["Mr", "Mrs", "Miss"],
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        pincode: {
            type: String,
            required: true,
            trim: true,
        },
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);