const mongoose=require('mongoose')
const Student = require('./student')
const taskSchema=mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:String,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'student'
    }
    },
    {
        timestamps:true
    
})

const task=mongoose.model('task',taskSchema)
module.exports=task
