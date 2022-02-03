import Vue from 'vue';
import App from './App.vue';
import plugin from '@package';

Vue.use(plugin);

new Vue({
  render: h => h(App)
}).$mount('#app')
