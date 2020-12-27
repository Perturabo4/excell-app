import {CHANGE_TEXT, TABLE_RESIZE} from './types';

function tableResizeHandler(state, {resizeType, id, value}) {
  const key = resizeType === 'col' ? 'colState' : 'rowState';
  const prevState = state[key] || {};
  prevState[id] = value;
  return {...state, [key]: prevState};
}

/* eslint-disable no-case-declarations */
export function rootReducer(state, action) {
  let prevState;
  switch (action.type) {
    case TABLE_RESIZE:
      const newState = tableResizeHandler(state, action.data);
      return {...newState};
    case CHANGE_TEXT:
      prevState = state['dataState'] || {};
      prevState[action.data.id] = action.data.value;
      return {...state,
        currentText: action.data.value,
        dataState: prevState};
    default: return state;
  }
}
