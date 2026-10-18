import axios from 'axios'

const rawgApiKey = import.meta.env.VITE_RAWG_API_KEY

export const rawgClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
})

rawgClient.interceptors.request.use((requestConfig) => {
  if (!rawgApiKey) {
    return Promise.reject(new Error('RAWG_API_KEY_MISSING'))
  }

  requestConfig.params = {
    ...requestConfig.params,
    key: rawgApiKey,
  }

  console.log(`[RAWG] ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`)
  return requestConfig
})
