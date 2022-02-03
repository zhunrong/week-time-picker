<template>
  <div id="app">
    <week-time-picker v-model="weektime" />
    <div style="max-width: 400px; margin-top: 50px">
      <week-time-picker v-model="weektime" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      weektime: {
        mon: ["08:00-12:00", "14:00-18:30"],
        tue: ["08:00-12:00"],
        wed: ["08:00-12:00"],
        thu: ["08:00-12:00"],
        fri: ["08:00-12:00"],
        sat: ["08:00-12:00"],
        sun: ["08:00-12:00"],
      },
    };
  },
});
</script>