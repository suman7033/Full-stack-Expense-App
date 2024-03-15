const express=require('express');
const mysql=require('mysql');
const cors=require('cors');

const data=require('./data'); //data file export

const path=require('path');

const app=express();
app.use(express.json());  //for undefined

app.use(express.static(path.join(__dirname,'public')))
app.use(cors());
app.use(express.json());

const port=4000;

const db=mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"sumo#7272",
    database: "UserData"
})

app.get('/',(req,res)=>{
    res.send("Hello");
})
app.get('/post',(req,res)=>{
    res.json(data);
})
app.post('/post',(req,res)=>{
    console.log(req.body);
    const postData=req.body;
    data.push(postData);
    res.send("sucessfully send")
})

app.listen(port, ()=>{
    console.log(`listening on the ${port}`);
})