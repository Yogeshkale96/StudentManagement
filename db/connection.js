const mongoose=require('mongoose')
const URL='mongodb://localhost:27017/STUDENTAPI'
const conn=mongoose.connect(URL)

if (conn) {
    console.log('DB Connnected')
    
} else {
    console.log('unable to connect DB !!!!!!')
    
}