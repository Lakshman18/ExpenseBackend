const express= require('express')
const moment= require('moment')

const Trips = require('../models/Trips')
const TripExpenses = require('../models/TripExpenses')

const router = new express.Router()

router.get('/getTrips', async (req, res) => {
    try{
        const trips = await Trips.find({isActive:true});
        if(!trips){
            res.status(404).send()
        }
        else{
            res.status(200).send(trips)
        }
    }
    catch(e){
        res.status(400).send(e.message)
    }
});

router.post('/createTrips', async(req,res) => {
    try{
        if(req.body._id === ''){
            delete req.body._id;
            const trip = req.body;
            const newTrip = new Trips(trip);
            await newTrip.save();
            res.json(newTrip);
        }
        else{
            const trip1 = await Trips.findOneAndUpdate({ _id: req.body._id},req.body)
            if(!trip1){
            return res.status(404).send()
            }
            await trip1.save();
            return res.status(200).send()
        }
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

router.delete('/deleteTrip/:id', async(req,res) => {
    try{
        const trip = await Trips.findOne({ _id: req.params.id})
        if(!trip){
           return res.status(404).send()
        }
        trip.isActive = false;
        await trip.save();
        res.status(200).send(trip)
    }
    catch(e){
        res.status(400).send(e.message)
    }
}) 


router.get('/getTripExpensess/:id', async (req, res) => {
    try{
        const tripExpensess = await TripExpenses.find({trip: req.params.id});
        tripExpensess.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        });
        const uniqueDates = [...new Set(tripExpensess.map(item => moment(item.date).utc().format('YYYY-MM-DD')))];
        uniqueDates.sort(function(a,b){
            return new Date(a) - new Date(b);
        });
        const result = []
        uniqueDates.map((date) => {
            let tempItem = {date:date, items:[]}
            tripExpensess.map((item) => {
                if( moment(item.date).utc().format('YYYY-MM-DD') == date ) {
                    tempItem.items.push(item) 
                }
            })
            result.push(tempItem) 
        })
        res.status(200).send(result)
    }
    catch(e){
        res.status(400).send(e.message)
    }
});

router.post('/createTripExpenses', async(req,res) => {
    try{
        if(req.body._id === ''){
            delete req.body._id;
            const tripExpense = req.body;
            const newTripExpense = new TripExpenses(tripExpense);
            await newTripExpense.save();
            res.json(newTripExpense);
        }
        else{
            const tripExpense1 = await TripExpenses.findOneAndUpdate({ _id: req.body._id},req.body)
            if(!tripExpense1){
            return res.status(404).send()
            }
            await tripExpense1.save();
            return res.status(200).send()
        }
    }
    catch(e){
        res.status(400).send(e.message)
    }
})


router.delete('/deleteTripExpense/:id', async(req,res) => {
    try{
        const tripExpense = await TripExpenses.findOne({ _id: req.params.id})
        if(!tripExpense){
           return res.status(404).send()
        }
        tripExpense.isActive = false;
        await TripExpenses.deleteOne(tripExpense)
        res.status(200).send()
    }
    catch(e){
        res.status(400).send(e.message)
    }
}) 

module.exports = router