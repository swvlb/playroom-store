import { useState } from 'react'
import { GameGallery } from '@/ui/GameGallery'
import { GameSearch } from '@/ui/GameSearch'
import { ActionButton } from '@/ui/ActionButton'
import { useGameBookmarks } from '@/state/useGameBookmarks'
import { useGameCatalog } from '@/state/useGameCatalog'
import './App.css'

function App() {
  const [searchText, setSearchText] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [catalogOptions, setCatalogOptions] = useState({ title: '', platform: '' })

  const { savedGameIds, switchBookmark } = useGameBookmarks()
  const { games, loading, failureMessage, repeatRequest } = useGameCatalog(catalogOptions)

  function submitGameSearch() {
    const nextOptions = {
      title: searchText.trim(),
      platform: selectedPlatform,
    }

    if (nextOptions.title === catalogOptions.title && nextOptions.platform === catalogOptions.platform) {
      repeatRequest()
      return
    }

    setCatalogOptions(nextOptions)
  }

  return (
    <div className="storefront">
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand__sign">P</span>
          PLAYROOM
        </a>
        <p>В коллекции: {savedGameIds.length}</p>
      </header>

      <main className="store-content" id="top">
        <section className="catalog-header">
          <div>
            <p className="eyebrow">Игровая витрина</p>
            <h1>Найди новую игру</h1>
          </div>

          <GameSearch
            phrase={searchText}
            platform={selectedPlatform}
            disabled={loading}
            onPhraseChange={setSearchText}
            onPlatformChange={setSelectedPlatform}
            onSearch={submitGameSearch}
          />
        </section>

        {loading && <p className="status-card">Загружаем игры...</p>}

        {!loading && failureMessage && (
          <section className="status-card">
            <p>{failureMessage}</p>
            <ActionButton onClick={repeatRequest}>Попробовать снова</ActionButton>
          </section>
        )}

        {!loading && !failureMessage && (
          <GameGallery
            games={games}
            savedGameIds={savedGameIds}
            onBookmarkChange={switchBookmark}
          />
        )}
      </main>

      <footer>
        Данные предоставлены <a href="https://rawg.io/" target="_blank" rel="noreferrer">RAWG</a>
      </footer>
    </div>
  )
}

export default App
