const { response } = require('express')
const User = require('../models/User')
const clearCache = require('../service/redis-cache')


const getUser = async (req, res)=> {
    try{
        const user = await User.find().cache()
        res.json(user)
    }catch(err){
        res.json({message: err})
    }

}

// get user berdasarkan accountNumber
const getUserAn = async (req, res)=> {
    try{
        const useran = await User.findOne({accountNumber : req.params.useran});
        res.json(useran)
    }catch(err){
        res.json({message: err})
    }
}

// get user berdasarkan indentityNumber
const getUserItt = async (req, res)=> {
    try{
        const useritt = await User.findOne({identityNumber : req.params.useritt});
        res.json(useritt)
    }catch(err){
        res.json({message: err})
    }
}



const getUserId = async (req, res)=> {


    // const redis_key = "fetch_2";

    // const { reply } = await Redis.get(redis_key)

    // if(reply){
    //     // cache available
    //     res.status(200).send(reply);
    // }else{
        // get data from db
        dataFormDB = await User.findOne({_id: req.params.userId})
        res.json(dataFormDB)

        // set redis cache
    //     Redis.set(redis_key, JSON.stringify(dataFormDB));
    // }



    // try{
    //     const user = await User.findOne({_id: req.params.userId})
    //     res.json(user)
    // }catch(err){
    //     res.json({message: err})
    // }
}


const postUser = async (req, res)=> {
    const userCreate = new User({
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber
    })

    try {
        const user = await userCreate.save()
        clearKey(User.collection.collectionName);
        res.json(user)
    }catch(err){
        res.json({message: err})
    }
}

const updateUser = async (req, res)=> {
    try{
        const userUpdate = await User.updateOne({_id: req.params.userId}, {
            userName: req.body.userName,
            accountNumber: req.body.accountNumber,
            emailAddress: req.body.emailAddress,
            identityNumber: req.body.identityNumber
        })
        res.json(userUpdate)
    }catch(err){
        res.json({message: err})
    }
}

const deleteUser = async (req, res)=> {
    try{
        const userDelete = await User.deleteOne({_id: req.params.userId})
        res.json(userDelete)
    }catch(err){
        res.json({message: err})
    }
}


module.exports ={
    getUser,
    postUser,
    getUserId,
    updateUser,
    deleteUser,
    getUserAn,
    getUserItt
}