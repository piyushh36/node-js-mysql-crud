const express = require('express');
const db = require('../db/db');
const router = express.Router();

// test get request to check if data is there or not .
router.get('/piyush', (req, res) => {
    res.send('Hello Piyush!')
});

router.get('/users', async(req,res,next)=>{
    try {
        let results = await db.getAll();
        // console.log(results);
        // res.send(results);
        res.json(results);
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
});

router.get('/user/:id', async(req,res,next)=>{
    
        try{
            let result = await db.getOne(req.params.id);
            res.json(result);
        } catch (e){
            res.sendStatus(500);
        }
})

router.post('/user', async(req,res,next)=> {

    try{
        // var first_name = req.body.first_name;
        // var last_name = req.body.last_name;
        // var user_name = req.body.user_name;
        // var user_email = req.body.user_email;
        // var user_password = req.body.user_password;
        // var phone_number = req.body.phone_number;
        // var data = req.body;

        // let result = await db.insertData(first_name,last_name,user_name,user_email,user_password,phone_number);
        let result = await db.insertData(req.body);
        res.json(result);
    } catch(e){
        res.sendStatus(500);
    }
})

router.delete('/user/:id', async(req,res,next)=>{
            try{
                    let result = await db.deleteData(req.params.id);
                    res.json(result);
            } catch(e){
                res.sendStatus(500);
            }
})

router.put('/user/:id', async(req,res,next)=>{
            try{

                let result = await db.updateData(req.params.id , req.body);
                res.json(result);
            } catch (e){
                res.sendStatus(500);
            }
})


module.exports = router 