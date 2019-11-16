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
            callback(err, result.rows[0])
        } 
        else if(result.rows.length > 1)
        {
            callback(true, undefined)
        }
        else
        {
            callback(err, undefined)
        }
    })
}

exports.getHashForSensorGrid = (serial_no, callback) => {
    sqlController.execute(`select user_id, greenhouse_id, password_hash from sensor_grid where serial_no = "${serial_no}"`, function(err, result)
    {
        if(result.rows.length == 1)
        {        
            callback(err, result.rows[0])
        } 
        else if(result.rows.length > 1)
        {
            callback(true, undefined)
        }
        else
        {
            callback(err, undefined)
        }
    })
}

exports.getGreenhousesForUser = (user_id, callback) => {
    sqlController.execute(`select greenhouse_id from greenhouse where user_id = "${user_id}"`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result.rows)
    })
}

exports.createGreenhouseForUser = (name, user_id, callback) => {
    sqlController.execute(`insert into greenhouse (name, user_id) values ("${name}", ${user_id});`, function(err, result) {
        if(!err)
        {
            sqlController.execute(`SELECT LAST_INSERT_ID()`, function(err, result){
                if(err)
                {
                    console.log(result)
                }
                callback(err, result.rows[0])
            })
        } 
        else {
            callback(err, result)
        }
    })
}

exports.deleteGreenhouseForUser = (greenhouse_id, user_id, callback) => {
    var tierQuery = `DELETE from tiers where greenhouse_id = ${greenhouse_id} and user_id = ${user_id};`
    var historicalQuery = `DELETE from historical_data where greenhouse_id = ${greenhouse_id} and user_id = ${user_id};`
    var sensorGridQuery = `DELETE from sensor_grid where greenhouse_id = ${greenhouse_id} and user_id = ${user_id};`
    var greenhouseQuery = `DELETE from greenhouse where user_id = ${user_id} and greenhouse_id = ${greenhouse_id};`

    sqlController.execute(`SELECT * from greenhouse where user_id = ${user_id} and greenhouse_id = ${greenhouse_id}`, function(err, result){
        if(err)
        {
            console.log(result)
            callback(err, result)
        }
        else if(result.rows.length == 1) 
        {
            sqlController.executeTransaction([tierQuery, historicalQuery, sensorGridQuery, greenhouseQuery], function(err, result) {
                if(err)
                {
                    console.log(result)
                } 
                callback(err, result)
            })
        } 
        else 
        {
            callback(true, result)
        }
    })
}

exports.createEmptyTiersAndGridForNewGreenhouse = (greenhouse_id, user_id, serial_no, grid_hash, callback) => {
    var tier1Query = `insert into tiers (tier, greenhouse_id, user_id) VALUES (1, ${greenhouse_id}, ${user_id});`
    var tier2Query = `insert into tiers (tier, greenhouse_id, user_id) VALUES (2, ${greenhouse_id}, ${user_id});`
    var tier3Query = `insert into tiers (tier, greenhouse_id, user_id) VALUES (3, ${greenhouse_id}, ${user_id});`
    var tier4Query = `insert into tiers (tier, greenhouse_id, user_id) VALUES (4, ${greenhouse_id}, ${user_id});`
    var gridQuery = `insert into sensor_grid (serial_no, password_hash, user_id, greenhouse_id) VALUES ('${serial_no}', '${grid_hash}', ${user_id}, ${greenhouse_id});`

    sqlController.executeTransaction([tier1Query, tier2Query, tier3Query, tier4Query, gridQuery], function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.getGreenhouseHistoricalData = (user_id, greenhouse_id, lower_limit, upper_limit, callback) => {
    sqlController.execute(`select * from historical_data where user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and date >= '${lower_limit}' and date < '${upper_limit}'`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result.rows)
    })
}

exports.getUserForToken = (token, callback) => {
    sqlController.execute(`select user_id from active_sessions where expiration_date > NOW() and token = "${token}";`, function(err, result) {
        if(result.rows.length == 1)
        {
            callback(err, result.rows[0])
        }
        else if(result.rows.length > 1)
        {
            callback(true, undefined)
        }
        else
        {
            callback(err, undefined)
        }
    })
}

exports.updateTierForGreenhouse = (user_id, greenhouse_id, tier, plant_id, growth_stage, cycle_time, num_plants, callback) => {
    sqlController.execute(`UPDATE tiers SET plant_id = ${plant_id}, growth_stage = ${growth_stage}, cycle_time = "${cycle_time}", num_plants = ${num_plants} WHERE user_id = ${user_id} and tier = ${tier} and greenhouse_id = ${greenhouse_id}`, function(err, result) {
        if(result.rows.affectedRows == 1)
        {
            callback(err, result)
        }
        else
        {
            callback(true, result)
        }
    })
}

