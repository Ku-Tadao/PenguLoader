import { Component } from 'solid-js'

export type RadioButtonProps = {
  checked?: boolean
  disabled?: boolean
  onClick?: () => void
}

export const RadioButton: Component<RadioButtonProps> = (props) => {

  const click = () => {
    if (!props.disabled) {
      props.onClick?.()
    }
  }

  return (
    <button
      role="radio"
      type="button"
      class="shrink-0 size-[15px] flex cursor-default rounded-full border-[1.5px] border-white/20
        transition-all duration-200 ease-out
        hover:border-emerald-400/60 aria-checked:border-emerald-500 aria-checked:bg-emerald-500"
      onClick={click}
      aria-checked={props.checked}
      aria-disabled={props.disabled}
    >
      <span
        class="block mx-auto my-auto rounded-full size-[7px] border-[1.5px] border-white invisible aria-checked:visible
          transition-transform duration-150 aria-checked:scale-100 scale-50"
        aria-checked={props.checked}
      >
      </span>
    </button>
  )
}