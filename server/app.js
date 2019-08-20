import {} from 'dotenv/config';

import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-Parser';
import mongoose from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import routes from 'express-recursive-routes';

const app = express();

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({	extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

app.set('trust proxy', 1);
app.use(session({
	cookie: {
		path: '/',
		httpOnly: true,
		maxAge: null,
		secure: false,
	},
	resave: true,
	saveUninitialized: false,
	secret: process.env.SESSION_SECRET,
}))

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
	useCreateIndex: true,
	useNewUrlParser: true,
}, function(){
	console.log('Connecting to DB...')
}).then(function() {
	console.log('Connected to db successfully!');

	app.emit('db-connected');
}).catch(function(err) {
	console.log('Connect to db failed...', err);
});	

app.on('db-connected', function() {
	// Check remember me cookies for new sessions
	routes.mountRoutes(app, './server/routes');

	app.use((req, res) => {
		res.status(404).send('<h1>404 - Not found</h1>')
	});

	app.listen(3000, () => {
		console.log('Server started on port 3000!');
	});
});
