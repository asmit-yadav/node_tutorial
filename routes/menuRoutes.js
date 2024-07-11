const express=require('express')
const router=express.Router();

const MenuItem = require('./../models/MenuItem'); 

// Add the data in the database
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log('Data Saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Print or See the value in database
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Data fetched Successful !');
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == 'sour' || taste == 'spicy' || taste == 'sweet') {
            const response = await MenuItem.find({ work: taste });
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

// Update the value exist the database using object_id
router.put('/:id',async(req,res)=>
    {
        try{
            const menuId=req.params.id;
            const updatedMenuData=req.body;//updated data for the person
            const response=await MenuItem.findByIdAndUpdate(menuId,updatedMenuData,{
                new:true,
                runValidators:true // run mangoose validation
            });
         
         if(!response)
         {
           return res.status(404).json({error:"Menu not found"});
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

    // Deleted the value exist in database object_id
    router.delete('/:id', async (req, res) => {
        try {
            // Extract the personId from the request parameters
            const menuId = req.params.id;
    
            // Attempt to find and remove the person by ID from the database
            const response = await MenuItem.findByIdAndDelete(menuId);
    
            // If no person is found, send a 404 response with an error message
            if (!response) {
                return res.status(404).json({ error: "Menu not found" });
            }
    
            // If the person is successfully deleted, log the deletion and send a success message
            console.log('data deleted');
            res.status(200).json({ message: "Menu deleted successfully" });
        } catch (err) {
            // If there is an error, log it and send a 500 response with an error message
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });    
module.exports=router;