const express= require('express')
const mongoose= require('mongoose')
const cors = require('cors');
const userModel = require('./models/Users')

const tripRouter = require('./routers/trip.routers')

const app = express()

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log('server started')
})

mongoose.connect("mongodb+srv://TestUser:Root123@cluster0.ph65kra.mongodb.net/expense?retryWrites=true&w=majority")
    .then(()=>console.log("connected to db"))
    .catch(()=> console.log("error"))

app.use(tripRouter);

app.get('/getUsers', async (req, res) => {
	const todos = await userModel.find();

	res.json(todos);
});

app.post('/createUsers', async(req,res) => {
    const user = req.body;
    const newUser = new userModel(user);
    await newUser.save();
    res.json(newUser);
})

app.post('/login', async(req,res) => {
    const todos = await userModel.find({name: req.body['name'], password: req.body['password']});
    if(todos.length>0){
        res.json(todos);
    }else{
        res.sendStatus(404);
    }
	
})