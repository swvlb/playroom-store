import { useState } from 'react'

export function useGameBookmarks() {
  const [savedGameIds, setSavedGameIds] = useState([])

  function switchBookmark(gameId) {
    setSavedGameIds((currentGameIds) => (
      currentGameIds.includes(gameId)
        ? currentGameIds.filter((savedId) => savedId !== gameId)
        : [...currentGameIds, gameId]
    ))
  }

  return { savedGameIds, switchBookmark }
}
