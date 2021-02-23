<template>
  <div class="week-time-picker">
    <div class="moments">
      <ul>
        <li v-for="item in moments" :key="item">{{ item }}</li>
      </ul>
    </div>
    <div class="everyday">
      <DayTimePicker :day="everyDay" @update="onUpdate" />
    </div>
    <div>
      <DayTimePicker
        v-for="day in weekday"
        :key="day.field"
        :day="day"
        @update="onUpdate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import DayTimePicker from "./DayTimePicker.vue";
import { DayTime, Moment } from "./utils";

@Component({
  name: "week-time-picker",
  components: {
    DayTimePicker
  }
})
export default class extends Vue {
  @Prop() value: Record<string, string[]>;

  everyDay = new DayTime("每天", "every");

  weekday = [
    new DayTime("周一", "mon"),
    new DayTime("周二", "tue"),
    new DayTime("周三", "wed"),
    new DayTime("周四", "thu"),
    new DayTime("周五", "fri"),
    new DayTime("周六", "sat"),
    new DayTime("周日", "sun")
  ];

  get moments() {
    const moments: string[] = [];
    let current = 0;
    while (current < 60 * 24) {
      const moment = new Moment();
      moment.minutes = current;
      moments.push(moment.toString());
      current += 180;
    }
    return moments;
  }

  created() {
    this.initModel();
  }

  @Watch("value")
  initModel() {
    this.weekday.forEach(day => {
      day.init(this.value ? this.value[day.field] : []);
    });
    if (this.isEveryDaySame()) {
      this.everyDay.copy(this.weekday[0]);
    } else {
      this.everyDay.init();
    }
  }

  onUpdate(day: DayTime) {
    if (day.label === "每天") {
      this.weekday.forEach(item => {
        item.copy(day);
      });
    } else if (this.isEveryDaySame()) {
      this.everyDay.copy(day);
    } else {
      this.everyDay.reset();
    }

    this.emitEvent();
  }

  emitEvent() {
    const result: Record<string, string[]> = {};
    let total = 0;
    this.weekday.forEach(day => {
      result[day.field] = day.display();
      total += result[day.field].length;
    });
    if (total) {
      this.$emit("input", result);
    } else {
      this.$emit("input", null);
    }
    this.$emit("change");
  }

  /**
   * 判断是否每天的时段都相同
   */
  isEveryDaySame() {
    let isSame = true;
    for (let i = 0; i < 48; i++) {
      let lastActive = null;
      for (const index in this.weekday) {
        const active = this.weekday[index].data[i].active;
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
.week-time-picker {
  user-select: none;
  font-size: 14px;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  .moments {
    padding-left: 48px;
    padding-right: 24px;
    margin-bottom: 8px;
    line-height: 22px;
    font-size: 12px;
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
