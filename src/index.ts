import component from "./WeekTimePicker.vue";
import { PluginObject } from "vue/types";

type WeekTimePicker = typeof component & PluginObject<void>;

const weekTimePicker = component as WeekTimePicker;

weekTimePicker.install = function(Vue) {
  Vue.component(component.name, component);
};

weekTimePicker.version = process.env.VUE_APP_VERSION;

export default weekTimePicker;
