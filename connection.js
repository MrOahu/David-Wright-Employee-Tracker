const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "dadiwr7793*",
    port: 3306,
    database: "employee_db",
})


connection.connect(function(){
    console.log("applicationConnected")
})

module.exports = connection