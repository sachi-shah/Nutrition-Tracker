const express = require('express'); // will import express package from node modules in express const(const since we wont change it)
const mongoose = require('mongoose');
const cors=require('cors');

const app=express();
app.use(express.json()); //use this middleware to convert the data into readable object
app.use(cors());

//schema for foods collection
const foodSchema = new mongoose.Schema({
    name:String,
    calories:Number,
    protein:Number,
    carbs:Number,
    fats:Number,
    fibre:Number,
    weight:Number,
})

// food collection will use foodSchema
const foodModel = new mongoose.model("foods", foodSchema);


// Mongo Connection
mongoose.connect("mongodb://127.0.0.1:27017/nutrition", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( ()=>{
    console.log("connected")
})

// post request - creating data
app.post("/food/create", (req,res)=> {

    const food = req.body;
    let foodObj=new foodModel(food); //obj for food model
    foodObj.save().then(()=>{
        res.send({status:"food stored"});
    })

})


app.get("/foods",async (req, res)=>{
    let foods=await foodModel.find();  // asynchronous => await (till this line is executed no other will execute)
    res.send({foods:foods});
})

app.listen(8000);