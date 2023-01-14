const express = require('express');
const router = express.Router()
const adminLoginSchema = require('../models/admin')
const QuestionSchema = require('../models/question')
const bcrypt = require('bcrypt');
const validator = require('validator');


router.get('/admin', (req, res) => {
    res.render('adminReg',{message:''});
})

router.get('/logout', (req, res) => {
    res.render('index')
})

router.get('/Login', (req, res) => {
    res.render('adminlogin',{message:''})
})

router.get('/adminPage', async (req, res) => {
    try {
        const Questions = await QuestionSchema.find() 
        if(Questions) {
            return res.render('admin',{Questions:Questions, message:''})
        }

        return res.status(400).redirect('/Login',{message:''})

    } catch (error) {
        console.log(error)
    }

})


/** 
 * @param {{email:String, password:String}}
 */


const validateData = (userData) => {
    if(!userData.email) {
        return 'Email is required'
    }
    if(!validator.isEmail(userData.email)) {
        return 'Enter valid email'
    }
    if(!userData.password) {
        return 'Password is required'
    }
    if((userData.password).length <=5) {
        return 'Password is Short'
    }
    if((userData.password).length >=25) {
        return 'Password is to long'
    }
}

router.post('/RegAdmin', async (req, res) => {
    try {
        /**
         * @type {{email:String, password:String}}
         */
        const userData = req.body;

        const error = validateData(userData)
        if(error) {
            return res.render('adminReg',{message:error})
        }
        const Hash = bcrypt.hashSync(userData.password, 5)
        userData.password = Hash
        await adminLoginSchema.create(userData);
        console.log('email and password Posted')
        return res.render('adminlogin', {message:'Success'})

    } catch (error) {
        console.log(error)
        res.render('adminReg')
    }
})


router.post('/LoginAdmin', async (req, res) => {
    try {
        /**
         * @type {{email:String, password:String}}
         */
          const userData = req.body;

        const error = validateData(userData)
        if(error) {
            console.log('validation checked')
            return res.render('adminlogin',{message:error})
        }

        const checkAdmin = await adminLoginSchema.findOne({email:userData.email})
        console.log(checkAdmin)
        if(checkAdmin.email !== userData.email) {
            return res.render('adminlogin',{message:process.env.EmailErr})
        }
        console.log('email checked')

        const decryptPassword = await bcrypt.compareSync(userData.password, checkAdmin.password)
        if(decryptPassword !== true) {
            return res.render('adminlogin',{message:process.env.PasswordErr})
        } 
        console.log('password checked')

        console.log('Verification completed')
        return res.status(200).redirect('/adminPage')

    } catch (error) {
        console.log(error) 
       return res.render('adminlogin',{message:process.env.ErrMsg})
    }
})


router.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(id.length !== 24) {
            return res.status(404).redirect('/adminPage')
        }

        const checkQuestion = await QuestionSchema.findOne({_id:id})
        if(!checkQuestion) {
            return res.status(404).redirect('/adminPage')
        }

        const DeleteQuestion = await QuestionSchema.findOneAndDelete({_id:id}) 
        return res.status(200).redirect('/adminPage')

    } catch (error) {
        console.log(error);
    }
    
})


module.exports = router;

