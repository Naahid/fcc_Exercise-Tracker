const router = require('express').Router()
const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const User = require('../models/User')




router.post('/users', async(req,res)=> {
    const {username} = req.body;
    if(!username){
        return res.json({err: 'username is required'})
    }

    const existingUser = await User.findOne({username})
    if(existingUser){
        return res.status(400).json({
            error: 'username already exists '
        })
    }


    const user =  new User({
        username
    })
    await user.save()
    res.json(user)
    
})

router.get('/users', async(req,res)=> {
    const users = await User.find()
    res.send(users)
  
})
// You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.






// /api/users/:_id/logs

router.get('/users/:_id/logs', async(req,res)=>{
    let {from, to, limit} = req.query;
    const id = req.params._id;
    const existingUser = await User.findById(id)
    if(!existingUser){
        res.json('user does not exist')
    }

    let dateObj = {}
    let filter = {id}

    if(from){
        dateObj['$gte'] = new Date(from)
    }
    if(to){
        dateObj["$lte"] = new Date(to)
    }
    if(from || to){
        filter.date = dateObj
    }

    if(!limit){
        limit = 100
    }

    
   
    // let exercises = await Exercise.find({id})
    let exercises = await Exercise.find(filter).limit(limit)

    exercises = exercises.map((exercise)=>{
        return{
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date.toDateString()
        }
    })


    

    res.json({
        username: existingUser.username,
        count: exercises.length,
        _id: id,
        log:exercises
    })
})




// /api/users/:_id/exercises

router.post('/users/:_id/exercises', async(req,res)=> {
    const id = req.params._id;
    let {description, duration, date} = req.body;


    const existingUser = await User.findById(id)
    if(!existingUser){
        res.json('user does not exist')
    }
   
    if(!date){
        date = new Date()
    }else{
        date = new Date(date)
    }

    const exercise = new Exercise({
        username: existingUser.username,
        description,
        duration,
        date,
        id,
    })
    exercise.save()
   

     return res.json({
        username: existingUser.username,
        _id:existingUser._id,
        description:exercise.description,
        duration:exercise.duration,
        date: date.toDateString()
    })
})



module.exports = router