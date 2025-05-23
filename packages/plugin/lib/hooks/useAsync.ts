import { Accessor, createSignal, createMemo, onMount } from 'solid-js'

export function useAsync<T>(options: { queryFn: () => Promise<T> }): {
  value: Accessor<T | undefined>
  error: Accessor<Error | undefined>
  loading: Accessor<boolean>
  refetch: () => Promise<void>
} {
  const [value, setValue] = createSignal<T | undefined>(undefined)
  const [error, setError] = createSignal<Error | undefined>(undefined)
  const [loading, setLoading] = createSignal(false)

  async function refetch() {
    setLoading(true)
    await options
      .queryFn()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }
  onMount(refetch)

  return {
    value,
    error,
    loading,
    refetch,
  }
}

export function useMutation<T, Args extends any[]>(options: { mutationFn: (...args: Args) => Promise<T> }): {
  mutate: (...args: Args) => void
  value: Accessor<T | undefined>
  error: Accessor<Error | undefined>
  loading: Accessor<boolean>
} {
  const [value, setValue] = createSignal<T | undefined>(undefined)
  const [error, setError] = createSignal<Error | undefined>(undefined)
  const [loading, setLoading] = createSignal(false)

  function mutate(...args: Args) {
    setLoading(true)
    options
      .mutationFn(...args)
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  return { mutate, value, error, loading }
}
