const mongoose= require('mongoose')

const tripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default:true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Users'
        }
      ]
})

tripSchema.virtual('TripExpense',{
    ref:'TripExpenses',
    localField:'_id',
    foreignField:'trip'
})

const tripModel = mongoose.model("Trips", tripSchema)

module.exports= tripModel;