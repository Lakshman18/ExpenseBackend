const mongoose= require('mongoose')
const Trips = require('./Trips');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.virtual('Trip',{
    ref:'Trips',
    localField:'_id',
    foreignField:'members'
})

const userModel = mongoose.model("Users", userSchema)

module.exports= userModel;