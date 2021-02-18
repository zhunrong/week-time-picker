import WeekTimePicker from './Picker.vue';
import "ant-design-vue/dist/antd.css";
import {Vue} from 'vue/types/vue'

export {WeekTimePicker}

export default {
  installed: false,
  install(vue: typeof Vue){
    if(this.installed) return;
    vue.component('week-time-picker',WeekTimePicker);
    this.installed=true;
  }
};