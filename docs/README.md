# week-time-picker 周内时段选择组件

该组件用于方便、快捷地选取周一至周日每天的时段，可以用于以一周为周期的任务调度/执行系统

## 何时使用

该组件用于方便、快捷地选取周一至周日每天的时段，可以用于以一周为周期的任务调度/执行系统

## 安装

```js
npm install -S @dmd/week-time-picker
```

## 全局注册

 ```js
import Vue from 'vue';
import WeekTimePicker from '@dmd/week-time-picker';
import "@dmd/week-time-picker/dist/WeekTimePicker.css"; // 引入样式

Vue.use(WeekTimePicker);
```

## 局部注册

```vue
<template>
  <div :style="{width:'400px',height:'400px'}">
    <week-time-picker v-model="value" />
  </div>
</template>

<script>
import WeekTimePicker from "@dmd/week-time-picker";
import "@dmd/week-time-picker/dist/WeekTimePicker.css"; // 引入样式

export default {
  components: {
    WeekTimePicker,
  },
  data() {
    return {
      value: null
    }
  }
}
</script>
```

## 代码演示

```components
<description>
#### 基本使用
该组件用于方便、快捷地选取周一至周日每天的时段，可以用于以一周为周期的任务调度/执行系统
</description>

<path>
./base.vue
</path>
```

## API

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|value（v-model） | 组件的值 | object | null |

### 事件

| 事件名称 | 说明             | 回调参数        |
| -------- | ---------------- | --------------- |
|change | 数据更新时触发 | value => void |


