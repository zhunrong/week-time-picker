import { PluginObject, VueConstructor } from "vue/types";

type WeekTimePicker = VueConstructor & PluginObject<void>;

declare const weekTimePicker: WeekTimePicker;

export default weekTimePicker;
