import * as bootstrap from 'bootstrap'
const { Modal, Collapse } = bootstrap

// 透過 Provider 做全域設定注入 NuxtApp
export default defineNuxtPlugin(_nuxtApp => {
  return {
    provide: {
      bootstrap: {
        modal: element => new Modal(element),
        collapse: element => new Collapse(element)
      }
    }
  }
})