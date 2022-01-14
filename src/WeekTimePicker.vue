<template>
  <div class="week-time-picker">
    <div class="moments">
      <ul>
        <li v-for="item in moments" :key="item">{{ item }}</li>
      </ul>
    </div>
    <div @mousedown="onMouseDown" @mousemove="onMouseMove">
      <DayGrid v-for="day in weekday" :key="day.field" :day="day" />
    </div>
  </div>
</template>

<script>
import DayGrid from "./DayGrid.vue";
import { DayTime, Moment } from "./utils";

export default {
  name: "week-time-picker",
  components: {
    DayGrid
  },
  props: {
    value: {
      default: null
    }
  },
  data() {
    return {
      startRow: -1,
      startCol: -1,
      actionType: false,
      weekday: [
        new DayTime("周一", "mon", 0),
        new DayTime("周二", "tue", 1),
        new DayTime("周三", "wed", 2),
        new DayTime("周四", "thu", 3),
        new DayTime("周五", "fri", 4),
        new DayTime("周六", "sat", 5),
        new DayTime("周日", "sun", 6)
      ]
    };
  },
  mounted() {
    document.addEventListener("mouseup", this.onMouseUp);
  },
  beforeDestroy() {
    document.removeEventListener("mouseup", this.onMouseUp);
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.weekday.forEach(day => {
          day.init(this.value ? this.value[day.field] : []);
        });
      }
    }
  },
  computed: {
    moments() {
      const moments = [];
      let current = 0;
      while (current < 60 * 24) {
        const moment = new Moment();
        moment.minutes = current;
        moments.push(moment.toString());
        current += 180;
      }
      return moments;
    }
  },
  methods: {
    emitEvent() {
      const result = {};
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
      this.$emit("change", result);
    },
    onMouseDown(e) {
      const target = e.target;
      if (target.nodeName !== "LI") return;
      this.startRow = +target.dataset.row;
      this.startCol = +target.dataset.col;
      this.actionType = target.dataset.active !== "true";
    },
    onMouseUp() {
      if (this.startRow === -1) return;
      this.weekday.forEach(day => day.setActive(this.actionType));
      this.emitEvent();
      this.startRow = -1;
    },
    onMouseMove(e) {
      const target = e.target;
      if (target.nodeName !== "LI" || this.startRow === -1) return;
      const endRow = +target.dataset.row;
      const endCol = +target.dataset.col;
      const minCol = Math.min(this.startCol, endCol);
      const maxCol = Math.max(this.startCol, endCol);
      const minRow = Math.min(this.startRow, endRow);
      const maxRow = Math.max(this.startRow, endRow);
      this.weekday.forEach(item => {
        item.setMouseArea(minCol, maxCol, minRow, maxRow);
      });
    }
  }
};
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
}
</style>
