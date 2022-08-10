import { useStorage } from '@vueuse/core';

const widgetState = useStorage('cnt-widgetState', {
  active: undefined,
});

export function useWidgetState() {
  return widgetState;
}
