/* eslint-disable no-undef */
export class TableSelection {
    static className = 'selected'

    constructor() {
      this.group = [];
      this.current = null;
    }

    select($el) {
      this.cleare();
      this.group.push($el);
      this.current = $el;
      $el.focus().addClass(TableSelection.className);
    }

    selectGroup($group = []) {
      this.cleare();

      this.group = $group;
      this.group.forEach(($el) => $el.addClass('selected'));
    }

    cleare() {
      this.group.forEach(($c) => $c.removeClass(TableSelection.className));
      this.group = [];
    }
}
