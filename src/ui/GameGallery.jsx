import { CollectionButton } from '@/ui/CollectionButton'

function collectGenres(game) {
  return game.genres?.length
    ? game.genres.slice(0, 2).map((genre) => genre.name).join(' · ')
    : 'Жанр не указан'
}

function showReleaseYear(date) {
  return date ? new Date(date).getFullYear() : 'Скоро'
}

export function GameGallery({ games, savedGameIds, onBookmarkChange }) {
  if (games.length === 0) {
    return <p className="status-card">По вашему запросу ничего не найдено.</p>
  }

  const mainGame = games[0]
  const mainGameSaved = savedGameIds.includes(mainGame.id)

  return (
    <>
      <article
        className="main-game"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(8, 8, 10, .94), rgba(8, 8, 10, .15)), url(${mainGame.background_image})` }}
      >
        <div className="main-game__content">
          <p className="main-game__label">Рекомендуем</p>
          <h2>{mainGame.name}</h2>
          <p>{collectGenres(mainGame)} · {showReleaseYear(mainGame.released)}</p>
          <p className="main-game__rating">Рейтинг: ★ {mainGame.rating || '—'}</p>
          <CollectionButton
            gameId={mainGame.id}
            isSaved={mainGameSaved}
            onChange={onBookmarkChange}
          />
        </div>
      </article>

      <section className="games-section">
        <div className="section-heading">
          <h2>Популярные игры</h2>
          <p>Найдено: {games.length}</p>
        </div>

        <div className="game-gallery">
          {games.map((game) => {
            const saved = savedGameIds.includes(game.id)

            return (
              <article className="game-card" key={game.id}>
                <div className="game-card__picture">
                  {game.background_image ? (
                    <img src={game.background_image} alt={`Обложка игры ${game.name}`} />
                  ) : (
                    <span>Нет изображения</span>
                  )}
                </div>

                <div className="game-card__body">
                  <p>{collectGenres(game)}</p>
                  <h3>{game.name}</h3>
                  <div className="game-card__details">
                    <span>{showReleaseYear(game.released)}</span>
                    <span>★ {game.rating || '—'}</span>
                  </div>
                  <CollectionButton
                    gameId={game.id}
                    isSaved={saved}
                    onChange={onBookmarkChange}
                  />
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
