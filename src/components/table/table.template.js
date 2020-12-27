const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 140;

function toCell(state, row) {
  return (_, col) => {
    const dataId = `${row}:${col}`;
    return `<div class="cell" 
            contenteditable 
            data-col="${col}"
            data-id="${dataId}"
            data-type="cell"
            style="width: ${getWidth(state.colState, col)}"
            >
            ${state.dataState[dataId] || ''}
          </div>`;
  };
}

function toColumn({col, index, width}) {
  return `<div class="column" 
              data-type="resizable"
              data-col="${index}"
              style="width: ${width}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>`;
}

function createRow(index, content, state) {
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `<div class="row" 
    data-type="resizable"
    data-row="${index ? index : ''}"
    style="height:${state.rowState[index] || ' '}"
    >
      <div class="row-info">
        ${index ? index : ''}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
</div>`;
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx);
}

function getWidth(state, index) {
  return state[index] || DEFAULT_WIDTH + 'px';
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');
  rows.push(createRow(null, cols, state));
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');
    rows.push(createRow(row + 1, cells, state));
  }
  return rows.join('');
}
