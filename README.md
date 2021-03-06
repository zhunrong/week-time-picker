# week-time-picker

![组件展示](./demo.png)

该组件用于方便、快捷地选取周一至周日每天的时段，可以用于以一周为周期的任务调度/执行系统

## 使用方法

安装

```
npm install -S @chenzr/week-time-picker
```

全局注册

```typescript
import Vue from 'vue';
import WeekTimePicker from '@chenzr/week-time-picker';
import '@chenzr/week-time-picker/libs/week-time-picker.css';

Vue.use(WeekTimePicker);
```

局部注册

```vue
<template>
  <div :style="{width:'400px',height:'400px'}">
    <week-time-picker v-model="value" />
  </div>
</template>

<script>
import WeekTimePicker from '@chenzr/week-time-picker';
import '@chenzr/week-time-picker/libs/week-time-picker.css';

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

## API

### 属性

属性 | 说明 | 类型 | 默认值
-----|-----|------|------
value（v-model） | 组件的值 | object | null

value的具体格式示例
```js
{
  mon: ["08:00-12:00", "14:00-15:30"],
  tue: ["08:00-12:00"],
  wed: ["08:00-12:00"],
  thu: ["08:00-12:00"],
  fri: ["08:00-12:00"],
  sat: ["08:00-12:00"],
  sun: ["08:00-12:00"]
}
```

### 事件

事件名 | 说明 | 回调参数
------|------|---------
change | 数据更新时触发 | function(value)