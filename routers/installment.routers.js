const express= require('express')
const moment= require('moment')

const Installments = require('../models/Installments')
const Users = require('../models/Users')

const router = new express.Router()

router.get('/getInstallments', async (req, res) => {
    try{
        const result = []
        var date = new Date();
        
        for(var i=0; i<3; i++){
            let tempItem = {month:'', items:[]}
            var firstDay = new Date(date.getFullYear(), date.getMonth()+i, 1).toLocaleString('en-US', { timeZone: 'Asia/Colombo' });;
            var lastDay = new Date(date.getFullYear(), date.getMonth()+1+i, 0).toLocaleString('en-US', { timeZone: 'Asia/Colombo' });;
            var installments = await Installments.find({date:{$gte: firstDay, $lte: lastDay} });
           
            installments.map(item=> tempItem.items.push(item) )
            tempItem.month = getMonthName(date.getMonth()+1+i)
            result.push(tempItem) 
 
        }

        if(!result){
            res.status(404).send()
        }
        else{
            res.status(200).send(result)
        }
    }
    catch(e){
        res.status(400).send(e.message)
    }
});

router.post('/createInstallments', async(req,res) => {
    try{
        if(req.body._id === ''){
            delete req.body._id;
            for(var i=1; i<4; i++){
                const installment = req.body;
                if(installment.user === ''){
                    installment.user = null;
                }  
                const newInstallment = new Installments(installment);

                var newDate = new Date(req.body.date)
                newInstallment.date = new Date(newDate.setMonth(newDate.getMonth()+ i-1));
                newInstallment.installmentNo = i;

                if(installment.user != null){
                    const user = await Users.findOne({_id: installment.user});
                    newInstallment.userName = user.name;
                }
                await newInstallment.save();
            }
            const installments = await Installments.find({name: req.body.name});
            res.json(installments);
        } 
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

router.delete('/deleteInstallements/:id', async(req,res) => {
    try{
        const installemnt = await Installments.findOne({ _id: req.params.id})

        if(!installemnt){
            return res.status(404).send()
        }
        const selectedInstallemnts = await Installments.find({ name: installemnt.name})
        selectedInstallemnts.forEach( async item=>{
            await Installments.deleteOne(item)
        });
        res.status(200).send()
    }
    catch(e){
        res.status(400).send(e.message)
    }
}) 

router.post('/isExistsInstallements/:name', async(req,res) => {
    try{
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
        var lastDay = new Date(date.getFullYear(), date.getMonth()+3, 0).toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            
        const installemnt = await Installments.find({ name: req.params.name, date:{$gte: firstDay, $lte: lastDay} })
        if(installemnt.length === 0){
            res.status(200).send(false)
        }
        else{
            res.status(200).send(true)
        } 
    }
    catch(e){
        res.status(400).send(e.message)
    }
}) 

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }
 

module.exports = router