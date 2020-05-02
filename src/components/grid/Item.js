import { merge } from 'lodash-es';

export default {
  functional: true,
  render(h, context) {
    return h(
      'section',
      merge(
        {
          class: {
            grid__item: true,
          },
        },
        context.data
      ),
      context.slots().default
    );
  },
};
