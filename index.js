const express= require('express')
const mongoose= require('mongoose')
const cors = require('cors');
const userModel = require('./models/Users')

const userRouter = require('./routers/user.routers')
const tripRouter = require('./routers/trip.routers')
const installmentRouter = require('./routers/installment.routers')


const app = express()

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log('server started')
})

mongoose.connect("mongodb+srv://TestUser:Root123@cluster0.ph65kra.mongodb.net/expense?retryWrites=true&w=majority")
    .then(()=>console.log("connected to db"))
    .catch(()=> console.log("error"))

app.use(userRouter);   
app.use(tripRouter);
app.use(installmentRouter);
