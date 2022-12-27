import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const HighlightTrigger = trigger('rowHighLight', [
  state(
    'selected',
    style({
      backgroundColor: 'lightgreen',
      fontSize: '20px',
    })
  ),
  state(
    'notSelected',
    style({
      backgroundColor: 'lightsalmon',
      fontSize: '12px',
    })
  ),
  transition('selected => notselected', animate('200ms')),
  transition('notSelected => selected', animate('400ms')),
]);
