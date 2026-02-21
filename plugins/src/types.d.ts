// internal types

interface Plugin {
  init?: (context: PluginContext) => any
  load?: () => any
  default?: Function | any
}

interface RcpAnnouceEvent extends CustomEvent {
  errorHandler: () => any
  registrationHandler: (registrar: (e) => Promise<any>) => Promise<any> | void
}

// built-in types

interface Action {
  id?: string
  name: string | (() => string)
  legend?: string | (() => string)
  tags?: string[]
  icon?: string
  group?: string | (() => string)
  hidden?: boolean
  perform?: (id?: string) => any
}

interface CommandBar {
  /**
   * Add a new action item to the Command Bar. It will automatically update even when showing.
   * 
   * #### Params
   * - `action`: An object that describes action information with these properties
   * 
   * ```ts
   * interface Action {
   *   id?: string       // (optional) an unique idetifier for the action
   *   name: string      // action's name
   *   legend?: string   // (optional) action's note/legend or shortcut key
   *   tags?: string[]   // (optional) tags or keywords to search
   *   icon?: string     // (optional) <svg> HTML tag in string
   *   group?: string    // (optional) group name
   *   hidden?: boolean  // (optional) hide the action, except for search results
   *   perform?: (id?: string) => any  // called when the action is executed 
   * }
   * ```
   * 
   * @since v1.1.0
   */
  addAction: (action: Action) => void

  /**
   * Show the Command Bar programmatically if it was hidden.
   * 
   * @since v1.1.0
   */
  show: () => void

  /**
   * Manually trigger the Command Bar to update its items.
   * Only use this function if your added actions are not updating.
   * 
   * @since v1.1.0
   */
  update: () => void
}

interface Toast {
  /**
   * Push a simple notification with a success checkmark.
   * 
   * Params:
   * - `message` a string to be shown on the notification.
   * 
   * @since v1.1.0
   * @example
   * ```ts
   * Toast.success('Welcome to my theme!')
   * ```
   */
  success: (message: string) => void

  /**
   * Push a simple notification with a failure icon.
   * 
   * Params:
   * - `message` a string to be shown on the notification.
   * 
   * @since v1.1.0
   * @example
   * ```ts
   * Toast.error('Oops! Something went wrong.')
   * ```
   */
  error: (message: string) => void

  /**
   * Push a progress notification and wait for the given promise to complete.
   * This function returns the given promise that is helpful for then/catch chain.
   * 
   * Params:
   * - `promise` a promise that the progress waits for.
   * - `msg` an object with these properties:
   *   - `loading` a string message to be shown when the progress starts loading.
   *   - `success` a string to be shown when the promise is resolved.
   *   - `error` a string to be shown when the promise is rejected.
   * 
   * @since v1.1.0
   * @example
   * ```ts
   * let myTask = new Promise((resolve, reject) => {
   *   // wait for 3s then fulfill randomly
   *   setTimeout(() => {
   *     if (Math.random() > 0.5)
   *       resolve(10)
   *     else
   *       reject()
   *   }, 3000)
   * })
   * 
   * Toast.promise(myTask, {
   *   loading: 'Working in progress...',
   *   success: 'Oh nice! 😎',
   *   error: 'OOps! 😥'
   * })
   * ```
   */
  promise: <T>(
    promise: Promise<T>,
    msg: { loading: string, success: string, error: string }
  ) => Promise<T>
}

interface DataStore {
  /**
   * This function returns a boolean indicating whether data with the specified key exists or not.
   * 
   * @since v1.0.1
   * @example
   * ```js
   * console.log(DataStore.has('my_num'))
   * console.log(DataStore.has('key-does-not-exist'))
   * ```
   */
  has: (key: string) => boolean

  /**
   * Retrieve your stored data with a given key. If the key does not exist, it will return `undefined`.
   * 
   * Since **v1.0.5**, you can set fallback value for non-existent keys.
   * 
   * @since v1.0.1
   * @example
   * ```js
   * console.log(DataStore.get('my_str'))
   * // some string
   * console.log(DataStore.get('key-does-not-exist'))
   * // undefined
   * 
   * console.log(DataStore.get('key-does-not-exist', 1000))
   * // 1000
   * ```
   */
  get: <T>(key: string, fallback?: T) => T | undefined

