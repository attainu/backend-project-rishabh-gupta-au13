const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const connectDB = require('./db/conn')
connectDB()
const Register = require('./models/register')
const path = require("path")
const hbs = require("hbs")
const app = express();
const port = process.env.PORT || 5000;
const publicPath = path.join(__dirname, "public")

// to setup the view engine
app.set("view engine", "hbs")



// to set up the static directory
app.use(express.static(publicPath))

// to convert json in string
app.use(express.json());

// to convert form data 
app.use(express.urlencoded({ extended: false }))

// all the authenticaton routes
const loginroutes = require('./api/routes/logincustom')
const googleroutes = require('./api/routes/googleroute')
const facebookroutes = require('./api/routes/facebookroute')



// for custom log in
app.use('/', loginroutes);

// for google log in
app.use('/', googleroutes);

// for facebook login
app.use('/', facebookroutes)

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

