const express= require('express')
const moment= require('moment')

const Users = require('../models/Users')

const router = new express.Router()

router.get('/getUsers', async (req, res) => {
	const todos = await Users.find({isActive:true});

	res.json(todos);
});

router.post('/createUsers', async(req,res) => {
    const user = req.body;
    const newUser = new Users(user);
    await newUser.save();
    res.json(newUser);
})

module.exports = router