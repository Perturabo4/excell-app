/* eslint-disable no-undef */
import {ExcelComponent} from '../../core/ExcelComponent';
import {shouldResize} from './table.functions';
import {resizeHandler} from './table.resize';
import {createTable} from './table.template.js';


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['click', 'mousedown'],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
