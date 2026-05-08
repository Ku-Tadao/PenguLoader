import { Component, JSX, splitProps } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-40',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/85 shadow-sm shadow-emerald-500/10',
        outline: 'border border-white/[0.1] text-foreground/80 hover:bg-white/[0.08] hover:text-foreground hover:border-white/[0.15]',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-11 rounded-lg px-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    }
  }
)

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  variant?: 'default' | 'outline' | 'link'
  size?: 'default' | 'sm' | 'lg'
}

export const Button: Component<Props> = (props) => {
  const [local, rest] = splitProps(props, ['class', 'variant', 'size'])
  return (
    <button
      class={twMerge(buttonVariants({ variant: local.variant, size: local.size }), local.class)}
      {...rest}
    />
  )
}