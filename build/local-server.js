const express = require('express');
const app = express();
var compression = require('compression');
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')

var proxyTable =  {
      '/hrmanage': {target:'http://192.168.1.251:66'},
      '/resumeClient': {target:'http://192.168.1.251:8088'},
      // '/resumeClient': {target:'http://hunter.51jrq.com'},
      // '/hrmanage': {target:'http://yun.51jrq.com'},
      //'/resumeClient': {target:'http://51jrq-servers2:8088'}
      // '/web': {target:'http://192.168.101.57:66/hrmanage/api'}
    }

app.use(compression());

app.use('/static', express.static('./dist/static'))
app.use('/', express.static('./dist'))

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
