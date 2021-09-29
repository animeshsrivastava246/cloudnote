const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Animesh!$Anni';

//Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',
[   body('name','Enter Valid Name').isLength({ min: 3 }),
    body('email','Enter Valid Email').isEmail(),
    body('password','Enter Valid Password, minimum of 8 characters').isLength({ min: 8 }),] ,
    async (req, res)=>{
    // If errors -> return Bad Request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {return res.status(400).json({ errors: errors.array() });};
    try{
        // Check whether user with this email exist already
        let user = await User.findOne({email: req.body.email});
        if(user){return res.status(400).json({error: "Sorry, a user with this email already exists!"})}
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // New user created
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({authToken})
    } // catch errors
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

module.exports = router;