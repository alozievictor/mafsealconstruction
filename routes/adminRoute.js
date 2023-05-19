const express = require('express');
const router = express.Router()
const adminLoginSchema = require('../models/admin')
const QuestionSchema = require('../models/question')
const bcrypt = require('bcrypt');
const {validateData, UploadValidation} = require('../utils/questionValidation')

router.get('/dashboard', (req, res) => {
    res.redirect('/logins')
  })
  
  router.get('/logins', (req, res) => {
    res.render('logins')
  })

  router.get('/admin', (req, res) => {
    return res.status(200).redirect('/adminPage')
  })
  
  router.get('/form', (req, res) => {
    res.render('admin/forms')
  })

  router.get('/tables', (req, res) => {
    res.render('admin/tables')
  })

  router.get('/modal', (req, res) => {
    res.render('admin/modals')
  })

  router.get('/upload', (req, res) => {
    res.render('admin/upload');
  })
  

router.get('/admin', (req, res) => {
    res.render('adminReg',{message:''});
})

router.get('/logout', (req, res) => {
    res.render('index',{validationError:false})
})

router.get('/Login', (req, res) => {
    res.render('admin/adminlogin',{message:''});
})

router.get('/adminPage', async (req, res) => {
    try {
        const Questions = await QuestionSchema.find() 
        if(Questions) {
            return res.render('admin/admin',{Questions:Questions, message:''})
        }
        return res.status(400).redirect('/Login',{message:''})
    } catch (error) {
        console.log(error)
    }
})


/** 
 * @param {{email:String, password:String}}
 */

// router.post('/RegAdmin', async (req, res) => {
//     try {
//         /**
//          * @type {{email:String, password:String}}
//          */
//         const userData = req.body;
//         let session;
//         const error = validateData(userData)
//         if(error) {
//             console.log(error);
//             return res.render('adminReg',{message:error})
//         }
//         session=req.session;
//         session.userid=req.body.email;
//         console.log(req.session)
//         const Hash = bcrypt.hashSync(userData.password, 5)
//         userData.password = Hash
//         await adminLoginSchema.create(userData);
//         console.log('email and password Posted')
//         return res.render('adminlogin', {message:'Success'})

//     } catch (error) {
//         console.log(error)
//         res.render('adminReg')
//     }
// })


router.post('/LoginAdmin', async (req, res) => {
    try {
        /**
         * @type {{email:String, password:String}}
         */
          const userData = req.body;
          let session;

        const error = validateData(userData)
        if(error) {
            return res.render('adminlogin',{message:error})
        }

        session=req.session;
        session.userid=req.body.email;
        console.log(session);

        const checkAdmin = await adminLoginSchema.findOne({email:userData.email})

        if(checkAdmin.email !== userData.email) {
            return res.render('adminlogin',{message:process.env.EmailErr})
        }

        const decryptPassword = await bcrypt.compareSync(userData.password, checkAdmin.password)
        if(decryptPassword !== true) {
            return res.render('adminlogin',{message:process.env.PasswordErr})
        } 
        return res.status(200).redirect('/adminPage')

    } catch (error) {
       return res.render('admin/adminlogin',{message:process.env.ErrMsg})
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

router.post('/uploadProject', async(req, res) => {
    try {
        const projectData = req.body;

        const error = UploadValidation(projectData) 
        if(error) {
          return console.log(error)
        }

        return console.log('validation passed successfully...')

    } catch (error) {
        console.log(error)
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    console.log('session destroyed...')
    return res.redirect('/')
})


router.post('/uploadProject', (req, res) => {
    try {
        const projectData = req.body;

        const error = {}

    } catch (error) {
        console.log(error)
    }
})


module.exports = router;

