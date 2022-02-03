<template>
  <div class="day-time-picker" :key="day.field">
    <div class="label">{{ day.label }}</div>
    <ul :title="title">
      <li
        :class="[{ active: item.active, selected: item.selected }]"
        v-for="(item, col) in day.data"
        :key="col"
        :data-row="day.index"
        :data-col="col"
        :data-active="item.active"
      ></li>
    </ul>
    <div class="clear">
      <icon :class="{ disabled: !title }" @click.native="clear" />
    </div>
  </div>
</template>

<script lang="tsx">
import Vue, { PropType } from "vue";
import { DayTime } from "./utils";

const Icon = {
  render() {
    return (
      <svg
        viewBox="64 64 896 896"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        class="icon"
      >
        <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path>
        <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
      </svg>
    );
  }
};

export default Vue.extend({
  name: "day-grid",
  components: {
    Icon
  },
  props: {
    day: {
      type: Object as PropType<DayTime>,
      required: true
    }
  },
  computed: {
    title(): string {
      const text = this.day.display().join("\n");
      return text ? `${this.day.label}：\n${text}` : "";
    }
  },
  methods: {
    /**
     * 清空选中状态
     */
    clear() {
      if (!this.title) return;
      this.$emit("clear");
    }
  }
});
</script>

<style lang="scss" scoped>
.day-time-picker {
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
  & + .day-time-picker {
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
    box-sizing: border-box;
    li {
      list-style: none;
      flex: 1;
      background: rgba(238, 241, 246, 1);
      border-right: 1px solid #fff;
      &::after {
        content: "";
        display: block;
        height: 100%;
        transition: background-color 0.2s;
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
  .clear {
    width: 24px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      cursor: pointer;
      color: #324dff;
      font-size: 14px;
      &.disabled {
        color: rgba(50, 77, 255, 0.24);
        cursor: not-allowed;
      }
    }
  }
}
</style>
