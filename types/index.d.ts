import { PluginObject, VueConstructor, Component } from "vue/types";

type WeekTimePicker = Component & PluginObject<void>;

declare const weekTimePicker: WeekTimePicker;

export default weekTimePicker;