const express=require('express')
const router=express.Router();
const Person = require('./../models/Person');
const { assign } = require('lodash');
const { ConnectionStates } = require('mongoose');
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched Successful !');
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data Saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log("response fetched");
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: "Invalid work Type" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.put('/:id',async(req,res)=>
{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;//updated data for the person
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true // run mangoose validation
        });
     
     if(!response)
     {
       return res.status(404).json({eroor:"Person not found"});
     }
     console.log('data updated');
     res.status(404).json({ error: "Invalid work Type" });
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        // Extract the personId from the request parameters
        const personId = req.params.id;

        // Attempt to find and remove the person by ID from the database
        const response = await Person.findByIdAndDelete(personId);

        // If no person is found, send a 404 response with an error message
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }

        // If the person is successfully deleted, log the deletion and send a success message
        console.log('data deleted');
        res.status(200).json({ message: "Person deleted successfully" });
    } catch (err) {
        // If there is an error, log it and send a 500 response with an error message
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports=router;