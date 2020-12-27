/* eslint-disable no-undef */
import {ExcelComponent} from '../../core/ExcelComponent';
import {isCell, shouldResize, matrix, nextSelector} from './table.functions';
import {resizeHandler} from './table.resize';
import {createTable} from './table.template.js';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';
import * as actions from '../../redux/actions';

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
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selected = new TableSelection();
  }

  init() {
    super.init();
    this.$cell = this.$root.find('[data-id="0:0"]');

    this.selectCell(this.$cell);
    this.$on('Formula:input', (data) => {
      this.updateTextInStore(data);
    });
  }


  selectCell($cell) {
    this.selected.select($cell);
    this.$emit('Table:select', $cell);
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      console.log('Resize data', data);
      this.$dispatch(actions.tableResize(data));
    } catch (error) {
      throw new Error(error);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selected.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));

        this.selected.selectGroup($cells);
      } else {
        this.selectCell($target);
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selected.current.id(),
      value,
    }));
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}


