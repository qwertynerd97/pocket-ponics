const bcrypt = require('bcrypt');
const crypto = require('crypto');
import mySQL from '../models/mySQLModel';

//Post all sensor readings for all tiers of greenhouse
exports.postReadingsGreenhouse = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var serial_no = credentials[0];
    var password = credentials[1];

    //Store greenhouse readings provided
    var power_supply = req.body.power_supply
    var backup_battery_level = req.body.backup_battery_level
    var tier1 = {
        water_level: req.body.tier1_water,
        ph_level: req.body.tier1_ph,
        ec_level: req.body.tier1_ec
    }
    var tier2 = {
        water_level: req.body.tier2_water,
        ph_level: req.body.tier2_ph,
        ec_level: req.body.tier2_ec
    }
    var tier3 = {
        water_level: req.body.tier3_water,
        ph_level: req.body.tier3_ph,
        ec_level: req.body.tier3_ec
    }
    var tier4 = {
        water_level: req.body.tier4_water,
        ph_level: req.body.tier4_ph,
        ec_level: req.body.tier4_ec
    }
    
    var water_level = req.body.water_level
    var nutrient_level = req.body.nutrient_level
    var seedling_time = req.body.seedling_time
    var light_level = req.body.light_level

    //Retrieve password hash from database for given serial number
    mySQL.getHashForSensorGrid(serial_no, function(err, record) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(record == undefined)
        {
            res.json({402: "Sensor Grid Not Found"})
        } 
        else 
        {
            //Calculate password hash and compare to retrieved hash
            bcrypt.compare(password, record.password_hash, (err, result) => {
                if(result)
                {
                    //Update greenhouse record and tiers record
                    mySQL.updateReadingsForGreenhouse(record.user_id, record.greenhouse_id, water_level, nutrient_level, backup_battery_level, power_supply, seedling_time, light_level, tier1, tier2, tier3, tier4, function(err, record) {
                        if(!err)
                        {
                            res.json({200: "Sensor Readings Recorded"})
                        }
                        else {
                            res.json({201: "Error recording greenhouse readings"})
                        }
                    })
                }
                else {
                    res.json({401: "Unauthorized"})
                }        
            })
        }
    })
};

//Post the all the sensor readings for a specific tier
exports.postReadingsTier = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var serial_no = credentials[0];
    var password = credentials[1];

    //Store tier provided
    var tier = req.params.tier

    //Store tier information provided
    var water_level = req.body.water_level
    var ph_level = req.body.ph_level
    var ec_level = req.body.ec_level

    //Retrieve password hash from database for given serial number
    mySQL.getHashForSensorGrid(serial_no, function(err, record) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(record == undefined)
        {
            res.json({402: "Sensor Grid Not Found"})
        } 
        else 
        {
            //Calculate password hash and compare to retrieved hash
            bcrypt.compare(password, record.password_hash, (err, result) => {
                if(result)
                {
                    //Update greenhouse record and tiers record
                    mySQL.updateReadingsForGreenhouseTier(record.user_id, record.greenhouse_id, tier, water_level, ph_level, ec_level, function(err, record) {
                        if(!err)
                        {
                            res.json({200: "Sensor Readings Recorded"})
                        }
                        else {
                            res.json({201: "Error recording greenhouse tier readings"})
                        }
                    })
                }
                else {
                    res.json({401: "Unauthorized"})
                }        
            })
        }
    })
};

