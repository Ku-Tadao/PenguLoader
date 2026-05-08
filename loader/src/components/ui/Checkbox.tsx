import type { Component } from 'solid-js'

export type CheckboxProps = {
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  onClick?: () => void
}

export const Checkbox: Component<CheckboxProps> = (props) => {

  const click = () => {
    if (!props.disabled) {
      props.onClick?.()
      props.onChange?.(!(props.checked === true))
    }
  }

  return (
    <button
      class="size-[15px] shrink-0 border-[1.5px] border-white/20 flex items-center justify-center rounded-[4px] cursor-default
      transition-all duration-200 ease-out
      hover:border-emerald-400/60 aria-checked:bg-emerald-500 aria-checked:border-emerald-500 aria-checked:scale-105
      disabled:bg-muted disabled:opacity-50 disabled:hover:border-white/20"
      disabled={props.disabled}
      aria-checked={props.checked}
      onClick={click}
    >
      <span
        class="text-white invisible aria-checked:visible transition-transform duration-150 aria-checked:scale-100 scale-50"
        aria-checked={props.checked}
      >
        <svg width="9" height="7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.143 1.433a.5.5 0 0 1 .007.707L4.04 7.346a.5.5 0 0 1-.74-.029L.82 4.355a.5.5 0 0 1 .063-.704l.639-.534a.5.5 0 0 1 .704.062l1.536 1.835L7.842.857A.5.5 0 0 1 8.549.85l.594.583Z" />
        </svg>
      </span>
    </button>
  )
}