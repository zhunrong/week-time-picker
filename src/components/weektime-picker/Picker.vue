<template>
  <div class="period-picker">
    <div class="time-tick">
      <ul>
        <li>00:00</li>
        <li>03:00</li>
        <li>06:00</li>
        <li>09:00</li>
        <li>12:00</li>
        <li>15:00</li>
        <li>18:00</li>
        <li>21:00</li>
      </ul>
    </div>
    <div class="everyday">
      <PeriodDay :day="everyDay" @update="onUpdate" />
    </div>
    <div class="week">
      <PeriodDay
        v-for="(day, key) in weekArr"
        :key="key"
        :day="day"
        @update="onUpdate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import PeriodDay from "./Day.vue";
import { Day } from "./utils";

@Component({
  name: "weektime-picker",
  components: {
    PeriodDay
  }
})
export default class extends Vue {
  @Prop() value: Record<string, string[]>;

  everyDay = new Day("每天");
  week: Record<string, Day> = {
    mon: new Day("周一"),
    tue: new Day("周二"),
    wed: new Day("周三"),
    thu: new Day("周四"),
    fri: new Day("周五"),
    sat: new Day("周六"),
    sun: new Day("周日")
  };

  get weekArr() {
    return ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(
      key => this.week[key]
    );
  }

  created() {
    this.initModel();
  }

  @Watch("value")
  initModel() {
    Object.keys(this.week).forEach(key => {
      this.week[key].init(this.value ? this.value[key] : []);
    });
    if (this.isEveryDaySame()) {
      this.everyDay.copyPeriodsFrom(this.week.mon);
    } else {
      this.everyDay.init();
    }
  }

  onUpdate(day: Day) {
    if (day.label === "每天") {
      Object.keys(this.week).forEach(key => {
        this.week[key].copyPeriodsFrom(day);
      });
    } else if (this.isEveryDaySame()) {
      this.everyDay.copyPeriodsFrom(day);
    } else {
      this.everyDay.resetPeriods();
    }

    this.emitEvent();
  }

  emitEvent() {
    const result: Record<string, string[]> = {};
    let total = 0;
    Object.keys(this.week).forEach(key => {
      result[key] = this.week[key].toArray();
      total += result[key].length;
    });
    if (total) {
      this.$emit("input", result);
    } else {
      this.$emit("input", null);
    }
    this.$emit("change");
  }

  isEveryDaySame() {
    let isSame = true;
    for (let i = 0; i < 48; i++) {
      let lastActive = null;
      for (const key in this.week) {
        const active = this.week[key].periods[i].active;
        if (lastActive === null) {
          lastActive = active;
        } else {
          isSame = lastActive === active;
        }
        if (!isSame) break;
      }
      if (!isSame) break;
    }
    return isSame;
  }
}
</script>

<style lang="scss" scoped>
.period-picker {
  user-select: none;
  .time-tick {
    padding-left: 48px;
    padding-right: 24px;
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
    ul {
      padding: 0;
      margin: 0;
      display: flex;
      li {
        flex: 1;
        list-style: none;
      }
    }
  }
  .everyday {
    margin-bottom: 10px;
  }
}
</style>