exports.updateGreenhouseForUser = (user_id, greenhouse_id, name, seedling_time, callback) => {
    sqlController.execute(`UPDATE greenhouse SET name = "${name}", seedling_time = "${seedling_time}" WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id}`, function(err, result) {
        if(result.rows.affectedRows == 1)
        {
            callback(err, result)
        }
        else
        {
            callback(true, result)
        }
    })
}

exports.updateReadingsForGreenhouse = (user_id, greenhouse_id, water_level, nutrient_level, battery, power_source, seedling_time, light_level, tier1, tier2, tier3, tier4, callback) => {

    var greenhouseUpdate = `UPDATE greenhouse SET water_level = ${water_level}, nutrient_level = ${nutrient_level}, battery = ${battery}, power_source = ${power_source}, seedling_time = ${seedling_time}, light_level = ${light_level} WHERE (user_id = ${user_id} and greenhouse_id = ${greenhouse_id});`
    var tier1Update = `UPDATE tiers SET water_level = ${tier1.water_level}, ph_level = ${tier1.ph_level}, ec_level = ${tier1.ec_level} where (user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = 1);`
    var tier2Update = `UPDATE tiers SET water_level = ${tier2.water_level}, ph_level = ${tier2.ph_level}, ec_level = ${tier2.ec_level} where (user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = 2);`
    var tier3Update = `UPDATE tiers SET water_level = ${tier3.water_level}, ph_level = ${tier3.ph_level}, ec_level = ${tier3.ec_level} where (user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = 3);`
    var tier4Update = `UPDATE tiers SET water_level = ${tier4.water_level}, ph_level = ${tier4.ph_level}, ec_level = ${tier4.ec_level} where (user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = 4);`
    var greenhouseUpdateHistory = `INSERT into historical_data (date, water_level, nutrient_level, battery, power_source, greenhouse_id, user_id, light_level) VALUES (NOW(), ${water_level}, ${nutrient_level}, ${battery}, ${power_source}, ${greenhouse_id}, ${user_id}, ${light_level});`

    sqlController.executeTransaction([greenhouseUpdate, tier1Update, tier2Update, tier3Update, tier4Update, greenhouseUpdateHistory], function(err, result){
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.updateReadingsForGreenhouseTier = (user_id, greenhouse_id, tier, water_level, ph_level, ec_level, callback) => {
    sqlController.execute(`UPDATE tiers SET water_level = ${water_level}, ph_level = ${ph_level}, ec_level = ${ec_level} WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = ${tier}`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.updatePowerSourceForGreenhouse = (user_id, greenhouse_id, power_source, callback) => {
    sqlController.execute(`select * from greenhouse where greenhouse_id = ${greenhouse_id} and user_id = ${user_id}`, function(err, result) {

        if(result.rows.length == 1)
        {        
            var water_level = result.rows[0].water_level
            var nutrient_level = result.rows[0].nutrient_level
            var light_level = result.rows[0].light_level
            var battery = result.rows[0].battery

            var greenhouseQuery = `UPDATE greenhouse SET power_source = ${power_source} WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id};`
            var greenhouseHistoryQuery = `INSERT into historical_data (date, water_level, nutrient_level, light_level, battery, power_source, greenhouse_id, user_id) values (NOW(), ${water_level}, ${nutrient_level}, ${light_level}, ${battery}, ${power_source}, ${greenhouse_id}, ${user_id});`

            sqlController.executeTransaction([greenhouseQuery, greenhouseHistoryQuery], function(err, result) {
                if(err)
                {
                    console.log(result)
                }
                callback(err, result)
            })
        } 
        else if(result.rows.length > 1)
        {
            callback(true, undefined)
        }
        else
        {
            callback(err, undefined)
        }
    })
}

exports.updateBatteryForGreenhouse = (user_id, greenhouse_id, battery, callback) => {
    sqlController.execute(`select * from greenhouse where greenhouse_id = ${greenhouse_id} and user_id = ${user_id}`, function(err, result) {
        if(result.rows.length == 1)
        {        
            var water_level = result.rows[0].water_level
            var nutrient_level = result.rows[0].nutrient_level
            var light_level = result.rows[0].light_level
            var power_source = result.rows[0].power_source

            var greenhouseQuery = `UPDATE greenhouse SET battery = ${battery} WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id};`
            var greenhouseHistoryQuery = `INSERT into historical_data (date, water_level, nutrient_level, light_level, battery, power_source, greenhouse_id, user_id) values (NOW(), ${water_level}, ${nutrient_level}, ${light_level}, ${battery}, ${power_source}, ${greenhouse_id}, ${user_id});`

            sqlController.executeTransaction([greenhouseQuery, greenhouseHistoryQuery], function(err, result) {
                if(err)
                {
                    console.log(result)
                }
                callback(err, result)
            })
        } 
        else if(result.rows.length > 1)
        {
            callback(true, undefined)
        }
        else
        {
            callback(err, undefined)
        }
    })
}

exports.updateReadingsForSensorType = (user_id, greenhouse_id, tier, sensor_name, reading, callback) => {
    sqlController.execute(`UPDATE tiers SET ${sensor_name} = ${reading} WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = ${tier}`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.getReadingForSensors = (user_id, greenhouse_id, tier, callback) => {
    sqlController.execute(`select ph_level, ec_level, water_level from tiers WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = ${tier}`, function(err, result) {
        if(result.rows.length == 1)
        {
            callback(err, result.rows[0])
        }
        else
        {
            if(err)
            {
                console.log(err)
            }
            callback(true, undefined)
        }
    })
}

exports.getReadingsForGreenhouse = (user_id, greenhouse_id, callback) => {
    sqlController.execute(`select ph_level, ec_level, water_level, tier from tiers WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id}`, function(err, result) {
        if(result.rows.length == 4)
        {
            callback(err, result.rows)
        }
        else
        {
            if(err)
            {
                console.log(err)
            }
            callback(true, undefined)
        }
    })
}

exports.createAdjustmentForGreenhouse = (user_id, greenhouse_id, adjustment_type, amount, tier, callback) => {
    sqlController.execute(`select amount from adjustments WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = ${tier} and adjustment_type = ${adjustment_type}`, function(err, result) {
        if(err)
        {
            console.log(result)
            callback(err, result)
        }
        else if(result.rows.length == 1)
        {
            sqlController.execute(`UPDATE adjustments SET amount = "${amount}" WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id} and tier = ${tier} and adjustment_type = ${adjustment_type}`, function(err, result) {
                if(err)
                {
                    console.log(result)
                }
                callback(err, result)
            })
        } 
        else if (result.rows.length == 0)
        {
            sqlController.execute(`insert into adjustments values (${adjustment_type}, ${amount}, ${user_id}, ${tier}, ${greenhouse_id})`, function(err, result) {
                if(err)
                {
                    console.log(result)
                }
                callback(err, result)
            })
        } 
        else {
            callback(true, undefined)
        }
    })
}

exports.getAdjustmentsForGreenhouse = (user_id, greenhouse_id, callback) => {
    sqlController.execute(`select adjustment_type, amount, tier from adjustments WHERE user_id = ${user_id} and greenhouse_id = ${greenhouse_id} order by tier`, function(err, result) {
        if(err)
        {
            console.log(err)
        }
        callback(err, result.rows)
    })
}

exports.getTierForGreenhouse = (greenhouse_id, tier, user_id, callback) => {
    sqlController.execute(`SELECT tier, growth_stage, plant_id, ph_level, ec_level, water_level, cycle_time, num_plants FROM tiers where greenhouse_id = ${greenhouse_id} and user_id = ${user_id} and tier = ${tier}`, function(err, result) {
        if(result.rows.length == 1)
        {
            callback(err, result.rows[0])
        }
        else
        {
            if(err)
            {
                console.log(err)
            }
            callback(true, undefined)
        }
    })
}

exports.createUser = (email, password_hash, callback) => {
    sqlController.execute(`insert into user (email, password_hash) VALUES ("${email}", '${password_hash}')`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.revokeTokens = (user_id, callback) => {
    sqlController.execute(`DELETE FROM active_sessions WHERE (user_id = ${user_id})`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.getGreenhouseForUser = (user_id, greenhouse_id, callback) => {
    sqlController.execute(`select name, water_level, nutrient_level, battery, light_level, power_source, seedling_time from greenhouse where greenhouse_id = ${greenhouse_id} and user_id = ${user_id}`, function(err, result) {
        if(result.rows.length == 1)
        {
            callback(err, result.rows[0])
        }
        else
        {
            if(err)
            {
                console.log(err)
            }
            callback(true, undefined)
        }
    })
}

exports.updateUserHash = (user_id, password_hash, callback) => {
    sqlController.execute(`UPDATE user SET password_hash = '${password_hash}' WHERE (user_id = ${user_id})`, function(err, result) {
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.insertTokenForUser = (token, user_id, expiration, callback) => {
    sqlController.execute(`insert into active_sessions (token, expiration_date, user_id) VALUES ('${token}', '${expiration}', ${user_id})`, function(err, result){
        if(err)
        {
            console.log(result)
        }
        callback(err, result)
    })
}

exports.getExpirationDateString = () => {
    var date = new Date(new Date().getTime() + 30*60000)
    console.log(date.getMonth())
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds()
}