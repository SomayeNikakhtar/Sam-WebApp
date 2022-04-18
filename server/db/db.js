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

    return {ack:result.acknowledged, id: result.insertedId};
    
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
    if(filters.pet && filters.pet!=="all")
        findObj.pet=filters.pet
    if(filters.parking && filters.parking!=="all")
        findObj.parking=filters.parking

    if(filters.minPrice)
        findObj.price={$gt: parseFloat(filters.minPrice) }
    if(filters.maxPrice)
        findObj.price={...findObj.price, $lt: parseFloat(filters.maxPrice) }

    if(filters.unitType){
        const trues= Object.keys(filters.unitType).filter(el=>filters.unitType[el]===true )
        if (trues.length>0)
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

const insertMsg=async(sender, receiver, content, adId)=>{
    const db = await getClientDB();
    const adInfo = await loadAdById(adId)
    if (!adInfo) return false;

    const convUser1 = adInfo.owner===receiver ? sender : receiver // starter of conversation
    const convUser2 = adInfo.owner // owner of Ad who is contacted
    const convInfo={
        user1:convUser1 , 
        user2:convUser2, 
        adId:adId, 
        title:adInfo.title,
        image:adInfo.images[0],
        msgPrev:content,
        date: new Date()
    }
    let convId;
    const conv=await db.collection("conversations").findOne({user1:convUser1 , user2:convUser2, adId:adId })
    if(!conv){
        const result=await db.collection("conversations").insertOne(convInfo)
        convId= result.insertedId //A field insertedId with the _id value of the inserted document.

    }else{
        db.collection("conversations").replaceOne({_id:conv._id}, convInfo);
        convId=conv._id;
    }
    

    const msgInfo={
        sender:sender,
        receiver:receiver,
        content: content,
        adId: new ObjectId(adId),
        date: new Date(),
        conversationId: convId,
    }
    console.log(sender)
    const result = await db.collection("messages").insertOne(msgInfo);
    return {result: result.acknowledged, msgInfo:msgInfo};

}
const getConversations=async(userId)=>{
    const db = await getClientDB();
    const result = await db.collection("conversations").find({$or:[{user1:userId}, {user2:userId}]}).toArray();
    return result;
}

const getConversationMsgs=async(userId, conversationId)=>{
    const db = await getClientDB();
    const conv=await db.collection("conversations").findOne({_id:new ObjectId(conversationId)})
    if (conv &&(conv.user1===userId || conv.user2===userId)){
        const result = await db.collection("messages").find({conversationId:new ObjectId(conversationId)}).toArray();
        return result;
    }else{
        return [];
    }

}

module.exports = { getUser, addUser, addAd, loadAds, loadAdById, 
    loadAdsByOwner, loadAdsByFilter, deleteAdById, insertMsg,
    getConversations, getConversationMsgs,   
};
