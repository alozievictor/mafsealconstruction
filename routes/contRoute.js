const express = require('express')
const router = express.Router()
const QuestionSchema = require('../models/question');
const validateUserdata = require('../utils/questionValidation')
const validator = require('validator');


router.get('/', (req, res) => {
    res.render('index',{validationError:''})
});

router.get('/about', (req, res) => {
    res.render('about')
});

router.get('/service', (req, res) => {
    res.render('service')
});

router.get('/contact', (req, res) => {
    res.render('contact')
});

router.get('/project', (req, res) => {
    res.render('project')
});

     /**
     * @param {Request} req
     * @param {Response} res
     * @returns
     */

    //  const validateUserdata = (userData)=> {
    //     if(!userData.name && !userData.phone && !userData.email && !userData.message) {
    //         return 'Fill all required field'
    //     }
    //     if(!userData.name) {
    //         return 'Name is required'
    //     }
    //     if(!userData.phone) {
    //         return 'Mobile number is required'
    //     }
    //     if((userData.phone).length <=10) {
    //         return 'Invalid mobile number'
    //     }
    //     if((userData.phone).length >11) {
    //         return 'Invalid mobile number please check'
    //     }
    //     if(!userData.email) {
    //         return 'Email is required'
    //     }
    //     if(!validator.isEmail(userData.email)) {
    //         return 'Enter a valid email'
    //     }
    //     if(!userData.message) {
    //         return 'Message is required'
    //     }
    // }  


router.post('/question', async (req, res) => {
    try {
        /**
         * @type {{name:String, phone:Number, email:String, message:String}}
         */
        const userData = req.body;
        console.log(userData)

        const validationError = validateUserdata(userData);
        if(validationError) {
            console.log(validationError)
            return res.render('index',{validationError})
        }

        await QuestionSchema.create(userData)
        return res.render('index',{validationError:''});

    } catch (error) {
        console.log(error)
        return res.render('index', {message:process.env.ErrMsg})
    }
});

module.exports = router;