/**
 * @module GraphicData
 * @desc  Class to facilitate the creation and use of a simple text form.
 * Its able to show error messages. It also sanitizes input.
 * @since 17/06/2021
 * @author Sebastián Daniel Tamayo Guzmán
 */
'use strict';

class SearchBox {
  constructor(handler, buttonText) {
    // Text input.
    this.textInput = document.createElement('input');
    this.textInput.type = 'text';
    this.textInput.value = '';
    // Submit button.
    this.searchButton = document.createElement('button');
    this.searchButton.textContent = buttonText;
    this.searchButton.onclick = () => {
      let sanitized = this.textInput.value.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '');
      if (sanitized !== '') {
        handler(sanitized);
      }
    };
    // Root container.
    this.root = document.createElement('div');
    this.root.appendChild(this.textInput);
    this.root.appendChild(this.searchButton);
  }

  getHtmlElement() {
    return this.root;
  }

  showError(error) {
    console.log('SearchBox: ' + error);
    // To do.
  }

}

export {SearchBox};