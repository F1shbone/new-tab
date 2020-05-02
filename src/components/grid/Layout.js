import Vue from 'vue';
import GridItem from './Item.js';

import './layout.scss';

export default Vue.extend({
  functional: true,
  render(h, context) {
    const slots = context.slots();

    // Left Col
    // const left = slots.left.map((item, i) =>
    //   h(
    //     GridItem,
    //     {
    //       style: {
    //         'grid-area': `${i + 1} / 1 / ${i + 2} / 2`,
    //       },
    //     },
    //     [item]
    //   )
    // );

    // // Right Col
    // const right = slots.right.map((item, i) =>
    //   h(
    //     GridItem,
    //     {
    //       style: {
    //         'grid-area': `${i + 1} / 3 / ${i + 2} / 4`,
    //       },
    //     },
    //     [item]
    //   )
    // );

    return h('div', { class: 'grid__layout' }, [
      h(
        'div',
        { class: 'grid__layout--left' },
        slots.left.map(e => h(GridItem, [e]))
      ),
      h(
        'div',
        { class: 'grid__layout--right' },
        slots.right.map(e => h(GridItem, [e]))
      ),
    ]);
  },
});
