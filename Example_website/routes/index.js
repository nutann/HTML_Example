var express = require('express');
var router = express.Router();
var path = require('path');
fs = require('fs');
var Mustache = require('mustache')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.type('text/html');
    res.status(200);
    res.sendFile(path.resolve('views/new.html'));
});

/* GET home page. */
router.post('/thankyou', function(req, res, next) {
    console.log("*************post data*****" +JSON.stringify(req.body));
    fs.readFile(path.resolve('views/thankyou.html'),function(err,template) {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(Mustache.to_html(template.toString(), req.body))
        res.end()
    })

});
module.exports = router;
