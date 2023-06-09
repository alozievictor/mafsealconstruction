const validator = require("validator");

/**
 * @param {{name:String, phone:Number, email:String, message:String}} userData
 */

const validateUserdata = (userData) => {
  if (!userData.name) {
    return "Name is required";
  }
  if (!userData.phone) {
    return "Mobile number is required";
  }
  if (userData.phone.length <= 10) {
    return "Invalid mobile number";
  }
  if (userData.phone.length > 11) {
    return "Invalid mobile number please check";
  }
  if (!userData.email) {
    return "Email is required";
  }
  if (!validator.isEmail(userData.email)) {
    return "Enter a valid email";
  }
  if (!userData.message) {
    return "Message is required";
  }
};

/**
 * @param {{ptype: String, description: String, address: String, image: String, date: String, plan: String, compltDate: String }} projectData
 */

const UploadValidation = (projectData) => {
  if (!projectData.address) {
    return "Project Address is required";
  }
  if (!projectData.ptype) {
    return "Project type or category is required";
  }
  if (!projectData.compltDate) {
    return "Completion Date is required";
  }
  if (!projectData.description) {
    return "project Description is required";
  }
  if (!projectData.plan) {
    return "project plan is required";
  }
  if (!projectData.date) {
    return "Date is required";
  }
  if (projectData.date.length < 5) {
    return "Invalid date";
  }
};

const validateData = (userData) => {
  if (!userData.email) {
    return "Email is required";
  }
  if (!validator.isEmail(userData.email)) {
    return "Enter valid email";
  }
  if (!userData.password) {
    return "Password is required";
  }
  if (userData.password.length <= 5) {
    return "Password is Short";
  }
  if (userData.password.length >= 25) {
    return "Password is to long";
  }
};

module.exports = { validateUserdata, UploadValidation, validateData };
