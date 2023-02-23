const exp=require('express');
const expressAsyncHandler = require('express-async-handler');
const userapp=exp.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
userapp.use(exp.json())

require('dotenv').config()
//Creating a user
userapp.post('/createuser',expressAsyncHandler(async(req,res)=>{

    const authCollectionObj=req.app.get('authObj')
    let userObj=req.body
    console.log(userObj)

    let result=await authCollectionObj.findOne({username:userObj.username})
    if (result==null){
        let hPsw=await bcryptjs.hash(userObj.password,5)
        userObj={...userObj,'password':hPsw}
        await authCollectionObj.insertOne(userObj)
        res.send({'Message':"User Created Successful"})
    }
    else{
        res.send({"message":`Cannot create user as ${userObj.username} already exists`})
    }



}))

//for login
userapp.post('/login',expressAsyncHandler(async(req,res)=>{
    var userObj=req.body
    let authCollectionObj=req.app.get('authObj')
    let result=await authCollectionObj.findOne({username:userObj.username})
    if(result==null){
        res.send({message:'User not exists'})
    }
    else{
        let temp=await bcryptjs.compare(userObj.password,result.password)
        if (temp==false){
            res.send({message:"Incorrect Password"})
        }
        else{
            const SECRET_KEY=process.env.SECRET_KEY
            let token=jwt.sign({username:userObj.username},SECRET_KEY,{expiresIn:600})
            res.send({message:'LoginSuccess',payload:token,username:userObj.username})
        }
    }
}))




module.exports=userapp;