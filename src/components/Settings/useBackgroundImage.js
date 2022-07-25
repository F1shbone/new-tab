import { useStorage } from '@vueuse/core';

const background = useStorage('cnt-background', {
  active: undefined,
  images: [],
});

export function useBackgroundImage() {
  return background;
}
