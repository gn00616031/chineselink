
// These two lines are required to initialize Express in Cloud Code.
express = require('express');
app = express();
I18n = require('cloud/i18n-parse/i18n.js');
link = require('cloud/route/link.js');

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
app.post('/generate', link.generate);
app.get('/:path', link.redirectTo);

app.listen();
