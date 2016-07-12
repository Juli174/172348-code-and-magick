'use strict';

module.exports = {
  addClass: function(element, className) {
    if(element) {
      element.classList.add(className);
    }
  },
  removeClass: function(element, className) {
    if(element) {
      element.classList.remove(className);
    }
  }
};
