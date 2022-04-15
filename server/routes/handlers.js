const ads= require("../data/ads.json")
const db = require('../db/db')


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

const getMe= async(req,res)=>{
    res.status(200).json({status: 200 , user:  req.user})
    
}
const addNewAd=async(req,res)=>{
    const adInfo={
        owner:req.user._id,
        title:req.body.title,
        unitType:req.body.unitType,
        bedrooms:req.body.bedrooms,
        bathrooms:req.body.bathrooms,
        pet:req.body.pet,
        furniture:req.body.furniture,
        apliances:{
            laundryInUnit: req.body.laundryInUnit? true: false,
            laundryInBuilding: req.body.laundryInBuilding? true: false,
            dishwasher: req.body.dishwasher? true: false,
            fridge: req.body.fridge? true: false
        },
        air:req.body.air,
        outdoorSpc:{
            yard: req.body.yard? true: false,
            balcony: req.body.balcony? true: false,
        },
        smoke:req.body.smoke,
        utilities:{
            hydro: req.body.hydro? true: false,
            heat: req.body.heat? true: false,
            water: req.body.water? true: false
        },
        more:{
            tv: req.body.tv? true: false,
            internet: req.body.internet? true: false,
        },
        parking:req.body.parking,
        description:req.body.description,
        province:req.body.province,
        city:req.body.city,
        stNum:req.body.stNum,
        stName:req.body.stName,
        plcode:req.body.plcode,
        price:req.body.price,
        tel:req.body.tel,
        email:req.body.email,
    }
    const result= await db.addAd(adInfo)
    if (result)
        res.status(200).json({status: 200 , message: "Advertisement posted successfully!"})
    else
        res.status(504).json({status: 504 , message: 'Error'})
        
}


module.exports={
    getAds,
    getAd,
    getMe,
    addNewAd,
}