//var con=require('./connection')
const express=require('express');
//const mysql=require('mysql');
const cors=require('cors');

//const data=require('./data'); //data file export
const data=[];

const path=require('path');
const { title, stdout } = require('process');

const app=express();
app.use(express.json());  //for undefined

app.use(express.static(path.join(__dirname,'public')))
app.use(cors());
app.use(express.json());

const port=4000;

app.get('/',(req,res)=>{
    res.send("Hello working");
})
app.get('/get',(req,res)=>{
    res.json(data);
})
app.post('/post',(req,res)=>{
    console.log(req.body);
    const expense={
        id: data.length+1,
        title: req.body.title,
        price: req.body.price,
        details: req.body.details
    }
    data.push(expense);
    res.json(expense);
})

app.put('/post/:id',(req,res)=>{
    const id=req.params.id;
    const index = data.findIndex((expense) => expense.id === parseInt(id));

    if(index !==-1){
    const updateExpense={
        id: data.length,
        title: req.body.title,
        price: req.body.price,
        details: req.body.details
    }
    data[index]=updateExpense;
    res.json(updateExpense);
  }else{
    res.status(404).json({error: "Expense not found"});
  }
})

app.delete('/delete/:id',(req,res)=>{
    let id=req.params.id;
    let index=data.findIndex((student)=>{
        return (student.id == Number.parseInt(id))
    })

    if(index>=0){
        let std=data[index];
        data.splice(index,1)
        res.json(std);
    }else{
        res.status(404);
    }
})
// app.post('/post',(req,res)=>{
//     console.log(req.body.title);
//     var title=req.body.title;
//     var price=req.body.price;
//     var details=req.body.details;

//     con.connect((error)=>{
//        if(error){
//          throw error;
//        }  
//        var sql="insert into users(title,price,details) values(?, ?, ?)";
//        con.query(sql,[title,price,details],(error,result)=>{
//           if(error){
//             throw error;
//           }
//           res.send('sucessfully send'+result.insertId);         
//        })

//     })
// })

app.listen(port, ()=>{
    console.log(`listening on the ${port}`);
})