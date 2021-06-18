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
    this.message.style.color = 'red';
    // this.message.style.background = 'red';
    this.message.textContent = '';

    // Root container.
    this.root = document.createElement('div');
    this.root.style.textAlign = 'center';
    this.root.style.padding = '10px';
    this.root.appendChild(this.form);
    this.root.appendChild(this.message);
  }

  getHtmlElement() {
    return this.root;
  }

  showError(error) {
    this.message.textContent = error;
    setTimeout(() => {
      this.message.textContent = '';
    }, 1000);
  }

}

export {SearchBox};