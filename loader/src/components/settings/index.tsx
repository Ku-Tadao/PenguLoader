import { Component, createMemo, createSignal, For } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { useRoot } from '~/lib/root'

import { TabClient } from './Tab.Client'
import { TabPengu } from './Tab.Pengu'
import { TabAbout } from './Tab.About'

const Tabs: Array<[string, any]> = [
  ['Pengu Loader', TabPengu],
  ['League Client', TabClient],
  ['About', TabAbout],
]

export const Settings: Component = () => {

  const { settings } = useRoot()
  const [tabIndex, setTabIndex] = createSignal(0)

  const currenTab = createMemo(() => Tabs[tabIndex()][1])
  const currenTabName = createMemo(() => Tabs[tabIndex()][0])

  return (
    <div
      class="h-screen fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center aria-hidden:hidden transition-opacity duration-200"
      aria-hidden={!settings.visible()}
    >
      <div data-tauri-drag-region class="absolute top-0 w-full h-10" />
      <div class="border border-white/[0.08] bg-[rgb(var(--card))] rounded-2xl relative flex w-[800px] h-[460px] shadow-2xl shadow-black/40 modal-enter overflow-hidden">

        {/* Close button */}
        <button
          class="absolute top-3 right-3 z-10 flex justify-center items-center size-7 text-white/40 hover:text-white/80
            hover:bg-white/[0.08] rounded-lg transition-all duration-150"
          onClick={settings.hide}
        >
          <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor">
            <polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1" />
          </svg>
        </button>

        {/* Sidebar */}
        <div class="flex flex-col bg-black/20 border-r border-white/[0.04] p-4 w-[210px] py-7">
          <h1 class="text-white/50 text-xs uppercase tracking-widest font-semibold mx-4 mb-5">Settings</h1>
          <nav class="flex flex-col text-sm space-y-0.5">
            <For each={Tabs}>
              {([name], index) => (
                <a
                  class={`relative px-4 py-2 rounded-lg cursor-pointer transition-all duration-150
                    ${tabIndex() === index()
                      ? 'text-white bg-white/[0.08] font-medium'
                      : 'text-white/50 hover:text-white/70 hover:bg-white/[0.04]'
                    }`}
                  onClick={() => setTabIndex(index)}
                >
                  {tabIndex() === index() && (
                    <span class="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-emerald-400 rounded-full" />
                  )}
                  {name}
                </a>
              )}
            </For>
          </nav>
        </div>

        {/* Content */}
        <div class="flex flex-col flex-1 p-5 py-7 pr-2 pb-2">
          <h1 class="text-white/90 text-lg font-semibold mx-4 tracking-tight">{currenTabName()}</h1>
          <div class="flex flex-col mt-4 space-y-2 pl-4 pr-6 pb-4 flex-auto h-0 overflow-y-auto">
            <Dynamic component={currenTab()} />
          </div>
        </div>

      </div>
    </div>
  )
}