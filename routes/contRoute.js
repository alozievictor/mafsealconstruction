const { application } = require('express');
const express = require('express')
const router = express.Router()
const {GetHomePage, GetAboutPage, GetServicePage, GetProjectPage, GetContactPage} = require('../controller/control')

// router.get('/', (req, res) => {
//     res.render('index')
// })

router.get('/', GetHomePage);

router.get('/about', GetAboutPage);

router.get('/service', GetServicePage);

router.get('/contact', GetContactPage);

router.get('/project', GetProjectPage);


module.exports = router;