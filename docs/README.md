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
import WeekTimePicker from '@dmd/week-time-picker';

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
<template>
  <div>
    <week-time-picker v-model="weektime" />
  </div>
</template>

<script>
import WeekTimePicker from '@dmd/week-time-picker';
export default {
  components: {
    WeekTimePicker
  },
  data(){
    return {
        weektime: {
          mon: ["07:00-08:00","16:00-17:00"],
          tue: ["06:00-09:00","15:00-18:00"],
          wed: ["07:00-08:00","16:00-17:00"],
          thu: ["11:30-12:30"],
          fri: ["11:30-12:30"],
          sat: ["09:30-10:30","13:30-14:30"],
          sun: ["10:30-13:30"]
        }
    }
  }
}
</script>
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


