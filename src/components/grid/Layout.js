import Vue from 'vue';
import GridItem from './Item.js';

import './layout.scss';

export default Vue.extend({
  functional: true,
  render(h, context) {
    const slots = context.slots();

    return h('div', { class: 'grid__layout' }, [
      h(
        'div',
        { class: 'grid__layout--left' },
        slots.left ? slots.left.map(e => h(GridItem, [e])) : []
      ),
      h(
        'div',
        { class: 'grid__layout--right' },
        slots.right ? slots.right.map(e => h(GridItem, [e])) : []
      ),
    ]);
  },
});
