const exp=require('express')
const fetchapp=exp.Router()
const cheerio=require('cheerio')
const axios=require('axios')
const expressAsyncHandler=require('express-async-handler')


//CodeChef
fetchapp.get('/cc/:username',expressAsyncHandler(async(req,responce)=>{

    const URL='https://www.codechef.com/users/'+req.params.username
    console.log(URL)

    let resObj={}
    const res= await axios(URL)


    // const body=await res.text()
    const $ =cheerio.load(res.data)


    //For getting CC RATING
    const rating=$('.rating-number')
    resObj['rating']=$(rating[0]).text()

    // name
    const name=$('h1[class="h2-style"]')
    resObj['name']=$(name[0]).text()
   
    //Global rank
    const gRank=$('body > main > div > div > div > aside > div:nth-child(1) > div > div.rating-ranks > ul > li:nth-child(1) > a > strong')
    resObj['GlobalRank']=$(gRank[0]).text()
    
    //Country Rank
    const cRank=$('body > main > div > div > div > aside > div:nth-child(1) > div > div.rating-ranks > ul > li:nth-child(2) > a > strong')
    resObj['CountryRank']=$(cRank[0]).text()

    
    //No of probles solved
    const solved=$('body > main > div > div > div > div > div > section:nth-child(7) > div > h5:nth-child(1)')
    let prblm=$(solved[0]).text()
    resObj['noOfProblemsSolved']=prblm.slice(14,prblm.length-1)

    //No Of Contests
    const noOfContests=$('body > main > div > div > div > div > div > section.rating-graphs.rating-data-section > div.rating-title-container > div > b')
    resObj['noOfContests']=$(noOfContests[0]).text()
    responce.send({'message':'User Details are','payload':resObj})
    
}))


