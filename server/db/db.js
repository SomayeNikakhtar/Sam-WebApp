const { MongoClient } = require("mongodb");
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
    const result = await db.collection("advertisemens").insertOne(ad);
    return result.acknowledged;
    
}


module.exports = { getUser, addUser, addAd };
