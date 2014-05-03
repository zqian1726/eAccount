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
	, func = require('./routes/func')
	, validate = require('./routes/validate')

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
app.use(connect.cookieParser())
app.use(connect.session({ secret: '#This%is%eAcount%secret#', key: 'sid', cookie: { secure: true, path: '/', expires: false }}))


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
app.get('/signout', auth.authorized, auth.signout)

// Validation
app.post('/validate/email', validate.email)
app.post('/validate/category', validate.category)

// Welcome page: sign in & sign up
app.get('/', auth.unauthorized, index.index)

// Home page:
app.get('/home', auth.authorized, index.home)

// User page:
app.put('/user', auth.authorized, user.update)
app.get('/user', auth.authorized, user.info)

// Record CRUD:
app.post('/record/new', auth.authorized, record.add)
app.put('/record/:rid', auth.authorized, record.update)
app.del('/record/:rid', auth.authorized, record.delete)
app.get('/record/list', auth.authorized, record.list)
// Record page:
app.get('/record', auth.authorized, record.index)

// Record CRUD:
app.post('/category/new', auth.authorized, category.add)
app.put('/category/:tag', auth.authorized, category.update)
app.del('/category/:tag', auth.authorized, category.delete)
app.get('/category/list', auth.authorized, category.list)
// Record page:
app.get('/category', auth.authorized, category.index)

// statistic page:
app.get('/statistic', auth.authorized, statistic.index)

// map page:
app.get('/map', auth.authorized, func.map)
app.get('/calendar', auth.authorized, func.calendar)

// 404
app.get('/404', index._404)
app.get('*', index._404)

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
