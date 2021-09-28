const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name','Enter Valid Name').isLength({ min: 3 }),
    body('email','Enter Valid Email').isEmail(),
    body('password','Enter Valid Password, minimum of 8 characters').isLength({ min: 8 }),
] , async (req, res)=>{
    // If errors -> return Bad Request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {return res.status(400).json({ errors: errors.array() });};
    try{
        // Check whether user with this email exist already
        let user = await User.findOne({email: req.body.email});
        if(user){return res.status(400).json({error: "Sorry, a user with this email already exists!"})}
        // New user created
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json(user)
    } // catch errors
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

module.exports = router;