const express = require("express")
const config = require('./config/config')
const router = require('./router/router')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)


app.use('/api',function(req, res){
	console.log(req.body)
	res.send(req.body)
})

app.listen(config.server_port, ()=>{
    console.log(
        'Server started on port '+config.server_port+"\n\nhttp://localhost:"+config.server_port
        )
})
