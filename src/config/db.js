const {Pool} = require("pg");
const dotenv = require("dotenv");
const fs = require("fs");
//Hacemos que el sistema reconozca las variables de entorno
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl:{
        rejectUnauthorized:true,
        ca:fs.readFileSync("src/certs/ca.crt").toString()
    }
});

//verificar conexion
pool.connect((error,client,release)=>{
    if(error){
        console.log("error de conexion", error.stack);
    }
    else{
        console.log("conexion exitosa");
        release()
    }
})

module.exports = pool;