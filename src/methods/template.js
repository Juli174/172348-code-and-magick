function getTemplateClone(templateElement, className){
    if ('content' in templateElement) {
      return templateElement.content.querySelector('.' + className);
    } else {
      return templateElement.querySelector('.' + className);
    }
  }

module.exports = getTemplateClone;