const express = require('express');
const { routes } = require('../../app');
const { Router } = require('express');

const mongoose = require('mongoose')
const Fact = require('./models/fact')

const router = express.Router();

router.get('/', (req,res,next)=>{

    Fact
    .countDocuments()
    .exec((err,count)=>{
        var random = Math.floor(Math.random()*count)
        Fact
        .findOne()
        .skip(random)
        .exec()
        .then((result)=>{
            console.log(result)
            res.status(200).json(result)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json(err)

        })
    })
    //Fact
    //.find()
    //.exec()
    //.then((result)=>{
      //  console.log(result)
        //res.status(200).json(result)
    //})
    //.catch((err)=>{
     //   console.log(err)
      //  res.status(500).json(err)
    //})
    //res.status(200).json({
      //  message:"GET request works"
    //})
})


router.post('/',(req,res,next)=>{

    const fact= new Fact({
        _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            author:req.body.author
    })

    fact
    .save()
    .then((result)=>{
        console.log(result)
        res.status(200).json({
            message: 'POST req works',
            createdFact : fact
        })
        
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

//    const fact = {
       // name : req.body.name,
     //   author:req.body.author
   // }
    //res.status(200).json({
    //    message:"Post request works",
  //      createdFact: fact
  //  })
  
})

router.delete('/:factsId',(req,res,next)=>{
    const id = req.params.factsId;

    Fact
    .remove({_id: id})
    .exec()
    .then((result)=>{
        console.log(result)
        res.status(200).json(result)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json(err)
    })
    //res.status(200).json({
      //  message:"Delete request works"
    //})
})

module.exports = router;