import Vue from 'vue'
import store from './LightboxStore'

Vue.directive('lightbox', {
  bind (el, binding) {
    console.log('binding')
    store.addImage(el.getAttribute('href'))
    el.addEventListener('click', function (e) {
      e.preventDefault()
      // on doit ouvrir l'image
      store.open(el.getAttribute('href'))
    })
  },
  unbind (el) {
    console.log('unbind')
    store.remove(el.getAttribute('href'))
  }
})
