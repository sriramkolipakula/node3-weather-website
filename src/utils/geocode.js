const request = require('request')
const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3JpcmFta29saXBha3VsYSIsImEiOiJja2JwY24wcjIyYXlpMnpxdnkwODNhcmxpIn0.-zt6sWJk7VU5XYIrCOT0cw&limit=1'
    request({url,json:true},(error, {body})=>{
        
        if(error){
            callback('unable to connect location services!',undefined)
        }
        else if(body.features.length === 0){
            callback('unable to find location . try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
   