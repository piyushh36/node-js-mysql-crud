const express = require('express');
const mysql  = require('mysql'); 

const pool = mysql.createPool({
        connectionLimit:100,
        user:'minato',
        password:'minato1@',
        host:'localhost',
        port:3306,
        database:'bal_sheet'
});

let balSheetDB = {};

balSheetDB.getAll = () => {
    return new Promise((resolve,reject) => {
            pool.query(`SELECT * from users`, (err,results)=>{
                if(err){
                    return reject(err);
                }
                return resolve(results);
            })
    });
};

balSheetDB.getOne = (id) => {
    return new Promise( (resolve,reject) => {
        pool.query(`SELECT * from users where user_id = ?`, [id] ,(err,results)=>{
            if(err){
                return reject(err);
            }
                return resolve(results);
        })
    });
};

balSheetDB.insertData = (data) => {
    return new Promise((resolve,reject)=>{
        pool.query(`INSERT into users SET ?` , [data], (err,results) => {
                if(err){
                    return reject(err);
                } else {
                    return resolve("success");
                }
        })
    })
};

balSheetDB.deleteData = (id) => {
    return new Promise((resolve,reject)=>{
        pool.query(`DELETE from users where user_id = ?`,[id], (err,result)=>{
            if(err){
                return reject(err);
            }else {
                // if(results.affectedRows == 0){
                //     return resolve("No record found");
                // } 
                // 
                return resolve(`number of records modified ${results.affectedRows}`);
            }
        })
    })
};

balSheetDB.updateData = (id,value) => {
    return new Promise((resolve,reject)=>{
        pool.query(`Update users SET  ? where user_id = ?`,[value,id],(err,results)=>{
            if(err){
                return reject(err);
            }else {
                // return resolve(balSheetDB.getAll());
                return resolve(`number of records modified ${results.affectedRows}`);
            }
        })
    })
};



module.exports = balSheetDB