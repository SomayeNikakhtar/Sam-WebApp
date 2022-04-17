const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config({path:"./.env"});
const { MONGO_URI, DB_NAME } = process.env;


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let clientDB = null;
const getClientDB = async() => {
    if(!clientDB){
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        clientDB = await client.db(DB_NAME);
    }
    return clientDB;
}

const getUser = async (username) => {
    try{
        const db = await getClientDB();
        const result = await db.collection("users").find({_id:username}).toArray();
        if (result)
            return result[0]
        else
            return undefined;

    }catch(err){
        console.log(err.stack)
    }
}

const addUser = async (user) =>{
    const db = await getClientDB();
    user._id=user.username;
    const result = await db.collection("users").insertOne(user);
    return result.acknowledged;
    
}

const addAd=async (ad) =>{
    const db = await getClientDB();
    const result = await db.collection("advertisements").insertOne(ad);
    return result.acknowledged;
    
}

const loadAds=async()=>{
    try{
        const db = await getClientDB();
        const result = await db.collection("advertisements").find().toArray()
        
        return result;        
    }catch(err){
        console.log(err.stack)
    }
}

const loadAdById=async(id)=>{
    try{
        const db = await getClientDB();
        const result = await db.collection("advertisements").find({_id:new ObjectId(id)}).toArray()
        
        if (result)
            return result[0]
        else
            return undefined;  
    }catch(err){
        console.log(err.stack)
    }
}

const loadAdsByOwner=async(owner)=>{
    try{
        const db = await getClientDB();
        const result = await db.collection("advertisements").find({owner: owner}).toArray()
        
        if (result)
            return result
        else
            return undefined;  
    }catch(err){
        console.log(err.stack)
    }
}
const loadAdsByFilter=async(filters)=>{
    const sortObj={}
    if(filters.sortBy==="lowest")
        sortObj.price=1
    else if(filters.sortBy==="highest")
        sortObj.price=-1
    else 
        sortObj.date=-1

    const findObj={}
    if(filters.bedrooms && filters.bedrooms!=="All")
        findObj.bedrooms=filters.bedrooms
    if(filters.bathrooms && filters.bathrooms!=="All")
        findObj.bathrooms=filters.bathrooms
    if(filters.pet)
        findObj.pet=filters.pet
    if(filters.parking)
        findObj.parking=filters.parking

    if(filters.minPrice)
        findObj.price={$gt: parseFloat(filters.minPrice) }
    if(filters.maxPrice)
        findObj.price={...findObj.price, $lt: parseFloat(filters.maxPrice) }

    if(filters.unitType){
        const trues= Object.keys(filters.unitType).filter(el=>filters.unitType[el]===true )
        findObj.unitType={$in:trues}
    }

    console.log(findObj)
    try{
        const db = await getClientDB();
        const result = await db.collection("advertisements")
        .find(findObj)
        .sort(sortObj)
        .toArray()
        
        return result;        
    }catch(err){
        console.log(err.stack)
    }
}

const deleteAdById=async(id, owner)=>{
    try{
        const db = await getClientDB();
        const {deletedCount} = await db.collection("advertisements").deleteOne({_id: new ObjectId(id), owner: owner})
        
        return deletedCount === 1 ;
    }catch(err){
        console.log(err.stack)
    }
}

module.exports = { getUser, addUser, addAd, loadAds, loadAdById, loadAdsByOwner, loadAdsByFilter, deleteAdById };
