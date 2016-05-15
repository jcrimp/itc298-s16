var express = require('express'); 
var exphbs = require('express-handlebars');
var app = express();


app.use(express.static('public'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use('/api', require('cors')());
//var html_dir = './public/';

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
  console.log('The server is running ' + app.get('port') + '; Press Ctrl-C to terminate.');
});

var sampleInsertFind = require('./test_db.js');
sampleInsertFind.testDB();

function getCurrentYear(){
  var today = new Date();
  var thisYear = today.getFullYear();
  return {year:thisYear};
}

app.use(function(req, res, next){
        if(!res.locals.partials) res.locals.partials = {};
        res.locals.partials.currentYear = getCurrentYear();
        next();
});

require('./routes.js')(app);

app.use(function(req, res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Page not found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});