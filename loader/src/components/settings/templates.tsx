import { children, Component, Show } from 'solid-js'
import { Checkbox, CheckboxProps } from '../ui/Checkbox'
import { RadioButton, RadioButtonProps } from '../ui/RadioButton'

export const OptionSet: Component<{
  name: string
  disabled?: boolean
  children: any
}> = (props) => {
  const c = children(() => props.children)
  return (
    <div class="aria-disabled:pointer-events-none aria-disabled:opacity-50" aria-disabled={props.disabled}>
      <div class="flex items-center gap-2 mb-3">
        <h3 class="font-semibold text-white/40 text-xs uppercase tracking-wider">{props.name}</h3>
        <div class="flex-1 h-px bg-white/[0.05]" />
      </div>
      <div class="space-y-4">
        {c()}
      </div>
    </div>
  )
}

export const CheckOption: Component<CheckboxProps & {
  caption: string
  message?: string
}> = (props) => {
  return (
    <label class="flex mb-3 space-x-3.5 aria-disabled:pointer-events-none aria-disabled:opacity-60 group cursor-pointer" aria-disabled={props.disabled}>
      <div class="mt-0.5">
        <Checkbox {...props} />
      </div>
      <div class="flex flex-col justify-start gap-0.5">
        <h2 class="text-sm text-white/80 group-hover:text-white/95 transition-colors duration-150">{props.caption}</h2>
        <Show when={props.message}>
          <p class="text-white/35 text-xs leading-relaxed">{props.message}</p>
        </Show>
      </div>
    </label>
  )
}

export const RadioOption: Component<RadioButtonProps & {
  caption: string
  message: string
}> = (props) => {
  return (
    <label class="flex mb-3 space-x-3.5 aria-disabled:pointer-events-none aria-disabled:opacity-60 group cursor-pointer" aria-disabled={props.disabled}>
      <div class="mt-0.5">
        <RadioButton {...props} />
      </div>
      <div class="flex flex-col justify-start gap-0.5">
        <h2 class="text-sm text-white/80 group-hover:text-white/95 transition-colors duration-150">{props.caption}</h2>
        <p class="text-white/35 text-xs leading-relaxed">{props.message}</p>
      </div>
    </label>
  )
}