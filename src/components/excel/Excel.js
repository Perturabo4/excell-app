import {$} from '../../core/dom';
export class Excel {
  constructor(selector, options) {
    // eslint-disable-next-line no-undef
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    // eslint-disable-next-line no-undef
    const $root = $.create('div', 'excel');
    $root.classList.add('excel');
    this.components.forEach((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.innerHTML = component.toHTML();
      $root.append($el);
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
