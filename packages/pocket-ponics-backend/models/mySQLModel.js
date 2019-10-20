var mysql = require('mysql')
var sqlController = require('../controllers/mySQLController')

var con = mysql.createConnection({
    host: 'localhost',
    user: 'rohan',
    password: 'password',
    database: 'pocketponics'
})

exports.getHashForUser = (email, callback) => {
    sqlController.execute(`select user_id, password_hash from user where email = "${email}"`, function(err, result)
    {
        if(result.rows.length == 1)
        {        
            callback(result.rows[0])
        } 
        else if(result.rows.length == 0)
        {
            callback(undefined)
        }
    })
}

exports.createUser = (email, password_hash, callback) => {
    sqlController.execute(`insert into user (email, password_hash) VALUES ("${email}", '${password_hash}')`, function(err, result) {
        if(err)
        {
            console.log(result)
            callback(err, result)
        }
        callback(err, result)
    })
}

exports.revokeTokens = (user_id, callback) => {
    sqlController.execute(`DELETE FROM active_sessions WHERE (user_id = '${user_id}')`, function(err, result) {
        if(err)
        {
            console.log(result)
            callback(err, result)
        }
        callback(err, result)
    })
}

exports.updateUserHash = (user_id, password_hash, callback) => {
    sqlController.execute(`UPDATE user SET password_hash = '${password_hash}' WHERE (user_id = '${user_id}')`, function(err, result) {
        if(err)
        {
            console.log(result)
            callback(err, result)
        }
        callback(err, result)
    })
}

exports.insertTokenForUser = (token, user_id, expiration, callback) => {
    sqlController.execute(`insert into active_sessions (token, expiration_date, user_id) VALUES ('${token}', '${expiration}', ${user_id})`, function(err, result){
        if(err)
        {
            console.log(result)
            callback(err, result)
        }
        callback(err, result)
    })
}

exports.getExpirationDateString = () => {
    var date = new Date(new Date().getTime() + 30*60000)
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds()
}