var express       =      require('express');
var bodyParser    =      require('body-parser');
var exSession     =      require('express-session');
var cookieParser 	=      require('cookie-parser');
var fileUpload    =      require('express-fileupload');
var path					=			 require('path');

var login   =            require('./controller/login');
var logout  =            require('./controller/logout');
var home =               require('./controller/home');
var manager  =           require('./controller/manager');
var app     =            express();
//var routes  =         require('./node_modules/router');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//middleware

//app.use('/style', express.static('assets'));
//app.use('/abc', express.static('assets'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my secret value', saveUnitialized: true,resave: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/login',login);
app.use('/logout',logout);
app.use('/home',home);
app.use('/manager',manager);
//routes(app);
app.get('/', function(req, res){
	res.send("this is index page!<br> <a href='/login'> login</a> ");
});

app.listen(58800,function(){
  console.log('express http server started at ....58800');
});
