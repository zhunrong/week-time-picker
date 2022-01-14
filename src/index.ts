import component from "./WeekTimePicker.vue";
import { PluginObject, Component } from "vue/types";

type WeekTimePicker = Component & PluginObject<void> & { VERSION: string };

const weekTimePicker = component as WeekTimePicker;

weekTimePicker.install = function(Vue) {
  Vue.component("week-time-picker", component);
};

weekTimePicker.VERSION = process.env.VUE_APP_VERSION;

export default weekTimePicker;
