const exp=require('express')
const app=exp()
const fetchapp=require('./APIs/fetchData')
const userapp=require('./APIs/auth')
const userApp=require('./APIs/users')
const mClient=require('mongodb').MongoClient
require('dotenv').config()
const URL=process.env.URL

mClient.connect(URL)
.then((client)=>{
    console.log("Connection Successful")
    const DbObj=client.db('scrap')
    const authObj=DbObj.collection('auth')
    app.set('authObj',authObj)
    const userProfileCollectionObj=DbObj.collection('userProfiles')
    app.set('userProfileCollectionObj',userProfileCollectionObj)

})
.catch((err)=>{console.log(`Error occured ${err.message}`)})


app.use('/profile',userApp)

//To user API
app.use('/users',userapp)

//To fetchUsers
app.use('/details',fetchapp)
//Handling Invalid Paths
app.use((req,res,next)=>{
    res.send({'message':`Invalid path ${req.url}`})
})


//Handling Errors
app.use((err,req,res,next)=>{
    res.send({'message':`error is ${err}`})
})

app.listen(3000,()=>{console.log("server is listining")})