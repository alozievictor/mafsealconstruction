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

module.exports = {GetHomePage, GetAboutPage, GetServicePage, GetProjectPage, GetContactPage}