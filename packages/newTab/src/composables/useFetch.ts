import { ref } from 'vue'

export function useFetch<T>(
  asyncFn: () => Promise<T>,
  options = {
    immediate: true,
  },
) {
  const data = ref<T | undefined>(undefined)
  const isFetching = ref(false)
  const isFinished = ref(false)
  const error = ref(undefined)
  const execute = () => {
    isFetching.value = true
    isFinished.value = false
    error.value = undefined

    return asyncFn()
      .then((result) => {
        data.value = result
      })
      .catch((e) => {
        data.value = undefined
        error.value = e
      })
      .finally(() => {
        isFetching.value = false
        isFinished.value = true
      })
  }

  if (options.immediate) {
    execute()
  }

  return {
    data,
    isFetching,
    isFinished,
    error,
    execute,
  }
}
