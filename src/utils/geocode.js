const request = require('request')

const geocode = (address , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a8e02f155bffb3f468d720639d337469&query=' + address

    request({url: url, json: true},(error, response) => {
        if(error){
            callback('no internet connection !',undefined)
        } else if (response.body.error){
            callback('unable to find location', undefined)
        } else {
            callback(undefined, response.body)
        }
    }
    )
}

module.exports = geocode