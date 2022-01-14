import { PluginObject, Component } from "vue/types";

type WeekTimePicker = Component & PluginObject<void> & { VERSION: string };

declare const weekTimePicker: WeekTimePicker;

export default weekTimePicker;
