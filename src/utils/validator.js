


let isValidData = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

let isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

let isValidEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

let isValidPhone = /^\d{10}$/;

let isValidPassword = (/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,15}$/);


module.exports = { isValidData, isValidRequestBody, isValidEmail, isValidPhone, isValidPassword }