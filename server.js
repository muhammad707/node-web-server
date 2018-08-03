const fs = require('fs');
const express = require('express'); //library that helps to build web app
const hbs = require('hbs'); // dynamic template engine
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'hbs'); // setting view engine type 

hbs.registerPartials(__dirname + '/views/partials'); //register partials by their absolute location
app.use(express.static(__dirname + '/public')); //middleware

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}, ${req.method}, ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		console.log('Unable to write log to file');
	});
	next();
});

//registering helper functions 
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

//hbs helper to  convert message to uppercase
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

//routing and rendering to home page
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeText: 'Welcome to my website'
	});
});

//routing and rendering about page
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page', //passing data to view dynamically
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Bad request'
	})
});
app.listen(port, () => {
	console.log(`Server is running at port ${port}`);
});