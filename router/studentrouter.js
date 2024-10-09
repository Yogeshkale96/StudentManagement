const express=require('express')
const Stud=require('../models/student')
const multer=require('multer')
const auth = require('../middleware/auth')
const router=express.Router()

//Welcome
router.get('/',(req,res)=>{
    res.send('welcome to the BASE API')
    console.log('welcome to the base api')
})

 //Create New Customer/Reigster User
router.post('/student/addnewStudent',async(req,res)=>{
    console.log('In New Customer Route')
    const temp=new Stud(req.body)
    console.log('tempraory data'+temp)
    const newStudent = await temp.save()
    console.log('new Student added'+newStudent)
    if(newStudent)
    {
        res.send(newStudent)
    }
    else
    {
        res.send('Some Error Can not Create New user')
    }
})

//Student Login
router.post('/student/login',async(req,res)=>{
    console.log('login Successfully')
    const currStud= await Stud.loginCheck(req.body.email,req.body.password)
    console.log(currStud)
    //for token create
    const token = await currStud.getToken()
    console.log('token created'+token)
    res.send({currStud,token})

})

//Authentication
router.get('/student/self',auth,async(req,res)=>{
    res.send("Verified")
})

//View All Student                                                          
router.get('/student/viewAll',auth,async(req,res)=>{
    const AllStudent=await Stud.find({})
    if(AllStudent)
    {
        res.send(AllStudent)
    }
    else{
        res.send('No Stuents found')
    }
})

//Logout Id

router.post('/student/logoutstud',auth,async(req,res)=>{
    try
    {
        req.stud.tokens=req.stud.tokens.filter((token)=>{
        })
        console.log(req.stud.tokens)
        await(req.stud.save())
        res.send('Student logout successfully',+req.stud.tokens)
    }
    catch(error){
        res.send({error:'Already Logout'})
    }
})

//Delete Id
router.delete('/student/removestud/',auth,async(req,res)=>{
    const _id=req.stud._id
   try {
    const RemoveStud=await Stud.findOneAndDelete({_id})
    console.log('Delete successfully'+RemoveStud)
    if(RemoveStud)
    {
        res.send(RemoveStud)
        console.log('Record Deleted'+_id)
    }
    else{
        res.send('No Students Found')
        console.log('No student found')
    }
    }
    catch(error){
        console.log('error occured')
    }
})

//update Id

router.put('/student/update/',auth,async(req,res)=>{
    try{
        const update=Object.keys(req.body)
        console.log('==='+update)
        for(let filed of update)
        {
            console.log('---'+filed)
            if(filed === 'Email' || filed === 'Password')
                return res.status(400).send("You can not Update Email id or Password")
        }
        update.forEach((update)=>req.stud[update])
        await req.stud.save()
        res.send(req.stud)
        }
        catch(error){
            res.status(500).send({error:'Something went write while you trying to update Email Id or Password'})
    }
})
     
module.exports=router;