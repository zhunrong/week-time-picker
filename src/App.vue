<template>
  <div id="app">
    <WeekTimePicker v-model="weektime" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WeekTimePicker from "@/components/weektime-picker/Picker.vue";

@Component({
  name: "weektime-picker-page",
  components: {
    WeekTimePicker
  }
})
export default class extends Vue {
  weektime = {
    mon: ["08:00-12:00", "14:00-15:30"],
    tue: ["08:00-12:00"],
    wed: ["08:00-12:00"],
    thu: ["08:00-12:00"],
    fri: ["08:00-12:00"],
    sat: ["08:00-12:00"],
    sun: ["08:00-12:00"]
  };
}
</script>

<style lang="scss" scoped>
#app {
  padding: 50px;
}
</style>