//LeetCode
fetchapp.get('/lc/:username',expressAsyncHandler(async(req,res)=>{

    const URL='https://leetcode.com/'+req.params.username
    console.log(URL)
    let resObj={}
    const result= await axios(URL)

    // const body=await res.text()
    const $ =cheerio.load(result.data)

    //For username
    const username=$('#__next > div > div.mx-auto.mt-\\[50px\\].w-full.grow.p-4.md\\:mt-0.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl > div > div:nth-child(1) > div > div.text-label-2.dark\\:text-dark-label-2.flex.flex-col.space-y-4 > div > div.flex.flex-col > div:nth-child(1) > div')
    resObj['username']=$(username[0]).text()

    //for Contest Rating
    const rating=$('#__next > div > div.mx-auto.mt-\\[50px\\].w-full.grow.p-4.md\\:mt-0.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl > div > div.w-full.lc-lg\\:max-w-\\[calc\\(100\\%_-_316px\\)\\] > div.shadow-level3.dark\\:shadow-dark-level3.bg-layer-1.dark\\:bg-dark-layer-1.rounded-lg.my-4.hidden.h-\\[200px\\].w-full.p-4.lc-lg\\:mt-0.lc-xl\\:flex > div.lc-md\\:min-w-none.h-full.w-full.min-w-\\[200px\\].flex-1 > div > div.relative.min-h-\\[53px\\].text-xs > div > div:nth-child(1) > div.text-label-1.dark\\:text-dark-label-1.flex.items-center.text-2xl')
    resObj['rating']=$(rating[0]).text()


    //No of problems Solved
    const noOfProblemsSolved=$('#__next > div > div.mx-auto.mt-\\[50px\\].w-full.grow.p-4.md\\:mt-0.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl > div > div.w-full.lc-lg\\:max-w-\\[calc\\(100\\%_-_316px\\)\\] > div.flex.w-full.flex-col.space-x-0.space-y-4.lc-xl\\:flex-row.lc-xl\\:space-y-0.lc-xl\\:space-x-4 > div.min-w-max.max-w-full.w-full.flex-1 > div > div.mx-3.flex.items-center.lc-xl\\:mx-8 > div.mr-8.mt-6.flex.min-w-\\[100px\\].justify-center > div > div > div > div.text-\\[24px\\].font-medium.text-label-1.dark\\:text-dark-label-1')
    resObj['noOfProblemsSolved']=$(noOfProblemsSolved[0]).text()

    //No of easy problems
    const noOfEasyProblems=$('#__next > div > div.mx-auto.mt-\\[50px\\].w-full.grow.p-4.md\\:mt-0.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl > div > div.w-full.lc-lg\\:max-w-\\[calc\\(100\\%_-_316px\\)\\] > div.flex.w-full.flex-col.space-x-0.space-y-4.lc-xl\\:flex-row.lc-xl\\:space-y-0.lc-xl\\:space-x-4 > div.min-w-max.max-w-full.w-full.flex-1 > div > div.mx-3.flex.items-center.lc-xl\\:mx-8 > div.flex.w-full.flex-col.space-y-4.lc-xl\\:max-w-\\[228px\\] > div:nth-child(1) > div.flex.w-full.items-end.text-xs > div.flex.flex-1.items-center > span.mr-\\[5px\\].text-base.font-medium.leading-\\[20px\\].text-label-1.dark\\:text-dark-label-1')
    resObj['noOfEasyProblems']=$(noOfEasyProblems).text()

     //No of Medium problems
    const noOfMediumProblems=$('#__next > div > div.mx-auto.mt-\\[50px\\].w-full.grow.p-4.md\\:mt-0.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl > div > div.w-full.lc-lg\\:max-w-\\[calc\\(100\\%_-_316px\\)\\] > div.flex.w-full.flex-col.space-x-0.space-y-4.lc-xl\\:flex-row.lc-xl\\:space-y-0.lc-xl\\:space-x-4 > div.min-w-max.max-w-full.w-full.flex-1 > div > div.mx-3.flex.items-center.lc-xl\\:mx-8 > div.flex.w-full.flex-col.space-y-4.lc-xl\\:max-w-\\[228px\\] > div:nth-child(2) > div.flex.w-full.items-end.text-xs > div.flex.flex-1.items-center > span.mr-\\[5px\\].text-base.font-medium.leading-\\[20px\\].text-label-1.dark\\:text-dark-label-1')
    resObj['noOfMediumProblems']=$(noOfMediumProblems).text()
    
     //No of Hard problems
    const noOfHardProblems=$('#__next > div > div.mx-auto.mt-\\[50px\\].w-full.grow.p-4.md\\:mt-0.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl > div > div.w-full.lc-lg\\:max-w-\\[calc\\(100\\%_-_316px\\)\\] > div.flex.w-full.flex-col.space-x-0.space-y-4.lc-xl\\:flex-row.lc-xl\\:space-y-0.lc-xl\\:space-x-4 > div.min-w-max.max-w-full.w-full.flex-1 > div > div.mx-3.flex.items-center.lc-xl\\:mx-8 > div.flex.w-full.flex-col.space-y-4.lc-xl\\:max-w-\\[228px\\] > div:nth-child(3) > div.flex.w-full.items-end.text-xs > div.flex.flex-1.items-center > span.mr-\\[5px\\].text-base.font-medium.leading-\\[20px\\].text-label-1.dark\\:text-dark-label-1')
    resObj['noOfHardProblems']=$(noOfHardProblems).text()

    //No Of Badges
    const badges=$('#__next > div > div.mx-auto.mt-\\[50px\\].w-full.grow.p-4.md\\:mt-0.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl > div > div.w-full.lc-lg\\:max-w-\\[calc\\(100\\%_-_316px\\)\\] > div.flex.w-full.flex-col.space-x-0.space-y-4.lc-xl\\:flex-row.lc-xl\\:space-y-0.lc-xl\\:space-x-4 > div.shadow-level3.dark\\:shadow-dark-level3.bg-layer-1.dark\\:bg-dark-layer-1.rounded-lg.h-\\[186px\\].w-full.flex-1 > div > div > div.flex.items-start.justify-between > div > div.text-label-1.dark\\:text-dark-label-1.mt-1\\.5.text-2xl.leading-\\[18px\\]')
    resObj['badges']=$(badges[0]).text()

    //Rank
    const rank=$('#__next > div > div.mx-auto.mt-\\[50px\\].w-full.grow.p-4.md\\:mt-0.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl > div > div:nth-child(1) > div > div.text-label-2.dark\\:text-dark-label-2.flex.flex-col.space-y-4 > div > div.flex.flex-col > div.flex.flex-1.items-end.space-x-\\[5px\\].text-base > span.ttext-label-1.dark\\:text-dark-label-1.font-medium')
    resObj['rank']=$(rank[0]).text()

    //No Of Contests
    const noOfContests=$('#__next > div > div.mx-auto.mt-\\[50px\\].w-full.grow.p-4.md\\:mt-0.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl > div > div.w-full.lc-lg\\:max-w-\\[calc\\(100\\%_-_316px\\)\\] > div.shadow-level3.dark\\:shadow-dark-level3.bg-layer-1.dark\\:bg-dark-layer-1.rounded-lg.my-4.hidden.h-\\[200px\\].w-full.p-4.lc-lg\\:mt-0.lc-xl\\:flex > div.lc-md\\:min-w-none.h-full.w-full.min-w-\\[200px\\].flex-1 > div > div.relative.min-h-\\[53px\\].text-xs > div > div.hidden.md\\:block > div.text-label-1.dark\\:text-dark-label-1.font-medium.leading-\\[22px\\]')
    resObj['noOfContests']=$(noOfContests[0]).text()
    
    //Send Response
    res.send({'message':'user details are ','payload':resObj})
}))



