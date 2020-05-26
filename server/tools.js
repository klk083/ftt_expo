let jwt = require('jsonwebtoken')
let secret = '4ecf096c08b97a3b3ba79deae1d3bd865623da9e09b549f50da3eb7f93ac5c15'

module.exports = {
    // collected from:
    // https://www.geodatasource.com/developers/javascript
    // Finds the distance between 2 locations
    distance: function distance(lat1, lon1, lat2, lon2) {
        if (lat1 == lat2 && lon1 == lon2) {
            return 0
        } else {
            let radlat1 = (Math.PI * lat1) / 180
            let radlat2 = (Math.PI * lat2) / 180
            let theta = lon1 - lon2
            let radtheta = (Math.PI * theta) / 180
            let dist =
                Math.sin(radlat1) * Math.sin(radlat2) +
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
            if (dist > 1) {
                dist = 1
            }
            dist = Math.acos(dist)
            dist = (dist * 180) / Math.PI
            dist = dist * 60 * 1.1515
            dist = dist * 1.609344
            return dist
        }
    },
    getToken: function (secretGotten) {
        let token = jwt.sign({username: secretGotten}, secretGotten, {
            expiresIn: 120,
        })
        console.log('Token given')
        return token
    },
    verify: function (token) {
        return jwt.verify(token, secret, function (err, decoded) {
            if (!err) {
                console.log('Token Verified')
                return true
            } else {
                console.log('Token failed')
                return err
            }
        })
    },
}
