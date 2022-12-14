const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require("../models/user");


// login
router.post("/login", async (req, res) => {
    const user = await User.findOne({login: req.body.login});
    if(user){
        const auth = await bcrypt.compare(req.body.password, user.password);
        if(auth){
            res.json(user);
        }
        else{
            res.json({
                error: "password"
            });
        }
    }
    else{
        res.json({
            error: "login"
        });
    }

});


// register
router.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const userExists = await User.exists({login: req.body.login });
    if(userExists==null){
        const newUser = new User(
            req.body
        );
        const savedUser = await newUser.save();
        res.json(savedUser);
    }
    else{
        res.json(userExists);
    }
});


// get specific user by his id
router.get("/get/:id", async (req, res) => {
    const u = await User.findById({ _id : req.params.id });
    res.json(u);
});



module.exports = router;