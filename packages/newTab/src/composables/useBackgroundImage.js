import { useStorage } from '@vueuse/core';

const background = useStorage('cnt-background', {
  active: 'Default',
  images: [
    {
      name: 'Default',
      lastModified: 0,
      lastModifiedDate: new Date(0),
      dataURL: '',
      size: 0,
      type: '',
    },
  ],
});

export function useBackgroundImage() {
  return background;
}
