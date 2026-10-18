import { useCallback, useEffect, useState } from 'react'
import { loadGames } from '@/services/gamesService'

export function useGameCatalog(options) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [failureMessage, setFailureMessage] = useState('')

  const repeatRequest = useCallback(async () => {
    setLoading(true)
    setFailureMessage('')

    try {
      const receivedGames = await loadGames(options)
      setGames(receivedGames)
    } catch (requestFailure) {
      if (requestFailure.message !== 'RAWG_API_KEY_MISSING') {
        console.error(requestFailure)
      }

      const message = requestFailure.message === 'RAWG_API_KEY_MISSING'
        ? 'Сервис временно недоступен. Попробуйте позже.'
        : 'Не удалось загрузить каталог. Повторите попытку позже.'

      setFailureMessage(message)
    } finally {
      setLoading(false)
    }
  }, [options])

  useEffect(() => {
    // Запрос к внешнему API запускается при изменении параметров каталога.
    // oxlint-disable-next-line react/set-state-in-effect
    repeatRequest()
  }, [repeatRequest])

  return { games, loading, failureMessage, repeatRequest }
}
