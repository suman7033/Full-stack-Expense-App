var mysql=require('mysql');

var con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sumo#7272',
    database: 'suman'
})

module.exports=con;