export const useSharedStore = () => {
  const getValue = async <T>(key: string): Promise<T[]> => {
    const res = await $fetch<{ key: string; value: T[] }>(`/api/store/${key}`)
    return Array.isArray(res?.value) ? res.value : []
  }

  const setValue = async <T>(key: string, value: T[]) => {
    await $fetch(`/api/store/${key}`, {
      method: "PUT",
      body: { value },
    })
  }

  return { getValue, setValue }
}
