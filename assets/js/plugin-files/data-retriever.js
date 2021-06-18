/**
 * @module DataRetriever
 * @desc  Class module to facilitate AJAX requests expecting JSON 
 * response.
 * @since 17/06/2021
 * @author Sebastián Daniel Tamayo Guzmán
 */
'use strict';

class DataRetriever {
  /**
   * Sets the url where the request will be made.
   * @param {String} url 
   */
  constructor(url) {
    this.url = url;    
  }
  
  /**
   * Creates the URL string associated with the parameters.
   * @param {Object} parameters
   * @return {String}
   */
  parseUrl(parameters) {
    const PARAM_STRINGS = Object.keys(parameters).map((key) => {
      return key + '=' + parameters[key];
    });
    return this.url + '?' + PARAM_STRINGS.join('&');
  }

  /**
   * Sends a GET Request with specified parameters. It also
   * handles the response with the callback.
   * @param {Object} parameters 
   * @param {Function} callback 
   */
  get(parameters, callback) {
    const REQUEST = new XMLHttpRequest();
    REQUEST.open('GET', this.parseUrl(parameters));
    REQUEST.send();
    REQUEST.onreadystatechange = () => {
      if (REQUEST.readyState === 4) {   // State is done.
        if (REQUEST.status === 200) {   // Status is ok.
          const RESULT = JSON.parse(REQUEST.responseText);
          callback(RESULT);
        } 
        else {
          console.log('SERVER REQUEST ERROR: ' + REQUEST.status); // An error occurred during the request.
        }
      }
    };
  }

}

export {DataRetriever};