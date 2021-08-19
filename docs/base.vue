<template>
  <div>
    <week-time-picker v-model="weektime" />
  </div>
</template>

<script>
import WeekTimePicker from "@dmd/week-time-picker";
import "@dmd/week-time-picker/dist/WeekTimePicker.css";

export default {
  components: {
    WeekTimePicker
  },
  data() {
    return {
      weektime: {
        mon: ["07:00-08:00", "16:00-17:00"],
        tue: ["06:00-09:00", "15:00-18:00"],
        wed: ["07:00-08:00", "16:00-17:00"],
        thu: ["11:30-12:30"],
        fri: ["11:30-12:30"],
        sat: ["09:30-10:30", "13:30-14:30"],
        sun: ["10:30-13:30"]
      }
    };
  }
};
</script>