//Post a reading for a single sensor
exports.postReadingsSingle = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var serial_no = credentials[0];
    var password = credentials[1];

    //Store tier and sensor_type provided
    var tier = req.params.tier
    var sensor_type = req.params.sensor_type

    var sensor_name = ""
    if(sensor_type == 0)
    {
        sensor_name = "water_level"
    } 
    else if(sensor_type == 1)
    {
        sensor_name = "ph_level"
    }
    else if(sensor_type == 2)
    {
        sensor_name = "ec_level"
    }

    //Store sensor reading provided
    var reading = req.body.reading

    //Retrieve password hash from database for given serial number
    mySQL.getHashForSensorGrid(serial_no, function(err, record) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(record == undefined)
        {
            res.json({402: "Sensor Grid Not Found"})
        } 
        else 
        {
            //Calculate password hash and compare to retrieved hash
            bcrypt.compare(password, record.password_hash, (err, result) => {
                if(result)
                {
                    //Update greenhouse record and tiers record
                    mySQL.updateReadingsForSensorType(record.user_id, record.greenhouse_id, tier, sensor_name, reading, function(err, record) {
                        if(!err)
                        {
                            res.json({200: "Sensor Reading Recorded"})
                        }
                        else {
                            res.json({201: "Error recording sensor reading"})
                        }
                    })
                }
                else {
                    res.json({401: "Unauthorized"})
                }        
            })
        }
    })
};

//Update the greenhouse's current power source
exports.updatePowerSource = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var serial_no = credentials[0];
    var password = credentials[1];
    
    //Store power source provided
    var power_source = req.body.source

    //Retrieve password hash from database for given serial number
    mySQL.getHashForSensorGrid(serial_no, function(err, record) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(record == undefined)
        {
            res.json({402: "Sensor Grid Not Found"})
        } 
        else 
        {
            //Calculate password hash and compare to retrieved hash
            bcrypt.compare(password, record.password_hash, (err, result) => {
                if(result)
                {
                    //Update greenhouse record
                    mySQL.updatePowerSourceForGreenhouse(record.user_id, record.greenhouse_id, power_source, function(err, record) {
                        if(!err)
                        {
                            res.json({200: "Power Source Reading Recorded"})
                        }
                        else {
                            res.json({201: "Error recording power source"})
                        }
                    })
                }
                else {
                    res.json({401: "Unauthorized"})
                }        
            })
        }
    })
};

//Update the current backup battery level
exports.updateBackupBatteryLevel = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var serial_no = credentials[0];
    var password = credentials[1];
    
    //Store backup battery level provided
    var battery = req.body.battery_level

    //Retrieve password hash from database for given serial number
    mySQL.getHashForSensorGrid(serial_no, function(err, record) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(record == undefined)
        {
            res.json({402: "Sensor Grid Not Found"})
        } 
        else 
        {
            //Calculate password hash and compare to retrieved hash
            bcrypt.compare(password, record.password_hash, (err, result) => {
                if(result)
                {
                    //Update greenhouse record
                    mySQL.updateBatteryForGreenhouse(record.user_id, record.greenhouse_id, battery, function(err, record) {
                        if(!err)
                        {
                            res.json({200: "Battery Level Reading Recorded"})
                        }
                        else {
                            res.json({201: "Error recording battery level"})
                        }
                    })
                }
                else {
                    res.json({401: "Unauthorized"})
                }        
            })
        }
    })
};

//Get any pending adjustment commands from backend
exports.getAdjustments = (req, res) => {
    //convert base64 credentials to ascii
    let basicAuth = req.headers.authorization.split(" ")[1]
    let buff = new Buffer(basicAuth, 'base64');
    let credentials = buff.toString('ascii').split(":");

    //Store username and password provided
    var serial_no = credentials[0];
    var password = credentials[1];
    
    //Retrieve password hash from database for given serial number
    mySQL.getHashForSensorGrid(serial_no, function(err, record) {
        if(err)
        {
            res.json({403: "Authentication Error"})
        }
        else if(record == undefined)
        {
            res.json({402: "Sensor Grid Not Found"})
        } 
        else 
        {
            //Calculate password hash and compare to retrieved hash
            bcrypt.compare(password, record.password_hash, (err, result) => {
                if(result)
                {
                    //Update greenhouse record
                    mySQL.getAdjustmentsForGreenhouse(record.user_id, record.greenhouse_id, function(err, record) {
                        if(!err)
                        {
                            res.json({adjustments: record})
                        }
                        else {
                            res.json({201: "Error retrieving adjustments"})
                        }
                    })
                }
                else {
                    res.json({401: "Unauthorized"})
                }        
            })
        }
    })
};