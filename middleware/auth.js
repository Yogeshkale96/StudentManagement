const jwt=require('jsonwebtoken')
const Stud=require('../models/student')
const auth=async function(req,res,next)
{
    const token=req.header('Authorization').replace('Bearer ','')

    console.log('Current Token From auth:--'+token)

    const coded=jwt.verify(token,'thisisnewtoken')
    console.log('Token Verification'+coded)

    const tempStud=await Stud.findOne({_id:coded._id,'tokens.token':token})
    console.log('Current Login User Verified Using Authentication :--'+tempStud)
    req.stud=tempStud
    req.token=token
    next()
}
module.exports=auth;
