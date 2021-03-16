import _WeekTimePicker from "./WeekTimePicker.vue";
import { PluginObject, VueConstructor, Component } from "vue/types";

type WeekTimePicker = Component & PluginObject<void>;

(_WeekTimePicker as WeekTimePicker).install = function(Vue: VueConstructor) {
  Vue.component("week-time-picker", _WeekTimePicker);
};

export default _WeekTimePicker as WeekTimePicker;
