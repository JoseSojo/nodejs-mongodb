const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// inicializations
const app = express();
require('./database.js'); // connection database
require('./config/passport.js') // passport

// Settings
app.set('port', process.env.PORT || 7000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
  // helpers: require('./src/lib/handlebars.js')
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'demon',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Globar Variable
app.use((req,res,next)=>{
  	res.locals.user = req.user || null;
	res.locals.succ = req.flash('succ');
	res.locals.err = req.flash('err');
  	res.locals.error = req.flash('error');
	next();
})

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listenning
app.listen(app.get('port'), () => {
  console.log(' Server on port', app.get('port'));
})
