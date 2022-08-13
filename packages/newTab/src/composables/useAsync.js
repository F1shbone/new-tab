import { ref } from 'vue';

export function useAsync(asyncFn) {
  const data = ref(undefined);
  const isLoading = ref(false);
  const isFinished = ref(false);
  const error = ref(undefined);
  const execute = () => {
    isLoading.value = true;
    isFinished.value = false;
    error.value = undefined;

    return asyncFn()
      .then((result) => {
        data.value = result;
      })
      .catch((e) => {
        data.value = undefined;
        error.value = e;
      })
      .finally(() => {
        isLoading.value = false;
        isFinished.value = true;
      });
  };

  return {
    data,
    isLoading,
    isFinished,
    error,
    execute,
  };
}
