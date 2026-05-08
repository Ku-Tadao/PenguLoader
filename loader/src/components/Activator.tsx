import { Component, createSignal, onMount } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { CoreModule } from '../lib/core-module'
import { dialog, event } from '@tauri-apps/api'
import { BoltIcon, PowerIcon } from './Icons'

export const Activator: Component = () => {

  const [loading, setLoading] = createSignal(true)
  const [active, setActive] = createSignal(false)

  const activate = async () => {
    if (!loading()) {
      setLoading(true)

      try {
        if (!await CoreModule.checkLeagueDir()) {
          await dialog.message('Please select a valid LoL Client folder in Settings.', { type: 'warning' })
          return
        }

        if (!await CoreModule.exists()) {
          await dialog.message('Failed to perform activation, the core module is not found.', { type: 'warning' })
          return
        }

        const nextActive = !active()
        const { activated, error } = await CoreModule.doActivate(nextActive)

        if (error) {
          await dialog.message(`Failed to perform activation, got error:\n${error}`, { type: 'warning' })
        } else if (activated === nextActive) {
          setActive(activated)
        }
      }
      finally {
        setLoading(false)
      }
    }
  }

  onMount(async () => {
    setActive(await CoreModule.isActivated())
    setLoading(false)

    if (window.isMac) {
      event.listen('active-status', (e) => {
        setActive(Boolean(e.payload))
      })
    }
  })

  return (
    <div
      class="fixed bottom-5 right-0 z-10 translate-x-[7.5rem] hover:translate-x-0 transition-transform duration-300 ease-out"
    >
      <div
        class={`flex items-center justify-between pl-3.5 w-44 h-[3.25rem] rounded-l-full
          border border-white/[0.08] border-r-0 cursor-pointer
          shadow-xl shadow-black/20 backdrop-blur-sm
          transition-all duration-300 ease-out group
          ${active()
            ? 'bg-emerald-500/90 hover:bg-emerald-500 activator-glow'
            : 'bg-[rgb(var(--card))]/80 hover:bg-[rgb(var(--card))]'
          }
          ${loading() ? 'pointer-events-none opacity-60' : ''}
        `}
        onClick={activate}
      >
        <div
          class={`flex items-center justify-center size-8 rounded-full transition-colors duration-200
            ${active()
              ? 'text-white/90 bg-white/[0.15]'
              : 'text-emerald-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-300'
            }`}
        >
          <span class="group-hover:scale-110 transition-transform duration-200 inline-flex">
            <Dynamic component={active() ? BoltIcon : PowerIcon} thickness={2.5} size={18} />
          </span>
        </div>
        <div
          class={`flex-1 px-5 text-center font-bold text-sm tracking-wider
            ${active() ? 'text-white' : 'text-emerald-400'}`}
        >
          {active() ? 'READY' : 'Activate'}
        </div>
      </div>
    </div>
  )
}