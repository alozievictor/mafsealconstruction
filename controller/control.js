const QuestionSchema = require('../models/question');
const validator = require('validator');

const GetHomePage = (req, res) => {
    res.render('index')
}

const GetAboutPage = (req, res) => {
    res.render('about')
}

const GetServicePage = (req, res) => {
    res.render('service')
}

const GetProjectPage = (req, res) => {
    res.render('project')
}

const GetContactPage = (req, res) => {
    res.render('contact')
}


     /**
     * @param {Request} req
     * @param {Response} res
     * @returns
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

const PostQuestion = async (req, res) => {
    try {
        /**
         * @type {{name:String, phone:Number, email:String, message:String}}
         */
        const userData = req.body;
        console.log(userData)

        const validationError = validateUserdata(userData);
        if(validationError) {
            return res.render('/',{validationError})
        }

        await QuestionSchema.create(userData)
        return res.send('success')

    } catch (error) {
        console.log(error)
        // return res.render('/', {message:process.env.ErrMsg})
    }

}



module.exports = {GetHomePage, GetAboutPage, GetServicePage, GetProjectPage, GetContactPage, PostQuestion}