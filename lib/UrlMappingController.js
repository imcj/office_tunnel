const UrlMapping = require('./UrlMapping');

module.exports = class UrlMappingController {

  /**
   * 
   * @param {UrlMappings} urlMappings 
   */
  constructor(urlMappings) {
    this.urlMappings = urlMappings;
  }

  /**
   * 
   * @param {http.IncomingHttpHeaders} request 
   * @param {http.ServerResponse} response 
   */
  update(request, response) {
    let data = null;
    request.on('data', (thunk) => {
      if (data === null) {
        data = thunk;
        return;
      }
      data.concat(thunk);
    });

    request.on('end', () => {
      const mapping = JSON.parse(data);
      const {remoteAddress} = request.socket;
      var ip = (request.headers['x-forwarded-for'] || '').split(',').pop().trim() || remoteAddress;

      this.urlMappings.add(new UrlMapping(mapping['domain'], ip, mapping['port'], mapping['path']));

      response.end();
    });
  }
}