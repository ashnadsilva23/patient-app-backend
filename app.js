const express= require('express')
const mongoose= require('mongoose')
const bcrypt=require('bcrypt')
const cors= require('cors')
const loginModel = require('./models/admin')
const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://ashna:ashna@cluster0.n9qo4.mongodb.net/patientDB?retryWrites=true&w=majority&appName=Cluster0")
app.get("/post",(req,res)=>{
    res.json({"status":"completed"})

})
app.post("/adminsignUp",(req,res)=>{
    let input =req.body
    let hashedPassword=bcrypt.hashSync(input.password,10)
    // console.log(hashedPassword)
    input.password=hashedPassword
    console.log(input)
    let result= new loginModel(input)
    result.save()

    res.json({"status":"success"}) 
})



app.post("/adminSignin",(req,res)=>{
    let input=req.body
    let result=loginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0){

                const validator=bcrypt.compareSync(input.password,response[0].password)
                if(validator)
                {
                    res.json({"status":"success"})
                }
                else
                {
                    res.json({"status":"success wrong"})
                }
            }
            else{
                res.json({"status":"username does not exist"})

            }
        }
    ).catch()
})
app.listen(3030,()=>{
    console.log("server started")
})

