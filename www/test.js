var http = require('http')
  , path = require('path')
  , connect = require('connect') // express 4.0 would not include connect
  , express = require('express')
  , app = express()
  , index = require('./routes')
  , auth = require('./routes/auth')
  , user = require('./routes/user')
  , record = require('./routes/record')
  , category = require('./routes/category')
  , statistic = require('./routes/statistic')

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
app.use(express.static(path.join(__dirname, 'public/'))) // render CSS, JS and images
app.use(connect.cookieParser('#This%is%eAcount%secret#'))
app.use(connect.session({ secret: '#This%is%eAcount%secret#', key: 'sid', cookie: { secure: true }}))


// development only
if ('development' == app.get('env')) {
  app.use(connect.errorHandler())
}

app.get('/', function(req, res) {
  console.log(req.cookies)
  if (req.cookies.user) {
    console.log(req.cookies.user)
    res.send('Remembered!')
  }
  else {
    console.log('Not found')
    res.cookie('user', 'Ian', { maxAge: 1000 * 60 })
    res.redirect('back')
  }
})

app.get('/forget', function(req, res) {
  res.clearCookie('remember');
  res.redirect('back');
})

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
