import { Component, createSignal } from 'solid-js'
import { Button, ComboBox, Checkbox } from '../components/ui'
import { useI18n } from '../lib/i18n'
import { useConfig } from '../lib/config'
import icon from '../assets/icon.png'

export const WelcomePage: Component<{
  onDone: () => void
}> = (props) => {

  const i18n = useI18n()
  const config = useConfig()
  const [accepted, setAccepted] = createSignal(false)

  const selectLang = async (id: string) => {
    i18n.switchTo(id)
    await config.app.language(id)
  }

  return (
    <div class="flex flex-col justify-center items-center my-auto px-4">
      {/* Glassmorphic card */}
      <div class="relative w-full max-w-sm rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/20 p-8 pt-6">

        {/* Hero icon */}
        <div class="flex justify-center mb-5">
          <div class="relative">
            <div class="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl scale-150" />
            <img src={icon} class="relative size-16 rounded-2xl pointer-events-none" />
          </div>
        </div>

        {/* Welcome heading */}
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold tracking-tight text-foreground/95">{i18n.t('welcome')}</h2>
          <p class="text-sm text-muted-foreground mt-1.5">Pengu Loader</p>
        </div>

        {/* Language selection */}
        <div class="mb-6">
          <p class="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">{i18n.t('choose_lang')}</p>
          <ComboBox
            items={i18n.languages}
            selected={config.app.language()}
            onSelect={selectLang}
          />
        </div>

        {/* Divider */}
        <div class="border-t border-white/[0.06] mb-6" />

        {/* TOS acceptance */}
        <label class="flex gap-3 mb-6 cursor-pointer group">
          <div class="mt-0.5">
            <Checkbox checked={accepted()} onClick={() => setAccepted(v => !v)} />
          </div>
          <div class="flex-1">
            <h2 class="text-sm font-medium leading-tight text-foreground/90 group-hover:text-foreground transition-colors">
              {i18n.t('accept_tos')}
            </h2>
            <p class="text-xs text-muted-foreground mt-1 leading-relaxed">{i18n.t('tos_content')}</p>
          </div>
        </label>

        {/* Get started button */}
        <Button
          class="w-full h-10 font-semibold text-sm shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-shadow duration-300"
          onClick={props.onDone}
          disabled={!accepted()}
        >
          {i18n.t('get_started')}
        </Button>
      </div>
    </div>
  )
}