  /**
   * Call this function to store your data with a given key.
   * 
   * Parameters:
   * - `key` (required) Keys should be string or number.
   * - `value` (required) Value may be string, number, boolean, null or collection like array and object. Actually, it will be stored as JSON format, so any value like function and runtime object are ignored.
   * 
   * Returns:
   * - A boolean value that indicates your key is valid and the data is stored successfully.
   * 
   * @since v1.0.1
   * @example
   * ```js
   * let my_num = 10
   * let my_str = 'hello'
   * DataStore.set('my_num', my_num)
   * DataStore.set('my_str', my_str)
   * ```
   * 
   * ::: tip Unique keys
   * 
   * You should use unique names for keys, do not use common names, e.g `access_token`, `is_logged`, etc. Other plugins can override your data, you can add prefix to your keys.
   * 
   * :::
   */
  set: (key: string, value: any) => boolean

  /**
   * This function removes the specified data from storage by key, returns true if the existing key-value pair has been removed.
   * 
   * @since v1.0.1
   * @example
   * ```js
   * DataStore.remove('some-key')
   * DataStore.has('some-key') // -> false
   * ```
   */
  remove: (key: string) => boolean
}

interface ApplyEffectFn {
  (type: 'transparent' | 'blurbehind' | 'acrylic' | 'unified', options?: { color: string }): void
  (type: 'mica', options?: { material?: 'auto' | 'mica' | 'acrylic' | 'tabbed' }): void
  (type: 'vibrancy', options: { material: string, alwaysOn?: boolean }): void
}

interface Effect {
  /**
   * A function that takes the name of the desired effect name and an optional object.
   * It returns a boolean indicating whether the effect was successfully applied or not.
   * 
   * Parameters:
   * - `name` [required] These effect names above to be applied, in string.
   * - `options` [optional] Additional options for the effect, `acrylic`, `unified` and `blurbehind` could have tint color, but `mica` will ignore this options.
   * 
   * This function returns `false` if the effect could not be applied, see the [System compatibility](#system-compatibility) below.
   * 
   * @since v1.0.1
   * @example
   * ```js
   * // enable acrylic on Windows 10
   * Effect.apply('acrylic')
   * 
   * // with a tint color
   * Effect.apply('unified', { color: '#4446' })
   * 
   * // mica on windows 11, no options needed
   * Effect.apply('mica')
   * ```
   * 
   * ::: info
   * 
   * Tint colors must be in CSS hex color format, e.g. #RGB, #RGBA, #RRGGBB, #RRGGBBAA.
   * 
   * To see transparency effect correctly, you should remove all lowest backgrounds.
   * 
   * :::
   */
  apply: ApplyEffectFn

  /**
   * A function that clears any currently applied effect, then the Client background will be black.
   * Using `Effect.current` after clearing will give you `undefined`.
   * 
   * @since v1.0.1
   * @example
   * ```js
   * // just clear applied effect, even if nothing applied
   * Effect.clear()
   * ```
   */
  clear: () => void

  /**
   * Set the window theme to light or dark.
   * 
   * @since v1.1.0
   */
  setTheme: (theme: 'light' | 'dark') => void
}

interface Pengu {
  /**
   * A read-only property that returns the current version of Pengu Loader.
   * 
   * @since v1.1.0
   * @example
   * ```js
   * console.log(Pengu.version)
   * // 1.0.6
   * ```
   */
  version: string

  /**
   * A boolean value that indicates the **Super Low Spec Mode** is enabled or not.
   * 
   * @since v1.1.0
   * @example
   * ```js
   * console.log(Pengu.superPotato)
   * // true
   * ```
   */
  superPotato: boolean

  /**
   * An array of plugin entries.
   * 
   * @since v1.1.0
   * @example
   * ```js
   * console.log(Pengu.plugins)
   * // [ '@default/index.js', 'your-plugin/index.js' ]
   * ```
   */
  plugins: string[]

  /**
   * A boolean value that indicates whether the current platform is macOS.
   * 
   * @since v1.1.2
   * @example
   * ```js
   * if (Pengu.isMac) {
   *   console.log('Running on macOS')
   * }
   * ```
   */
  isMac: boolean
}

interface Rcp {
  /**
   * Register a callback that will be triggered before the target plugin loads.
   * 
   * ### Params
   * - `name` - RCP name, should be prefixed with `rcp-`.
   * - `callback` - A function will be triggered before the plugin loads.
   * 
   * You can delay the plugin loads by blocking your async callback.
   * 
   * @since v1.1.0
   * @example
   * ```js
   * rcp.preInit('rcp-name', (context) => {
   *   // do something
   * })
   * 
   * rcp.preInit('rcp-name', async () => {
   *   // delay 2 seconds
   *   await new Promise(r => setTimeout(r, 2000))
   * })
   * ```
   * 
   * ::: warning
   * 
   * Do not pre-hook `rcp-fe-commom-libs`. It is used for the plugin loader, so your callbacks sometimes will not triggered.
   * 
   * :::
   */
  preInit: (name: string, callback: Function) => void