//codeForces
fetchapp.get('/cf/:username',expressAsyncHandler(async(req,res)=>{

    const URL='https://codeforces.com/profile/'+req.params.username
    console.log(URL)
    const result=await axios.get(URL)
    resObj={}
    const $=cheerio.load(result.data)

    //UserName
    const username=$('#pageContent > div:nth-child(3) > div.userbox > div.info > div > h1 > a')
    resObj['username']=$(username[0]).text()

    //contest rating
    const rating=$('#pageContent > div:nth-child(3) > div.userbox > div.info > ul > li:nth-child(1) > span.user-gray')
    resObj['rating']=$(rating[0]).text()

    const noOfProblemsSolved=$('#pageContent > div._UserActivityFrame_frame > div > div._UserActivityFrame_footer > div:nth-child(1) > div:nth-child(1) > div._UserActivityFrame_counterValue')
    let idx=0
    let temp=$(noOfProblemsSolved).text()
    for(var i=0;i<temp.length;i++){
        if(temp[i]===' '){
            idx=i;
            break;
        }
    }
    // console.log(idx)
    resObj['noOfProblemsSolved']=temp.slice(0,idx)

    // URL For Contest

    const URL1='https://codeforces.com/contests/with/'+req.params.username
    let  result1=await axios.get(URL1)
    const $$=cheerio.load(result1.data)

    //no of contests
    const noOfContests=$$('#pageContent > div.datatable > div:nth-child(6) > table > tbody > tr')
    resObj['noOfContests']=noOfContests.length

    //Response
    res.send({"message":"user details are","payload":resObj})
}))

//Spoj
fetchapp.get('/spoj/:username',expressAsyncHandler(async(req,res)=>{

    const URL='https://www.spoj.com/users/'+req.params.username

    const result=await axios.get(URL)
    const $=cheerio.load(result.data)
    console.log(URL)
    var resObj={}
    //Username
    const username=$('#user-profile-left > h4')
    resObj['username']=$(username[0]).text().slice(1,)

    //no of problems solved
    const noOfProblemsSolved=$('#content > div:nth-child(2) > div > div.col-md-9 > div:nth-child(2) > div > div.row > div.col-md-6.text-center.valign-center > dl > dd:nth-child(2)')
    resObj['noOfProblemsSolved']=parseInt($(noOfProblemsSolved[0]).text())

    //GLobal rank
    const gRank=$('#user-profile-left > p:nth-child(6)')
    var rank=$(gRank[0]).text()
    var Grank=''
    for (var i=14;i<rank.length;i++){
        if(rank[i]==' ')
        {
            break;
        }
        Grank+=rank[i]
    }

    resObj['GlobalRank']=parseInt(Grank)
    
    //Send Response
    res.send({'message':"users data is ","payload":resObj})
}))







module.exports= fetchapp;