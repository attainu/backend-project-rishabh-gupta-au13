const express = require("express")
const router = express.Router()
const Register = require('../../models/register')
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")



router.get('/signup', (req, res) => {
    // console.log(signupPath)
    res.render('signup')
})

router.get("/login", (req, res) => {
    res.render('login')
})

router.get("/homepage", (req, res) => {
    res.render("navbar")
})

// logic for signup check both the password are same or not 

router.post('/signup', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirm;
        if (password === cpassword) {
            const registerUser = new Register({
                Username: req.body.Username,
                email: req.body.email,
                password: req.body.password,
                confirm: req.body.confirm,
            })
            // implementing hashing of password






            const registered = await registerUser.save()
            res.status(201).render("login");

        } else {
            res.send("password are not matching")
        }

    } catch (error) {
        console.log(error)
        res.status(400).send();
    }
});

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // this is query of mongo db 
        const useremail = await Register.findOne({ email: email });
        console.log(useremail)

        // adding logic for comparing the bcrypt password

        const isMatch = await bcrypt.compare(password, useremail.password)
        console.log(isMatch)
        // isMatch will return true or false 

        if (isMatch) {
            res.status(201).render("sucess")
        } else {
            res.send("invalid login details");
        }

    } catch (error) {
        console.log(error)
        res.status(400).send("invalid login details")
    }

})


module.exports = router

