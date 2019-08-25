const express = require('express');
const app = express();
app.use(express.static('public')) 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const callRoutes = require('./routes/route');



app.use(callRoutes);
const port = process.env.port || 3400 ;
app.listen(port , ()=>{
    console.log(`This app is running on ${port}`);
})
