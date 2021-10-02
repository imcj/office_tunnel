const UrlMappingController = require('./UrlMappingController');

module.exports = class Controller {

  /**
   * 
   * @param {UrlMappings} urlMappings 
   */
  constructor(urlMappings) {
    this.urlMappingController = new UrlMappingController(urlMappings);
    this.urlMappings = urlMappings;
  }

  /**
   * 
   * @param {http.IncomingHttpHeaders} request 
   * @param {http.ServerResponse} response 
   * @returns {Boolean}
   */
  dispatch(request, response) {
    if (request.url.startsWith('/$controller$/ip')) {
      this.urlMappingController.update(request, response);
      return true;
    }
    return false;
  }
}