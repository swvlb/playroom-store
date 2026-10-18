import { ActionButton } from '@/ui/ActionButton'

export function CollectionButton({ gameId, isSaved, onChange }) {
  const buttonText = isSaved ? 'Удалить из коллекции' : 'Добавить в коллекцию'
  const buttonVariant = isSaved ? 'secondary' : 'primary'

  return (
    <ActionButton
      variant={buttonVariant}
      onClick={() => onChange(gameId)}
    >
      {buttonText}
    </ActionButton>
  )
}
