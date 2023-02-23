const exp=require('express')
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const axios=require('axios')
userApp.use(exp.json())

userApp.post('/createDetails',expressAsyncHandler(async(req,res)=>{
    let userObj=req.app.get('userProfileCollectionObj')
    let userDetails=req.body
    let data={}
    var score=0;
data['username']=userDetails.username

    //leetcode
    if(userDetails.lc_username==''){
        data['lc']={
            "username": "",
            "rating": '',
            "noOfProblemsSolved": "",
            "noOfEasyProblems": "",
            "noOfMediumProblems": "",
            "noOfHardProblems": "",
            "badges": "",
            "rank": ""
    }
    }
    else{
        const lc_profile=await axios.get('http://localhost:3000/details/lc/'+userDetails.lc_username)
        data['lc']=lc_profile.data.payload
        score+=(parseInt(lc_profile.data.payload.noOfProblemsSolved)*50)
        if(parseInt(lc_profile.data.payload.noOfContests)>=3){
            var rat=''
            var rats=lc_profile.data.payload.rating
            for(var i=0;i<rats.length;i++){
                if (rats[i]>='0' && rats[i]<='9'){
                    rat+=rats[i]
                }
            }
            score+=parseInt(Math.pow(parseInt(rat)-1300,2)/30)
            data={...data,"lcScore":score}
        }
       
    }

    //code chef
    if(userDetails.cc_username==''){
        data['cc']={
            "rating": "",
            "name": "",
            "GlobalRank": "",
            "CountryRank": "",
            "noOfProblemsSolved": "",
            "noOfContests": ""
        }
    }
    else{
        const cc_profile=await axios.get('http://localhost:3000/details/cc/'+userDetails.cc_username)
        data['cc']=cc_profile.data.payload
        var ccscore=parseInt(cc_profile.data.payload.noOfProblemsSolved)*10
        var ccContest=cc_profile.data.payload.noOfContests
        if(ccContest>=3){
            ccscore+=parseInt(Math.pow(parseInt(cc_profile.data.payload.rating)-1300,2)/30)
        }
        score+=ccscore
        data={...data,"ccScore":ccscore}
        
    }

    //codeforces
    if(userDetails.cf_username==''){
        data['cf']={
            "username": "",
            "rating": "",
            "noOfProblemsSolved": "",
            "noOfContests": ''
        }
    }
    else{
        const cf_profile=await axios.get('http://localhost:3000/details/cf/'+userDetails.cf_username)
        data['cf']=cf_profile.data.payload
        var cfScore=parseInt(cf_profile.data.payload.noOfProblemsSolved)*10
        if (cf_profile.data.payload.noOfContests>=3){
             cfScore+=parseInt(Math.pow(parseInt(cf_profile.data.payload.rating)-1200,2)/30)
        }
        score+=cfScore
        data={...data,"cfScore":cfScore}
    }

    //spoj
    if(userDetails.spoj_username==''){
        data['spoj']={
            "username": "",
        }
    }
    else{
        const spoj_profile=await axios.get('http://localhost:3000/details/spoj/'+userDetails.spoj_username)
        data['spoj']=spoj_profile.data.payload
        var x=spoj_profile.data.payload.noOfProblemsSolved*20
        data={...data,"spojScore":x}
        score+=x

    }
    data={...data,"score":score}

    //Create User
    var userProfileCollectionObj=req.app.get('userProfileCollectionObj')
    await userProfileCollectionObj.insertOne(data)
    res.send({"message":"data inserted successfully",payload:data})
}))



//Fetch user profile details
userApp.get('/getdetails/:username',expressAsyncHandler(async(req,res)=>{
    let username=req.params.username
    let userProfileCollectionObj=req.app.get('userProfileCollectionObj')
    let result=await userProfileCollectionObj.findOne({username:username})
    res.send({message:"User details are",payload:result})
}))

//update details

userApp.put('/updatedetails',expressAsyncHandler(async(req,res)=>{
    let userProfileCollectionObj=req.app.get('userProfileCollectionObj')
    let newUserObj=req.body
    await userProfileCollectionObj.updateOne({username:newUserObj.username},{$set:{...newUserObj}})
    res.send({message:'UserUpdated Successfully'})
}))

module.exports=userApp