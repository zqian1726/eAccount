var http = require('http')
	, path = require('path')
	, connect = require('connect') // express 4.0 would not include connect
	, express = require('express')
	, app = express()
	, routes = require('./routes')

// access port: 3000
app.set('port', process.env.PORT || 3000)

// set view dir and engine
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

// use middlewares in connect
app.use(connect.favicon())
app.use(connect.logger('dev'))
app.use(connect.json())
app.use(connect.urlencoded())
app.use(connect.methodOverride()) // enable RESTful requests
// app.use(app.router)
app.use(express.static(path.join(__dirname, 'public'))) // render CSS, JS and images

// development only
if ('development' == app.get('env')) {
  app.use(connect.errorHandler())
}

app.get('/', routes.index)

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
