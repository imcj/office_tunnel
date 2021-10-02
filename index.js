const httpProxy = require('http-proxy'),
  http = require('http'),
  Controller = require('./lib/Controller'),
  UrlMappings = require('./lib/UrlMappings'),
  UrlMapping = require('./lib/UrlMapping');

const urlMappings = new UrlMappings();
const controller = new Controller(urlMappings);


urlMappings.add(new UrlMapping('imcj.me', '127.0.0.1', 3000, '/'));

const proxy = httpProxy.createProxyServer({});
const server = http.createServer((request, response) => {
  
  if (controller.dispatch(request, response)) {
    return;
  }

  const mapping = urlMappings.get(request.headers.host);
  if (!mapping) {
    response.statusCode = 404;
    response.end();
    return;
  }
  request.headers.host = mapping.host;
  proxy.web(
    request,
    response, 
    {
      target: `http://${mapping['host']}:${mapping.port}`
    },
    (error, request, response) => {
      response.statusCode = 500;
      response.end(error.toString());
    });
});

server.listen(5050, '0.0.0.0');