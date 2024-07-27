const express =require('express');
const {default:mongoose}=require("mongoose");
const app= express()
const PORT = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

//db connection
mongoose.connect('mongodb://127.0.0.1:27017/mernstack_curd').then(()=>{
    console.log("Db connected successfully!");
})
.catch((error)=>{
    console.log(error);
});

//user schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,    
    },
    email:{
        type:String,
        required:true,
        
    },
    Address:{
        type:String,
        required:true,
        
    },
    phone:{
        type:Number,
        required:true,
        
    },
}, {timestamps:true}
);


const User=mongoose.model("User",userSchema);

//create user
app.post("/createUser",async(req,res)=>{
    try {
        
        const bodyData =req.body;
        const user = new User(bodyData);
        const userData=await user.save();
        res.send(userData);
    } catch (error) {
res.send(error);       
    }
});

///read all user

app.get("/readalluser",async(req,res)=>{
    try {
        const userData=await User.find({});
        res.send(userData);
    } catch (error) {
        res.send(error);     
    }
});
///single
app.get("/read/:id",async(req,res)=>{
   try {
    const id=req.params.id;
    const user=await User.findById({_id:id})
    res.send(user);

   } catch (error) {
    res.send(error);
   }
});

//update
app.put("/updateuser/:id",async (req,res)=>{
    try {
        const id=req.params.id;
        const user =await User.findByIdAndUpdate({_id:id},req.body,{
            new:true,
        });
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

app.delete("/deleteuser/:id",async(req,res)=>{
try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete({_id:id});
    res.send(user);
} catch (error) {
    res.send(error);
}
});


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});