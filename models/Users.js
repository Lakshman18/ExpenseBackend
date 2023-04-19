const mongoose= require('mongoose')
const Trips = require('./Trips');
const Installments = require('./Installments');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true,
    }
})

userSchema.virtual('Trip',{
    ref:'Trips',
    localField:'_id',
    foreignField:'members'
})

userSchema.virtual('Installments',{
    ref:'Installments',
    localField:'_id',
    foreignField:'user'
})

const userModel = mongoose.model("Users", userSchema)

module.exports= userModel;