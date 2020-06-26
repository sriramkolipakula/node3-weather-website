const request = require("request");
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=f24585ea82d805abba5468f463426881&query=' + latitude +','+ longitude +'&units=f'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect weather service',undefined);
        }
        else if(body.error){
            callback('cannot find the given forecast for given..',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+' it is currently '+body.current.temperature+' degrees out. There is a'+body.current.precip +'% chance of rain')
        }
    })
}
module.exports=forecast
