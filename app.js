console.log('Starting server...');
import express from 'express';
import exphbs from 'express-handlebars';
import index from './routes/index';
import routes from 'express-recursive-routes';

const app = express();

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
}));
app.set('view engine', '.hbs');

routes.mountRoutes(app, './routes');

app.listen(3000, () => {
	console.log('Server started on port 3000!');
});