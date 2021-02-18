<template>
  <div class="period-picker-day" :key="day.label">
    <div class="label">{{ day.label }}</div>
    <ul @mousedown="onMouseDown" @mousemove="onMouseMove" :title="title">
      <li
        :class="[{ active: period.active, selected: period.selected }]"
        v-for="(period, index) in day.periods"
        :key="index"
        :data-index="index"
      ></li>
    </ul>
    <div class="close">
      <a-icon
        :class="{ disabled: !title }"
        type="close-circle"
        @click="clearPeriod(day)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Icon as AIcon } from "ant-design-vue";
import { Day } from "./utils";

@Component({
  name: "period-picker-day",
  components: {
    AIcon
  }
})
export default class extends Vue {
  @Prop({
    default: new Day("label")
  })
  day: Day;
  mousedownIndex: number = null;
  actionType = "activate";

  get title() {
    const text = this.day.toArray().join("\n");
    return text ? `${this.day.label}：\n${text}` : "";
  }

  created() {
    document.addEventListener("mouseup", this.onMouseUp);
  }

  beforeDestroy() {
    document.removeEventListener("mouseup", this.onMouseUp);
  }

  onMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.nodeName !== "LI") return;
    this.mousedownIndex = Number(target.dataset.index);
    const isActive = this.day.periods[this.mousedownIndex].active;
    this.actionType = isActive ? "unactivate" : "activate";
    this.updateSelectedList(this.mousedownIndex, this.mousedownIndex);
  }

  onMouseMove(e: MouseEvent) {
    if (this.mousedownIndex === null) return;
    const target = e.target as HTMLElement;
    if (target.nodeName !== "LI") return;
    const index = Number(target.dataset.index);
    const start = Math.min(index, this.mousedownIndex);
    const end = Math.max(index, this.mousedownIndex);
    this.updateSelectedList(start, end);
  }

  onMouseUp() {
    if (this.mousedownIndex === null) return;
    this.mousedownIndex = null;
    // 更新选中的时段
    this.day.periods
      .filter(period => period.selected)
      .forEach(period => {
        period.active = this.actionType === "activate";
        period.selected = false;
      });
    this.$emit("update", this.day);
  }

  /**
   * 更新选中的时段
   */
  updateSelectedList(start: number, end: number) {
    this.day.periods.forEach((period, index) => {
      period.selected = start <= index && index <= end;
    });
  }

  clearPeriod() {
    if (!this.title) return;
    this.day.resetPeriods();
    this.$emit("update", this.day);
  }
}
</script>

<style lang="scss" scoped>
.period-picker-day {
  position: relative;
  padding-left: 48px;
  padding-right: 24px;
  height: 32px;
  line-height: 32px;
  &:first-of-type {
    ul {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
  }
  &:last-of-type {
    ul {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
  & + .period-picker-day {
    ul {
      border-top: none;
    }
  }
  .label {
    width: 48px;
    position: absolute;
    left: 0;
    top: 0;
    color: rgba(0, 0, 0, 0.85);
  }
  ul {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    li {
      list-style: none;
      flex: 1;
      background: rgba(238, 241, 246, 1);
      border-right: 1px solid #fff;
      &::after {
        content: "";
        display: block;
        height: 100%;
      }
      &:nth-child(6n) {
        border-color: rgba(0, 0, 0, 0.1);
      }
      &.active {
        background: rgba(50, 77, 255, 1);
        border-color: #fff;
        &.selected::after {
          background: rgba(0, 0, 0, 0.3);
        }
      }
      &.selected {
        border-color: #fff;
        &::after {
          background: rgba(50, 77, 255, 0.5);
        }
      }
      &:last-child {
        border-right-width: 0;
      }
    }
  }
  .close {
    width: 24px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .anticon {
      cursor: pointer;
      color: #324dff;
      &.disabled {
        color: rgba(50, 77, 255, 0.24);
        cursor: not-allowed;
      }
    }
  }
}
</style>
