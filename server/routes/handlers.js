const fs = require('fs');
const uuid = require('uuid');
const mime = require('mime-types')
// const ads= require("../data/ads.json")
const db = require('../db/db')
const { getLocFromPlCode }=require("./externalApis")


const getAds= async(req,res)=>{
    const filters=req.body
    // console.log(filters)
    const ads=await db.loadAdsByFilter(filters)
    res.status(200).json({status: 200 , data: ads })
}

const getAd= async(req,res)=>{
    const {id}= req.params
    const ad= await db.loadAdById(id);
    if (ad)
        res.status(200).json({status: 200 , data:  ad})
    else
        res.status(404).json({status: 404 , message: 'Ad not found!'})
}

const getMe= async(req,res)=>{
    res.status(200).json({status: 200 , user:  req.user})
    
}
const addNewAd=async(req,res)=>{
    const {lat, lng}= await getLocFromPlCode(req.body.postalCode)
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
        postalCode:req.body.postalCode,
        price:parseFloat(req.body.price),
        tel:req.body.tel,
        email:req.body.email,
        images : req.body.images,
        lat: lat,
        lng: lng,
        date: new Date() 
    }
    

    const result= await db.addAd(adInfo)
    console.log(result)
    if (result.ack)
        res.status(200).json({status: 200 , data:result.id, message: "Advertisement posted successfully!"})
    else
        res.status(504).json({status: 504 , message: 'Error'})
        
}

const uploadImage=async(req,res)=>{
    let data = Buffer.from('');
    req.on('data', (chunk) => {
        data = Buffer.concat([data, chunk]);
    });
    req.on('end', () => {
        const filename = `/data/images/${uuid.v4()}.${ mime.extension(req.headers['content-type'])}`
        fs.createWriteStream(`public${filename}`).write(data);
        res.send({
           filename
        });
    });
}

const getMyAds=async(req,res)=>{
    const myAds=await db.loadAdsByOwner(req.user._id)
    res.status(200).json({status: 200 , data: myAds })
}

const deleteAd=async(req,res)=>{
    const {id}= req.params
    const owner= req.user._id
    const result=db.deleteAdById(id, owner)
    if (result)
        res.status(200).json({status: 200, message: "Deleted" })
    else
        res.status(404).json({status: 404 , message: "Error" }) 
}

const sendMessage=async(req, res)=>{
    // console.log(req.user)

    const msg=await db.insertMsg(req.user._id, req.body.receiver, req.body.content, req.body.adId)
    if (msg.result)
        res.status(200).json({status: 200, data:msg.msgInfo, message: "Message is sent!" })
    else
        res.status(404).json({status: 404 , message: "Error" }) 
    
}

const getMyConversations= async(req, res)=>{
    const conversation= await db.getConversations(req.user._id)
    res.status(200).json({status: 200, data:conversation })
}

const getMyMsgs=async(req, res)=>{
    const messages= await db.getConversationMsgs(req.user._id, req.params.id)
    res.status(200).json({status: 200, data:messages })

}


module.exports={
    getAds,
    getAd,
    getMe,
    addNewAd,
    uploadImage,
    getMyAds,
    deleteAd,
    sendMessage,
    getMyConversations,
    getMyMsgs
}