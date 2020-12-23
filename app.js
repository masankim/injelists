const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const mysql = require('mysql2')
const apiRouter = require('./routes/apiRouter')
require('ejs')
//app.set() ==> views폴더를 기본 폴더로 지정

const db = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'1234',
    database:"o2"
})


app.set('views' , path.join(__dirname ,'/views'))
app.set('view engine','ejs')


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/', apiRouter)

app.get('/data', function(request , response ,next) {
    console.log(request)
    response.render("index" , {name:"김태경"})
})


app.get('/topics', function(req, res){
    let sql = 'SELECT * FROM topic';
    db.query(sql, function(err , result){
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.send('Success')
        }
    })
})

app.post('/topics', function(req, res ){
    let sql = "INSERT INTO topic (title, description, author) VALUES (?,?,?);"
    // console.log(req.body)
    // res.send("Success")
    let title = req.body.title
    let description = req.body.description
    let author = req.body.author
    db.query(sql ,[title,description, author], function(err, result){
        if(err){
            console.log(err)
        }
        else {
            console.log(result)
            res.send("Success")
        }
    }) 
})


app.listen(8080, function(){
    console.log("Server is Runing at http://localhost:8080")
})