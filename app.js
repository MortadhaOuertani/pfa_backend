const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')

const indexRouter = require('./routes/index');

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*security*/
app.use(passport.initialize())
require('./security/passport')(passport)
/*data base connection*/
mongoose.connect('mongodb+srv://mortadha:mortadha1@cluster0.16bm9y3.mongodb.net/authentification?retryWrites=true&w=majority').then(()=>console.log('connted to db')).catch(err=>console.log(err))
/*route*/
app.use('/api', indexRouter);





module.exports = app;
