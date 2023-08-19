const express=require('express');
const Dealership =require('../models/dealership');
const router=new express.Router();

//dealership register
router.post('/register',async(req,res)=>{
    const dealership=new Dealership(req.body)
    try {
       await dealership.save()
       res.status(201).send(dealership)
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports=router;