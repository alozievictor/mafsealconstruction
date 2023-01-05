const adminLoginSchema = require('../models/admin')
const bcrypt = require('bcrypt');
const validator = require('validator');


const GetAdminLogin = (req, res) => {
    res.render('admin')
}

const GetAdminReg = (req, res) => {
    res.render('adminReg')
}


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

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns
     */

const RegisterAdmin =  async(req, res) => {
    try {
        /**
         * @type {{email:String, password:String}}
         */
        const userData = req.body;

        const error = validateData(userData)
        if(error) {
            return res.render('admin',{message:error})
        }

        const Hash = bcrypt.hashSync(userData.password, 5)
        userData.password = Hash
        await adminLoginSchema.create(userData);
        return res.render('admin', {message:'Success'})

    } catch (error) {
        console.log(error)
        res.render('/adminlogin')
    }
}

const LoginAdmin = async(req, res)   => {
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
            return res.render('/adminlogin',{message:process.env.EmailErr})
        }

        const decryptPassword = await bcrypt.compareSync(userData.password, checkAdmin.password)
        if(decryptPassword !== true) {
            return res.render('/adminlogin',{message:process.env.PasswordErr})
        } 

        return res.render('/admin',{message:process.env.success})

    } catch (error) {
        console.log(error) 
        res.render('/adminlogin')
    }
}


module.exports = {GetAdminLogin, GetAdminReg, RegisterAdmin, LoginAdmin}