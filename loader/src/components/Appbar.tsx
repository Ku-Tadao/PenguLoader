import { Component, createSignal, JSX, onMount, Show, splitProps } from 'solid-js'
import { appWindow } from '@tauri-apps/api/window'
import { twMerge } from 'tailwind-merge'
import { SettingsIcon, StoreIcon } from './Icons'
import { useRoot } from '../lib/root'
import { useTippy } from '../lib/utils'
import icon from '../assets/icon-sm.png'

const Command: Component<JSX.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const [local, rest] = splitProps(props, ['class'])
  return (
    <span
      class={twMerge(
        "flex justify-center items-center w-11 h-full rounded-sm transition-colors duration-150 hover:bg-white/[0.08]",
        local.class
      )}
      {...rest}
    />
  )
}

export const Appbar: Component<{
  isHome: boolean
}> = (props) => {

  const { settings, setStore } = useRoot()
  const [focus, setFocus] = createSignal(true)

  const minimize = () => appWindow.minimize()
  const close = () => {
    if (window.isMac) {
      appWindow.hide()
    } else {
      appWindow.close()
    }
  }

  onMount(async () => {
    setFocus(await appWindow.isFocused())
    appWindow.onFocusChanged(e => setFocus(e.payload))
  })

  return (
    <div
      data-tauri-drag-region
      class="flex items-center justify-between h-11 border-b border-white/[0.06] aria-busy:opacity-70 transition-opacity duration-200 shrink-0"
      aria-busy={!focus()}
    >

      <div class="flex items-center px-3 h-full pointer-events-none gap-2.5">
        <img src={icon} class="size-5 rounded-sm" />
        <span class="text-sm font-medium text-foreground/90 tracking-tight">Pengu Loader</span>
        <span class="text-[11px] text-foreground/40 bg-white/[0.06] px-1.5 py-0.5 rounded-md font-medium leading-none">
          v{window.appVersion}
        </span>
      </div>

      <div class="flex items-center h-full text-foreground/60">
        <Show when={props.isHome}>
          <Command onClick={() => setStore(true)} ref={useTippy('Plugin Hub')}>
            <StoreIcon size={15} />
          </Command>
          <Command onClick={settings.show} ref={useTippy('Settings')}>
            <SettingsIcon size={15} />
          </Command>
        </Show>
        <Command onClick={minimize}>
          <svg width="10" height="10" viewBox="0 0 10.2 1" fill="currentColor">
            <rect x="0" y="50%" width="10.2" height="1" />
          </svg>
        </Command>
        <Command onClick={close} class="hover:!bg-red-500/80 hover:text-white">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1" />
          </svg>
        </Command>
      </div>

    </div>
  )
}
