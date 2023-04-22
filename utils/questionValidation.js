const validator = require('validator');

/**
 * @param {{name:String, phone:Number, email:String, message:String}} userData
 */

const validateUserdata = (userData)=> {
    if(!userData.name) {
        return 'Name is required'
    }
    if(!userData.phone) {
        return 'Mobile number is required'
    }
    if((userData.phone).length <=10) {
        return 'Invalid mobile number'
    }
    if((userData.phone).length >11) {
        return 'Invalid mobile number please check'
    }
    if(!userData.email) {
        return 'Email is required'
    }
    if(!validator.isEmail(userData.email)) {
        return 'Enter a valid email'
    }
    if(!userData.message) {
        return 'Message is required'
    }
}

module.exports = validateUserdata;