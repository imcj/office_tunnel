const UrlMapping = require('./UrlMapping');

module.exports = class UrlMappings {

  constructor() {
    this.mappings = new Map();
  }

  /**
   * 
   * @param {UrlMapping} mapping 
   */
  add(mapping) {
    console.debug(`UrlMappings: add mapping`, {
      mapping,
    });
    this.mappings.set(mapping.cacheKey, mapping);
  }

  /**
   * 
   * @param {String} domain 
   */
  get(domain) {
    console.debug(`UrlMappings: get by ${domain}`);
    return this.mappings.get(domain)
  }
}