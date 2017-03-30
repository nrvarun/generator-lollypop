let path 	=	require('path');
let express = 	require('express');
let app 	= 	express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
let port = process.env.PORT || 8000;

// set the view engine to ejs
app.set('view engine', 'jade');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(path.join(__dirname + '/dist')));

// set the home page route
app.get('/', function (req, res) {
	// ejs render automatically looks in the views folder
  res.render('index');
});

app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
});