  /**
   * Register a callback that will be triggered after the target plugin is loaded. Gives you an opportunity to access the plugin API.
   * 
   * ### Params
   * - `name` - RCP name, should be prefixed with `rcp-`.
   * - `callback` - A function will be triggered after the plugin is loaded.
   * - `blocking` - A boolean value indicating whether this callback will be executed in blocking way. It's `false` by default.
   * 
   * @since v1.1.0
   * @example
   * ```js
   * rcp.postInit('rcp-name', (api) => {
   *   // do something
   *   console.log('got rcp-name:', api)
   * })
   * ```
   * 
   * ::: tip
   * 
   * `postInit` and `preInit` should be called before the target plugin loads, preferably witin your plugin's `init` entry. So they will not work after the plugin is loaded.
   * 
   * :::
   */
  postInit: (name: string, callback: Function, blocking?: boolean) => void

  /**
   * This function works as same as `postInit` but allows you to get the target plugin asynchronously and also works even after the plugin is loaded.
   * 
   * @since v1.1.0
   * @example
   * ```js
   * const uikit = await rcp.whenReady('rcp-fe-lol-uikit')
   * ```
   */
  whenReady: (name: string) => Promise<any>
}

interface EventData {
  data: any
  uri: string
  eventType: 'Create' | 'Update' | 'Delete'
}

interface ApiListener {
  (message: EventData): void
}

interface Socket {
  /**
   * Subscribe a listener to listen when the given API endpoint get called.
   * 
   * ### Params:
   * - `api` a string that presents a LCU API endpoint.
   * - `listener` a function that gets called with one data param.
   * 
   * ### Return value:
   * An object with a prop `disconnect` that could be called to disconnect the observer.
   * 
   * @since v1.1.0
   * @example
   * ```js
   * socket.observe('/lol-matchmaking/v1/ready-check', (data) => {
   *   doAcceptReadyCheck()
   * })
   * ```
   */
  observe: (api: string, listener: ApiListener) => { disconnect: () => void }

  /**
   * Disconnect a subscribed listener. The function parameters like the function above.
   * 
   * @since v1.1.0
   */
  disconnect: (api: string, listener: ApiListener) => void
}

interface PluginContext {
  rcp: Rcp
  socket: Socket
}

interface FileStat {
  fileName: string
  // 0 if isDir is true
  length: number
  isDir: boolean
}

interface PluginFS {
  /**
   * Read a file in text mode.
   * 
   * ### Params
   * - `path` - The path of the file you want to access with respect to the plugin root directory.
   * 
   * ### Return value
   * A `Promise` of the content string on success.
   * A `Promise` of `undefined` on failure.
   * 
   * @since v1.1.0
   * @deprecated
   * @example
   * ```javascript
   * PluginFS.read("./index.js").then( content => {
   *     console.log(content)
   * })
   * 
   * const content = await PluginFs.read("./README.md")
   * ```
   */
  read: (path: string) => Promise<string | undefined>

  /**
   * Write to a file in text mode.
   * 
   * ### Params
   * - `path` - The path of the file you want to access with respect to the plugin root directory.
   * - `content` - The content string you want to write into.
   * - `enableAppendMode` - Append to file if set to `true` or overwrite file if `false`. This is `false` by default.
   * 
   * ### Return value
   * A `Promise` of a boolean result indicating success or failure.
   * 
   * @since v1.1.0
   * @deprecated
   * @example
   * ```javascript
   * // Create test.txt and write "Hello" into it
   * PluginFS.write("./test.txt","Hello").then( result => {
   *     if(result){
   *         // success
   *     }else{
   *         // fail
   *     }
   * })
   * 
   * // Appending " World!" to it 
   * const result = await PluginFs.write("./test.txt"," World!",true)
   * ```
   * 
   * ::: tip
   * 
   * This API can create a file but can't create a file under a non-existing directory.
   * 
   * :::
   */
  write: (path: string, content: string, enableAppendMode?: boolean) => Promise<boolean>

  /**
   * Create directories recursively.
   * 
   * ### Params
   * `path` - The directory path you want to create with respect to the plugin root directory.
   * 
   * ### Return Value
   * A `Promise` of a boolean result indicating success or failure.
   * 
   * @since v1.1.0
   * @deprecated
   * @example
   * ```javascript
   * const bMkdir0 = await PluginFS.mkdir("utils")
   * const bMkdir1 = await PluginFS.mkdir("/a/b")
   * const bMkdir2 = await PluginFS.mkdir("/a\\c")
   * // false because it already exists
   * const bMkdir3 = await PluginFS.mkdir("a\\b/")
   * ```
   */
  mkdir: (path: string) => Promise<boolean>

