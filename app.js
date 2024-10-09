const express=require('express')
const PORT=2000
const StudentRouter=require('./router/studentrouter')
const taskRouter=require('./router/task')
require('./db/connection')

const app=express()



app.use((req,  res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,Content-Type,Authorization');
    next()
})


app.use(express.json())
app.use(StudentRouter)
app.use(taskRouter)

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})