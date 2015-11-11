var Link = Parse.Object.extend('Link');
var gen = require('cloud/controller/gen.js');

function stringStartsWith (string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}

exports.generate = function(req, res){
	var url = req.body.url;
	if(!stringStartsWith(url, 'http')){
		url = 'http://'+url;
	}
	var query = new Parse.Query(Link);
	query.equalTo("URL", url);
    query.first().then(function(link) {
    	if(link){
    		res.render('generate', { url: 'http://suta.us.to/' + link.get('path') });
    	} else {
			var path = gen.genPath();
			link = new Link();
			link.set('URL', url);
			link.set('path', path);
			link.save().then(function(object) {
				res.render('generate', { url: 'http://suta.us.to/' + path });
			  }, function(error) {
			    res.send(500, 'Server is busy');
			  });
    	}
    }, function() {
  		res.send(500, 'Server is busy')
	})
}

exports.redirectTo = function(req, res){
	var path = req.params.path;
	var query = new Parse.Query(Link);
	query.equalTo("path", path);
	query.first().then(function(link){
	    if(link) {
	      link.increment("view");
	      link.save().then(function(success) {
	        res.redirect(link.get("URL"));
	      }, function(error) {
	        res.redirect(link.get("URL"))
	      });
	    } else {
	      res.redirect("/");
	    }
	}, function(error) {
	    res.send(500, "Server is busy");
	});
}