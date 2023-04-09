const mongoose= require('mongoose')

const tripExpenseSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    trip: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Trips'
    }
})

const tripExpenseModel = mongoose.model("TripExpenses", tripExpenseSchema)

module.exports= tripExpenseModel;