/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import { loadFonts } from './webfontloader'


export async function registerPlugins (app) {
  await loadFonts();

  app
    .use(vuetify)
    .use(router)
}
