export function ActionButton({ children, variant = 'primary', ...buttonProperties }) {
  return (
    <button
      className={`action-button action-button--${variant}`}
      type="button"
      {...buttonProperties}
    >
      {children}
    </button>
  )
}
