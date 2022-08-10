import { storage } from 'webextension-polyfill';
import { useStorageAsync } from '@vueuse/core';

const storageLocal = {
  removeItem(key) {
    return storage.local.remove(key);
  },

  setItem(key, value) {
    return storage.local.set({ [key]: value });
  },

  async getItem(key) {
    return (await storage.local.get(key))[key];
  },
};

export const useStorageLocal = (key, initialValue, options) =>
  useStorageAsync(key, initialValue, storageLocal, options);
