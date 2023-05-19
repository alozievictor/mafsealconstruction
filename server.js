require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const PORT = process.env.PORT || 4001;

const app = express()

mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECT_DB,{useUnifiedTopology:true,useNewUrlParser:true})
    .then(res=>{
        if (res) {
            console.log('db connected');
        } else {
            console.log('db not conected');
        }
}).catch((err) => {
    console.log(err);
});

const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.set('view engine', 'ejs')
app.set(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors()) 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
app.use('/', require('./routes/contRoute'));
app.use('/', require('./routes/adminRoute'));


app.listen(process.env.PORT, ()=> {
    console.log(`server running at http://localhost:${PORT}`);
})