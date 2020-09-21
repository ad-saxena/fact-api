const express = require('express');

const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

const bodyParser = require('body-parser');

const factRouters = require('./api/routes/facts')
mongoose.connect("mongodb+srv://admin:admin@cluster0.qizer.azure.mongodb.net/<dbname>?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology:true

})


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','*')
    if(req.method==="OPTIONS"){
        res.header('Access-Control-Allow-Methods','PUT , GET , DELETE, PATCH')
        return res.status(200).json({})
    }
    next();


})

app.use('/facts',factRouters);


module.exports = app; 