const ads= require("../data/ads.json")


const getAds= async(req,res)=>{
    res.status(200).json({status: 200 , data: ads })
}

const getAd= async(req,res)=>{
    const {id}= req.params
    const ad= ads.find(el=>el._id===id)
    if (ad)
        res.status(200).json({status: 200 , data:  ad})
    else
        res.status(404).json({status: 404 , message: 'Ad not found!'})
}

module.exports={
    getAds,
    getAd,
}