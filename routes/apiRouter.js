const express = require('express')
const router  = express.Router()
const mysql = require('mysql2')

// mysql.createConnection(객체의형태로 접속 정보)
const db = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'1234',
    database:"o2"
})

router.get('/topic/add', function(req, res){
    let sql = 'SELECT * FROM topic';
    db.query(sql,function(err, result ){
        if(err){
            console.log(err)
        }
        else {
            console.log(result)
            res.render('add' , {topics:result , topic:undefined})
        }
    })
})

router.post('/topic/add' , function(req, res) {
    // console.log(req.body)
    let sql = "INSERT INTO `topic` (`title`, `description`, `author`) VALUES (?,?,?);"
    let title = req.body.title
    let description = req.body.description
    let author = req.body.author
    db.query(sql ,[title,description, author], function(err, result){
        if(err){
            console.log(err)
        }
        else {
            console.log(result)
            res.redirect('/topic')
        }
    }) 
})

router.get(['/topic', '/topic/:id'] , function(req, res){
    let sql = 'SELECT * FROM topic';
    db.query(sql, function(err, results){
        let ids = req.params.id
        let sql = "SELECT * FROM topic WHERE id = ?"
        if(ids) {
            db.query(sql, [ids] ,function(err, result){
                if(err) {
                    console.log(err)
                    res.status(500).send('Internal Server Error')
                } else {
                    console.log(result)
                    res.render('index', {topics:results, topic:result[0]})
                }
            })
        } else {
            res.render('index', {topics:results, topic:undefined})
        }
    })
})

router.post('/topic/add' , function(req, res) {
    // console.log(req.body)
    let sql = "INSERT INTO `topic` (`title`, `description`, `author`) VALUES (?,?,?);"
    let title = req.body.title
    let description = req.body.description
    let author = req.body.author
    db.query(sql ,[title,description, author], function(err, result){
        if(err){
            console.log(err)
        }
        else {
            console.log(result)
            res.redirect('/topic')
        }
    }) 
})


router.get('/topic/:id/delete', function(req, res){
    let sql = 'DELETE FROM `topic` WHERE id = (?);'
    let ids = req.params.id
    db.query(sql, [ids],function(err, result){
        if(err) {
            console.log(err)
        } else {
            res.redirect('/topic')
        }
    })
})
module.exports = router;