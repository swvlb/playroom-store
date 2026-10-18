import { ActionButton } from '@/ui/ActionButton'

const platformOptions = [
  { value: '', label: 'Все платформы' },
  { value: '4', label: 'PC' },
  { value: '187', label: 'PlayStation 5' },
  { value: '1', label: 'Xbox One' },
  { value: '7', label: 'Nintendo Switch' },
]

export function GameSearch({ phrase, platform, disabled, onPhraseChange, onPlatformChange, onSearch }) {
  function handleFormSubmit(submitEvent) {
    submitEvent.preventDefault()
    onSearch()
  }

  return (
    <form className="game-search" onSubmit={handleFormSubmit}>
      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <input
          aria-label="Поиск игр"
          value={phrase}
          onChange={(changeEvent) => onPhraseChange(changeEvent.target.value)}
          placeholder="Найти игру"
          disabled={disabled}
        />
      </label>

      <select
        aria-label="Выбор платформы"
        value={platform}
        onChange={(changeEvent) => onPlatformChange(changeEvent.target.value)}
        disabled={disabled}
      >
        {platformOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <ActionButton type="submit" disabled={disabled}>
        {disabled ? 'Ищем...' : 'Найти'}
      </ActionButton>
    </form>
  )
}
