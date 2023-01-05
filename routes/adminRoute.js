const express = require('express');
const router = express.Router()
const adminLoginSchema = require('../models/admin')
const bcrypt = require('bcrypt');
const validator = require('validator');


router.get('/admin', (req, res) => {
    res.render('admin');
})

router.get('/Login', (req, res) => {
    res.render('adminlogin')
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
        consoler.log('email and password Posted')
        return res.render('adminlogin', {message:'Success'})

    } catch (error) {
        console.log(error)
        res.render('/adminReg')
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
            return res.render('/', {message:error})
        }

        const checkAdmin = await adminLoginSchema.findOne({email:userData.email})
        if(checkAdmin.email !== userData.email) {
            return res.render('adminlogin',{message:process.env.EmailErr})
        }

        const decryptPassword = await bcrypt.compareSync(userData.password, checkAdmin.password)
        if(decryptPassword !== true) {
            return res.render('adminlogin',{message:process.env.PasswordErr})
        } 

        return res.render('admin',{message:process.env.success})

    } catch (error) {
        console.log(error) 
        res.render('adminlogin')
    }
})

module.exports = router;

