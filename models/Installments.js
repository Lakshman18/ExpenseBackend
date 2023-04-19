const mongoose= require('mongoose')

const installmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    installmentNo: {
        type: Number,
        required: true,
    },
    isCombined: {
        type: Boolean,
        required: true,
    },
    user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Users'
    }
})
 
const installmentModel = mongoose.model("Installments", installmentSchema)

module.exports= installmentModel;