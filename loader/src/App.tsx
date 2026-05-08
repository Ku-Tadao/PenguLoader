import { createSignal, onMount, Show } from 'solid-js'
import { Config } from './lib/config'
import { WelcomePage } from './pages/WelcomePage'
import { Appbar } from './components/Appbar'
import { MainPage } from './pages/MainPage'

import './App.css'
import 'tippy.js/dist/tippy.css'

function App() {
  const [ready, setReady] = createSignal(false)
  const [welcome, setWelcome] = createSignal(true)

  onMount(async () => {
    setWelcome(!await Config.load())
    setReady(true)
  })

  return (
    <div class="h-screen flex flex-col relative overflow-hidden">
      {/* Ambient background glow */}
      <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div class="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20
          bg-[radial-gradient(circle,rgba(34,197,94,0.25)_0%,transparent_70%)] blur-[100px]" />
        <div class="absolute -bottom-48 -right-24 w-[400px] h-[400px] rounded-full opacity-15
          bg-[radial-gradient(circle,rgba(16,185,129,0.3)_0%,transparent_70%)] blur-[120px]" />
        <div class="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-10
          bg-[radial-gradient(circle,rgba(52,211,153,0.2)_0%,transparent_70%)] blur-[80px]" />
      </div>

      <Show when={ready()}>
        <div class="flex flex-col flex-1 relative z-10 app-enter">
          <Appbar isHome={!welcome()} />
          <Show
            when={!welcome()}
            fallback={<WelcomePage onDone={() => setWelcome(false)} />}
          >
            <MainPage />
          </Show>
        </div>
      </Show>
    </div>
  )
}

export default App