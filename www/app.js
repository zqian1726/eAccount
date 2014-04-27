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
app.use(connect.session({ secret: '#This%is%eAcount%secret#', key: 'sid', cookie: { secure: true, maxAge: 3600000 }}))
app.use(express.static(path.join(__dirname, 'public/'))) // render CSS, JS and images

// development only
if ('development' == app.get('env')) {
  app.use(connect.errorHandler())
}

/*
 * Routing
 */
// Authorization:
app.post('/signin', auth.unauthorized, auth.signin)
app.post('/signup', auth.unauthorized, auth.signup)
app.post('/signout', auth.authorized, auth.signout)
app.post('/validate', auth.validate)

// Welcome page: sign in & sign up
app.get('/', index.index)

// Sign pages:
app.get('/signin', auth.unauthorized, index.signin)
app.get('/signup', auth.unauthorized, index.signup)

// Home page:
app.get('/home', auth.authorized, index.home)

// User page:
app.put('/user', auth.authorized, user.update)
app.get('/user', auth.authorized, user.info)

// Record page:
app.post('/record', auth.authorized, record.add)
app.put('/record/:rid', auth.authorized, record.update)
app.del('/record/:rid', auth.authorized, record.delete)
app.get('/record', auth.authorized, record.list)

// Category page:
app.post('/category', auth.authorized, category.add)
app.put('/category/:cid', auth.authorized, category.update)
app.del('/category/:cid', auth.authorized, category.delete)
app.get('/category', auth.authorized, category.list)

// 404
app.get('*', index._404)

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