  /**
   * Get the status of a file.
   * 
   * ### Params
   * - `path` - The file path with respect to the plugin root directory.
   * 
   * ### Return value
   * A `Promise` of `FileStat` or `undefined` depending on success or failure.
   * 
   * @since v1.1.0
   * @deprecated
   * @example
   * ```javascript
   * const stat1 = await PluginFS.stat("a/b")
   * if(stat1){
   *     console.log("it's a directory")
   * }
   * const stat2 = await PluginFS.stat("a/random.js")
   * ```
   */
  stat: (path: string) => Promise<FileStat | undefined>

  /**
   * List files and directories under given path. 
   * 
   * ### Params
   * - `path` - The directory path with respect to the plugin root directory.
   * 
   * ### Return value
   * A `Promise` of `Array` of file name strings on success.
   * A `Promise` of `undefined` on failure.
   * 
   * @since v1.1.0
   * @deprecated
   */
  ls: (path: string) => Promise<string[] | undefined>

  /**
   * Remove file/directories.
   * 
   * Just like `rm` command in Unix-like systems.
   * 
   * ### Params
   * - `path` - The file/directory path with respect to the plugin root directory.
   * - `recursively` - Delete all files/directories under the give path recursively. This is `false` by default.
   * 
   * ### Return value
   * A `Promise` of a `number` showing how many files and directories is deleted.
   * When deleting with `recursively` set to `true`, the number value is sum of deleted `directories` and `files`.
   * 
   * @since v1.1.0
   * @deprecated
   * @example
   * ```javascript
   * // 1
   * const bRm1 = await PluginFS.rm("./empty-dir")
   * // 1
   * const bRm2 = await PluginFS.rm("./random-file-under-plugin-root")
   * 
   * // bRm3 == 0 because it's not empty
   * const bRm3 = await PluginFS.rm("./non-empty-dir")
   * // bRm4 >= 1 with recursively set to true
   * const bRm4 = await PluginFS.rm("./non-empty-dir",true)
   * ```
   * 
   * ::: danger
   * 
   * You should know what you are doing when using this.
   * 
   * :::
   */
  rm: (path: string, recursively?: boolean) => Promise<number>
}

// globals

declare interface Window {

  DataStore: DataStore;
  CommandBar: CommandBar;
  Toast: Toast;
  Effect: Effect;
  PluginFS: PluginFS;

  Pengu: Pengu;
  rcp: Rcp;

  os: {
    name: 'win' | 'mac'
    version: string
    build: string
  };

  /**
   * Call this function to open the built-in Chrome DevTools window.
   * 
   * @since v0.1
   * @example
   * ```js
   * window.openDevTools()     // built-in DevTools
   * window.openDevTools(true) // remote DevTools
   * ```
   */
  openDevTools: (remote?: boolean) => void;

  /**
   * Call this function to open the plugins folder in new File Explorer window.
   * 
   * If `path` is given, it will open the path with respect to the plugins folder.
   * 
   * @since v0.6
   * @example
   * ```js
   * window.openPluginsFolder()
   * window.openPluginsFolder("/plugin-demo/config")
   * ```
   */
  openPluginsFolder: (subdir?: string) => void;

  /**
   * Call this function to reload the Client and ignore caching.
   * 
   * @since v1.0.4
   * @example
   * ```js
   * window.reloadClient()
   * ```
   */
  reloadClient: () => void;

  /**
   * Call this function to restart the Client (entire the UX processes).
   * 
   * @since v1.0.5
   * @example
   * ```js
   * window.restartClient()
   * ```
   */
  restartClient: () => void;

  /**
   * Call this function get the current script path.
   * 
   * @since v1.1.0
   * @example
   * ```js
   * // https://plugins/your-plugin/index.js
   * window.getScriptPath()
   * ```
   */
  getScriptPath: () => string | undefined;

  /**
   * This property returns the current version of Pengu Loader.
   * 
   * @since v1.0.1
   * @deprecated
   * @example
   * ```js
   * console.log(window.__llver) // 0.6.0
   * console.log(`You are using Pengu Loader v${window.__llver}`)
   * ```
   * 
   * ::: tip
   * 
   * Since v1.1.0, this property has been deprecated.
   * Please use `Pengu.version` instead.
   * 
   * :::
   */
  __llver: string;
}