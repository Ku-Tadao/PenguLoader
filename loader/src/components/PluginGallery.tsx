import { Component, For, createSignal, onMount, Switch, Match, Show, createEffect } from 'solid-js'
import { type PluginInfo, PluginManager } from '../lib/plugins'
import { LoaderIcon, ReloadIcon, StoreIcon } from './Icons'
import { Checkbox } from './ui'
import { useConfig } from '~/lib/config'
import { useRoot } from '~/lib/root'

const PluginCard: Component<PluginInfo> = (props) => {
  const [enabled, setEnabled] = createSignal(PluginManager.isEnabled(props.hash))
  const toggle = () => {
    PluginManager.toggleState(props.hash).then(setEnabled)
  }
  return (
    <label
      draggable="false"
      class="flex flex-col gap-2 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.025]
        hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-200 group cursor-pointer"
    >
      <div class="flex flex-col p-3.5 gap-2.5 items-stretch">
        <div class="flex items-center space-x-2.5">
          <Checkbox checked={enabled()} onClick={toggle} />
          <h3 class="font-semibold leading-6 text-sm text-foreground/90 text-ellipsis whitespace-nowrap overflow-hidden
            group-hover:text-foreground transition-colors duration-150">
            {props.name}
          </h3>
        </div>
        <div class="text-xs leading-5 text-muted-foreground/70 break-words font-mono">@plugins/{props.path}</div>
      </div>
    </label>
  )
}

export const PluginGallery: Component = () => {

  const config = useConfig()
  const { setStore } = useRoot()

  const [loading, setLoading] = createSignal(false)
  const [plugins, setPlugins] = createSignal(Array<PluginInfo>(), { equals: false })

  const revealPlugins = () => {
    PluginManager.openFolder()
  }

  const reload = () => {
    setPlugins([])
    setLoading(true)

    Promise.all([
      PluginManager.getPlugins()
        .then(setPlugins)
        .catch(() => { }),
      new Promise((r) => setTimeout(r, 500))
    ])
      .finally(() => setLoading(false))
  }

  onMount(reload)
  createEffect(() => {
    // watch the dir changes
    config.app.plugins_dir()
    reload()
  })

  return (
    <div class="h-full">
      <Switch>
        <Match when={loading()}>
          <div class="text-muted-foreground m-auto flex flex-col items-center justify-center gap-3 h-full">
            <LoaderIcon class="animate-spin opacity-60" />
            <p class="text-sm">Loading plugins…</p>
          </div>
        </Match>
        <Match when={!loading()}>
          <div class="grid p-4 pt-3">
            {/* Section header */}
            <div class="flex items-center gap-2 mb-4">
              <h1 class="text-foreground/70 text-sm font-medium">Installed plugins</h1>
              <span class="text-[11px] text-muted-foreground bg-white/[0.06] px-1.5 py-0.5 rounded-md font-medium leading-none">
                {plugins().length}
              </span>
            </div>

            <Show
              when={plugins().length > 0}
              fallback={
                <div class="flex flex-col items-center justify-center py-16 gap-4">
                  <div class="size-12 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-muted-foreground/50">
                    <StoreIcon size={20} />
                  </div>
                  <div class="text-center space-y-1.5">
                    <h3 class="text-foreground/70 font-medium text-sm">No plugins installed</h3>
                    <p class="text-muted-foreground text-xs">Add plugins to customize your League Client</p>
                  </div>
                </div>
              }
            >
              <div class="grid grid-cols-3 gap-3 mb-4">
                <For each={plugins()}>
                  {plugin => <PluginCard {...plugin} />}
                </For>
              </div>
            </Show>

            {/* Action buttons */}
            <div class="flex items-center justify-center gap-2 pt-6 pb-4 border-t border-white/[0.04]">
              <button
                class="inline-flex gap-1.5 items-center text-xs text-muted-foreground border border-white/[0.08] rounded-lg px-3 py-1.5
                  hover:bg-white/[0.06] hover:text-foreground/80 hover:border-white/[0.12] transition-all duration-150"
                tabIndex={-1}
                onClick={reload}
              >
                <ReloadIcon size={12} /> Reload
              </button>
              <button
                class="inline-flex gap-1.5 items-center text-xs text-muted-foreground border border-white/[0.08] rounded-lg px-3 py-1.5
                  hover:bg-white/[0.06] hover:text-foreground/80 hover:border-white/[0.12] transition-all duration-150"
                tabIndex={-1}
                onClick={revealPlugins}
              >
                Open folder
              </button>
              <button
                class="inline-flex gap-1.5 items-center text-xs text-muted-foreground border border-white/[0.08] rounded-lg px-3 py-1.5
                  hover:bg-white/[0.06] hover:text-foreground/80 hover:border-white/[0.12] transition-all duration-150"
                tabIndex={-1}
                onClick={() => setStore(true)}
              >
                <StoreIcon size={12} /> Plugin Hub
              </button>
            </div>
          </div>
        </Match>
      </Switch>
    </div>
  )
}
