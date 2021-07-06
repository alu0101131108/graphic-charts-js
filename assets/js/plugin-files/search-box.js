/**
 * @module GraphicData
 * @desc  Class to facilitate the creation and use of a simple text form.
 * Its able to show error messages. It also sanitizes input.
 * @since 17/06/2021
 * @author Sebastián Daniel Tamayo Guzmán
 */
'use strict';

class SearchBox {
  /**
   * It will create the HTML element structure to represent
   * the search box. It also attaches a handler to the
   * button and sets some text to it.
   * @param {Function} handler 
   * @param {String} buttonText 
   */
  constructor(handler, buttonText) {
    // Text input.
    const TEXT_INPUT = document.createElement('input');
    TEXT_INPUT.type = 'text';
    TEXT_INPUT.placeholder = 'Serial Number (SN)';
    TEXT_INPUT.value = '';
    // Submit button.
    const SEARCH_BUTTON = document.createElement('button');
    SEARCH_BUTTON.textContent = buttonText;
    SEARCH_BUTTON.onclick = () => {
      const SANITIZED = TEXT_INPUT.value.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '');
      if (SANITIZED !== '') {
        handler(SANITIZED);
      }
    };
    // Container with input text + submit button.
    this.form = document.createElement('div');
    this.form.appendChild(TEXT_INPUT);
    this.form.appendChild(SEARCH_BUTTON);

    // Message container.
    this.message = document.createElement('span');
    this.message.id = 'search-box-errmessage';
    this.message.textContent = '';

    // Root container.
    this.root = document.createElement('div');
    this.root.id = 'search-box-container';
    this.root.appendChild(this.form);
    this.root.appendChild(this.message);
  }

  /**
   * Getter for the main HTML Element.
   */
  getHtmlElement() {
    return this.root;
  }

  /**
   * Changes the view of the Search Box in order to show
   * an error message.
   * @param {String} error 
   */
  showError(error) {
    this.message.textContent = 'Error: ' + error;
    setTimeout(() => {
      this.message.textContent = '';
    }, 1000);
  }

}

export {SearchBox};