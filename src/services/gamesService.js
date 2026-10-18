import { rawgClient } from '@/services/rawgClient'

export async function loadGames({ title, platform }) {
  const requestParameters = {
    search: title || undefined,
    platforms: platform || undefined,
    page_size: 12,
    ordering: title ? '-rating' : '-added',
  }

  const response = await rawgClient.get('/games', {
    params: requestParameters,
  })

  return response.data.results
}
