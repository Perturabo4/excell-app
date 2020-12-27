/* eslint-disable no-undef */

import {$} from '../../core/dom';
export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const resizeType = $resizer.data.resize;
    const resizeElement = $parent.data[resizeType];
    const sideProp = resizeType === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({opacity: 1,
      [sideProp]: '-5000px'});

    document.onmousemove = (e) => {
      let delta;
      if (resizeType === 'col') {
        delta = e.pageX - coords.right;

        value = coords.width + delta + 'px';
        $resizer.css({right: -delta + 'px'});
      } else {
        delta = e.pageY - coords.bottom;
        value = coords.height + delta + 'px';

        $resizer.css({bottom: -delta + 'px'});
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      $resizer.css({opacity: '',
        bottom: 0,
        right: 0});

      if (resizeType === 'col') {
        $parent.css({width: value});
        $root
            .findAll(`[data-col="${resizeElement}"]`)
            .forEach((el) => el.style.width = value);
      } else {
        $parent.css({height: value});
      }

      resolve({
        resizeType,
        value,
        id: $parent.data[resizeType],
      });
    };
  });
}
