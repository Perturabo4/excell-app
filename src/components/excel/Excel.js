import {$} from '../../core/dom';
export class Excel {
  constructor(selector, options) {
    // eslint-disable-next-line no-undef
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    // eslint-disable-next-line no-undef
    const $root = $.create('div', 'excel');

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
    console.log(this);
  }
}
