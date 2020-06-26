const path = require('path')
const express =require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000
//define paths for express config
const publicpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templets/views')
const partialpath = path.join(__dirname,'../templets/partials')
//setup handebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)
// setup directry to serve
app.use(express.static(publicpath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather-app',
        name:'Sriram',
    })
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name:'Sriram'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'help',
        helptext:'to get help contact 12554',
        name:'Sriram',
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'please enter the address',
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})


        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address,
            })
        })
    })
    
})
app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide search term',
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })

})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sriram',
        errormsg:'help article not found',
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sriram',
        errormsg:'page not found',
    })
})
app.listen(port,()=>{
    console.log('server is up on port '+port)
})