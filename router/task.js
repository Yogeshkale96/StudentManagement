const express=require('express')
 const Task=require('../models/task')
 const auth=require('../middleware/auth')
 const task=require('../models/task')

 const router=new express.Router()

 //Add Task

 router.post('/task',auth, async(req,res)=>{
    const newTask=new Task({
        ...req.body,owner:req.stud._id
    })
    console.log(newTask)
    await newTask.save().then((data)=>{
        res.send('task Added'+data)
    }).catch((error)=>{
        res.send('Can not Add Task')
    })
 })

 //ViewAll

 router.get('/task/viewall/',auth, async(req,res)=>{
    const id=req.stud._id
    const allTask = await Task.find({owner:id})
    console.log(allTask)
    if(allTask)
    {
        res.send(allTask)
    }
    else
    {
        res.send('No Task Found')
    }
 })

 //View One Id

 router.get('/task/viewone/:id',auth,async(req,res)=>{
    const view=req.params.id
    const obj =await Task.findOne({_id:view})
    if(obj)
    {
        res.send(obj)
    }
    else
    {
        res.send('No task found')
    }
 })

 //Delete

 router.delete('/task/RemoveTask/:id',auth,async(req,res)=>{
    const id=req.params.id
    const RemoveOne=await Task.findOneAndDelete({_id:id})
    console.log('Task Delelted :'+RemoveOne)
    if(RemoveOne)
    {
        res.send(RemoveOne)
    }
    else
    {
        res.send('No Task Found')
    }
 })

 //Update
 router.put('/task/UpdateOne/:id', auth, async (req, res) => {
    try {
        const updateFields = Object.keys(req.body); 
        console.log(updateFields);

        
        if (updateFields.includes('description')) {
            return res.status(400).send({ error: 'Cannot update the description of a specific task.' });
        }

                    const task = await Task.findById(req.params.id); 
        if (!task) {
            return res.status(404).send({ error: 'Task not found. Please try again.' });
        }

        
        updateFields.forEach((field) => {
            task[field] = req.body[field];
        });

        
        await task.save();
        res.status(200).send({ message: 'Task updated successfully', task });
        console.log(task); 

    } catch (error) {
        console.error(error); 
        res.status(500).send({ error: 'An error occurred while updating the task.' });
    }
});
//logout
router.post('/student/logout',auth, async(req,res)=>{
    try
    {
        req.stud.tokens= req.stud.tokens.filter((token)=>{
            return token.token!==req.token
        })
        console.log(req.stud.tokens)
        await req.stud.save()
        res.send({})
    }   
    catch(error)
    {
        res.send({error:'Already LogOut'})
    }
})



 module.exports=router;

 