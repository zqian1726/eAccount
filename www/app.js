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
app.use(connect.cookieParser())
app.use(connect.session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true }}))
app.use(express.static(path.join(__dirname, 'public/'))) // render CSS, JS and images

// development only
if ('development' == app.get('env')) {
  app.use(connect.errorHandler())
}

/*
 * Routing
 */

// Welcome page: sign in & sign up
app.get('/', index.index)

// Sign pages:
app.get('/signin', index.signin)
app.get('/signup', index.signup)

// Authorization:
app.post('/signin', auth.signin)
app.post('/signup', auth.signup)
app.post('/signout', auth.signout)
app.get('/validate', auth.validate)

// Home page:
app.get('/home', index.home)

// User page:
app.get('/user', user.info)
app.post('/user', user.update)

// Record page:
app.get('/record', record.list)
app.put('/record', record.add)
app.post('/record/:rid', record.update)
app.delete('/record/:rid', record.delete)

// Category page:
app.get('/category', category.list)
app.put('/category', category.add)
app.post('/category/:cid', category.update)
app.delete('/category/:cid', category.delete)

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
