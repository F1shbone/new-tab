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
  const executeCBs: Array<() => Promise<void>> = []
  const execute = () => {
    isFetching.value = true
    isFinished.value = false
    error.value = undefined

    return asyncFn()
      .then((result) => {
        data.value = result
      })
      .then(() => {
        executeCBs.forEach((e) => e())
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
  const clearResults = () => {
    data.value = undefined
    error.value = undefined
    isFinished.value = false
  }
  const onExecuteResponse = async (cb: () => Promise<void>) => {
    executeCBs.push(cb)
  }

  if (options.immediate) {
    execute()
  }

  return {
    data,
    isFetching,
    isFinished,
    error,
    clearResults,
    execute,
    onExecuteResponse,
  }
}
