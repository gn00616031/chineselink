
// These two lines are required to initialize Express in Cloud Code.
express = require('express');
app = express();
I18n = require('cloud/i18n-parse/i18n.js');
gen = require('cloud/gen.js');

I18n.expressBind(app, {
  "locales": ["zh_TW", "en"],
});

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body


app.get('/', function(req, res) {
  res.render('index');
});
app.get('/generate', function(req, res){
  res.redirect('/');
});
app.post('/generate', function(req, res){
  res.render('generate', { url: 'http://suta.us.to/'+gen.genurl() });
});
app.get('/:url', function(req, res) {
  res.render('hello', { message: req.params.url });
});

app.listen();
