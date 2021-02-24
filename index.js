require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

//crear servidor de express
const app = express();

//configurar cors
app.use(cors());

//base de datos
dbConnection();

app.get('/',(req,res)=>{
    res.status(400).json({
        ok:true,
        msg:'hola'
    });
});
//contra mongo weZvc9zmRACWU9cd
//user mean_user

app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en puerto'+process.env.PORT);
})