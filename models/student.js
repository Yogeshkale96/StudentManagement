const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const multer=require('multer')
const jwt=require('jsonwebtoken')

const studSchema=mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('Only Alphabets Allowed')
            }
        }
    },
    
    lastName:{
        type:String,
        require:true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('Only Alphabets Allowed')
            }
        }
    },
    address:{
        require:true,
        type:String
    },
    email:{
        require:true,
        type:String,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter valid email id')
            }
        }
    },
    password:{
        type:String,
        require:true,
    },
    age:{
        type:String,
        default:'0',
        minage:0,
        validate(value){
            if(value<0 || !validator.isInt(value))
            {
                throw new Error('Age should be a positive Intger ')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }],
    // timestamps:true
})

studSchema.virtual('tasks',{
    ref:'student',
    localField:'_id',
    foreignField:'owner'
})

// studSchema.pre('save',async function(next){
//     const t=this
//      console.log('in pre--'+this.passsword)
//     if(t.isModified('password'))
//         {
//        t.passsword=await bcrypt.hash(t.password,8) 
//     }
//     next()
// })

studSchema.pre('save',async function(next){
const tStudent = this
console.log('Current Student:'+tStudent.password)
if(tStudent.isModified('password'))
    {
        tStudent.password=await bcrypt.hash(tStudent.password,8)
        console.log('Temp'+tStudent.password)
}
next()
})
studSchema.statics.loginCheck = async function (email,pass)
{   

    // for login verifcation 
     console.log('Login is verified...')
     const studObj=await Student.findOne({email})
     console.log('Current login student'+studObj)
     if(!studObj)
     {
        return null;
     }
     const match =await bcrypt.compare(pass,studObj.password)
     if(!studObj)

            return null
        
            return studObj
        
}

studSchema.methods.getToken= async function() {
    const tStud = this
    
     const token = await jwt.sign({_id:tStud._id.toString()},'thisisnewtoken')
     console.log('New Token'+token)
     tStud.tokens= await tStud.tokens.concat({token})

     await tStud.save()
     console.log('After token',+tStud)
     return token
}

const Student=mongoose.model('Student',studSchema)
module.exports=Student