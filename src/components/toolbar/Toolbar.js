import {ExcelComponent} from '../../core/ExcelComponent';

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar'

    constructor($root) {
      super($root, {
        name: 'Toolbar',
        listeners: ['click'],
      });
    }

    onClick(event) {
      console.log(event.target);
    }
    toHTML() {
      return `<div class="button">
      <span class="material-icons">
          align_horizontal_left
      </span>
  </div>
  <div class="button">
      <span class="material-icons">
          align_horizontal_center
      </span>
  </div>
  <div class="button">
      <span class="material-icons">
          align_horizontal_right
      </span>
  </div>
  <div class="button">
      <span class="material-icons">
          format_bold
      </span>
  </div>
  <div class="button">
      <span class="material-icons">
          format_italic
      </span>
  </div>
  <div class="button">
      <span class="material-icons">
          format_underline
      </span>
  </div>`;
    }
}
