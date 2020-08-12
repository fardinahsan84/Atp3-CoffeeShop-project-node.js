var express       =      require('express');
var bodyParser    =      require('body-parser');
var exSession     =      require('express-session');
var cookieParser 	=      require('cookie-parser');
var login   =            require('./controller/login');
var logout  =            require('./controller/logout');
var home =               require('./controller/home');
var manager  =           require('./controller/manager');
//var dlt     =            require('./controller/manager/delete');
var app     =            express();
//var routes  =         require('./node_modules/router');

app.set('view engine', 'ejs');

//middleware

//app.use('/style', express.static('assets'));
//app.use('/abc', express.static('assets'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my secret value', saveUnitialized: true,resave: false}));
app.use(cookieParser());
app.use('/login',login);
app.use('/logout',logout);
app.use('/home',home);
app.use('/manager',manager);
//app.use('/home/update',update);
//app.use('/home/delete/1',dlt);
//routes(app);
app.get('/', function(req, res){
	res.send("this is index page!<br> <a href='/login'> login</a> ");
});

app.listen(58800,function(){
  console.log('express http server started at ....58800');
});
