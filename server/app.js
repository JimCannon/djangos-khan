const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-Parser');
const mongoose = require('mongoose');

const index = require('routes/index');
const players = require('routes/players');
const register = require('routes/register');
const login = require('routes/login');

const app = express();

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({	extended: false }));
app.use(bodyParser.json());

//app.use('/', express.static('public'));
//app.use(express.static('public'));

app.use(express.static(__dirname + '/public'));

const dbUrl = 'mongodb://127.0.0.1:27017/djangoskhan';
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
	app.use(index);
	app.use(players);
	app.use(register);
	app.use(login);

	app.listen(3000, () => {
		console.log('Server started on port 3000!');
	});
});
