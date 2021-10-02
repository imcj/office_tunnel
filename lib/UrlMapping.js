module.exports =  class UrlMapping {
  constructor(domain, host, port, path) {
    this.domain = domain;
    this.host = host;
    this.port = port;
    this.path = path;
  }

  get cacheKey() {
    return this.domain;
  }
}