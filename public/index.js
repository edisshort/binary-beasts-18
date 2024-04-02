var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");



const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))



mongoose.connect('mongodb://localhost:27017/Database')
var db = mongoose.connection
db.on('error', (err) => {
  console.log('MongoDB error: ' + err);
})
db.once('open',()=> console.log("Connected to Database"))


app.post("/register",(req,res) => {

    var name= req.body.name
    var email=req.body.email
    var password=req.body.password
    

    

    var data={
        "name":name,
        "email":email,
        
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('project.html')
})



app.get("/", (req, res) =>{
    res.set({
        "Allow-Control-Allow-Origin":"*"
    })
}).listen(3000);

console.log("Listening  on port 3000...")

