let express = require('express')
let router = express.Router()

let bodyParser = require('body-parser')
router.use(bodyParser.json({type: 'application/json'}))
router.use(bodyParser.urlencoded({extended: true}))

let tools = require('./tools')

let mysql = require('mysql')
let con = mysql.createPool({
    host: 'mysql-ait.stud.idi.ntnu.no',
    user: 'karoljd',
    password: 'RzrcCKT6',
    database: 'karoljd',
    debug: false,
    multipleStatements: true,
})

// all
//done

router.post('/token', function (req, res) {
    const secretGotten = req.body.secretGotten
    res.send(tools.getToken(secretGotten))
})

//inprogress

// Start driver

//done
router.post('/getorders', function (req, res) {
    // getOrders
    // gets orderId,dateTimeOfOrder,latitude,longitude, priority to show driver
    const token = req.body.token
    if (tools.verify(token) === true) {
        con.query(
            //'SELECT `orderId`,`dateTimeOfOrder`,`latitude`,`longitude`,`priority` FROM `orders` WHERE `isTaken` = 0',
            'SELECT `orderId`,`latitude`,`longitude`,`priority` FROM `orders` WHERE `isTaken` = 0',
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(rows)
                    res.send(rows)
                }
            }
        )
    } else {
        res.send('Not valid token')
    }
}) // A driver asks for all the orders
router.post('/takeorder', function (req, res) {
    const orderId = req.body.orderId
    const deviceId = req.body.deviceId
    const token = req.body.token
    if (tools.verify(token) === true) {
        let isSucsess = false
        con.query(
            //'START TRANSACTION; SELECT `isTaken` FROM `orders` WHERE `orderId` = ?; UPDATE `orders` SET `isTaken` = 1 WHERE `isTaken` = 0 AND orderId=?; COMMIT;',
            'START TRANSACTION; UPDATE `orders` SET `isTaken` = 1 WHERE `isTaken` = 0 AND orderId=?; COMMIT;',
            [orderId],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                    con.destroy()
                } else {
                    if (rows.affectedRows > 0) {
                        console.log('Order isTaken changed on:' + orderId)
                        isSucsess = true
                    } else {
                        console.log('Order isTaken change failed on:' + orderId)
                        res.send(false)
                    }
                }
            }
        )
        con.query(
            'INSERT INTO `ordersTaken` ( `orderId`, `driverId`) SELECT ?, `driverId` FROM `userDriver` WHERE `deviceId` = ?; SELECT `phoneNumber` FROM `orderPhoneNumber` WHERE `orderId` = ?',
            [orderId, deviceId, orderId],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    if (rows.insertId > 0) {
                        console.log('ordersTaken insterted orderId:' + orderId)
                        res.send(rows)
                    } else {
                        console.log(
                            'ordersTaken failed insterting orderId:' + orderId
                        )
                        res.send(false)
                    }
                }
            }
        )
    } else {
        res.send(false)
    }
}) // A driver takes an order
router.put('/endTrip', function (req, res) {
    // changes archived to true
    const token = req.body.token
    const orderId = req.body.orderId
    if (tools.verify(token) === true) {
        con.query(
            'UPDATE `orders` SET `orders.arvhived` = `1` WHERE `orderId` = ?',
            [orderId],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    if (rows.affectedRows > 0) {
                        console.log(rows)
                        res.send(true)
                    } else {
                        res.send(false)
                    }
                }
            }
        )
    } else {
        res.send('Not valid token')
    }
}) // The driver ends the trip

// End driver

//start customer

//done
router.post('/makeorder', function (req, res) {
    const deviceId = req.body.deviceId
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const token = req.body.token
    if (tools.verify(token) === true) {
        con.query(
            'INSERT INTO `orders` ( `customerId`, `latitude`, `longitude`) SELECT `customerId`,?,? FROM `userCustomer` WHERE `deviceId` = ?;',
            [latitude, longitude, deviceId],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    if (rows.insertId > 0) {
                        console.log('Order created:' + rows.insertId)
                        res.send(rows.insertId.toString())
                    } else {
                        res.send(false)
                    }
                }
            }
        )
    } else {
        res.send(false)
    }
}) // A customer makes an order
router.put('/makeprio', function (req, res) {
    // set priority to true, start
    const token = req.body.token
    const orderId = req.body.orderId
    if (tools.verify(token) === true) {
        con.query(
            'UPDATE `orders` SET `orders.priority` = `1` WHERE `orderId` = ?',
            [orderId],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    if (rows.affectedRows > 0) {
                        console.log(rows)
                        res.send(true)
                    } else {
                        res.send(false)
                    }
                }
            }
        )
    } else {
        res.send('Not valid token')
    }
}) // Customer makes the order into a priority
router.post('/getOrderTaxiNum', function (req, res) {
    //when a driver has taken te order
    const token = req.body.token
    const orderId = req.body.orderId
    if (tools.verify(token) === true) {
        con.query(
            'SELECT `taxiNumber`, `companyName` FROM `orderTaxiNum` WHERE `orderId` = ?',
            [orderId],
            function (error, rows) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(rows)
                    if (!rows.length) {
                        console.log('should send false')
                        res.send(false)
                    } else {
                        res.send(rows).toString()
                    }
                }
            }
        )
    } else {
        res.send('Not valid token')
    }
}) // Customer get the taxi number for the driver on the order
router.post('/cancelOrder', function (req, res) {
    // cancels order
    const token = req.body.token
    const reason = 'Customer canceled order before driver took order'
    const orderId = req.body.orderId
    let isSucsessfull = false
    if (tools.verify(token) === true) {
        con.query(
            'UPDATE `orders` SET `archived` = 1 WHERE `orderId` =?',
            [orderId],
            function (error, rows) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(rows)
                    if (rows.affectedRows > 0) {
                        isSucsessfull = true
                    }
                }
            }
        )
        con.query(
            'INSERT INTO `cancelations` (`orderId`, `reasonForCancelation`) VALUES (?, ?)',
            [orderId, reason],
            function (error, rows) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(rows)
                    if (rows.insertId > 0 && isSucsessfull) {
                        res.send(isSucsessfull.toString())
                    } else {
                        res.send(isSucsessfull.toString())
                    }
                }
            }
        )
    } else {
        res.send('Not valid token')
    }
}) // Customer wanted to cancel before a driver called

//end customer

//start admin

//done

module.exports = router
