/* eslint-disable no-undef */
import {ExcelComponent} from '../../core/ExcelComponent';
import {isCell, shouldResize, matrix, nextSelector} from './table.functions';
import {resizeHandler} from './table.resize';
import {createTable} from './table.template.js';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selected = new TableSelection();
  }

  init() {
    super.init();
    this.$cell = this.$root.find('[data-id="0:0"]');

    this.selectCell(this.$cell);
    this.$on('Formula:input', (data) => {
      this.selected.current.text(data);
    });

    this.$on('Formula:enter', () => {
      this.selected.current.focus();
    });
  }

  selectCell($cell) {
    this.selected.select($cell);
    this.$emit('Table:select', $cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selected.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));

        this.selected.selectGroup($cells);
      } else {
        this.selected.select($target);
      }
    }
  }


  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft',
    ];
    const key = event.key;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selected.current.id(true);

      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }


    return false;
  }

  onInput(event) {
    this.$emit('Table:input', $(event.target));
  }
}


