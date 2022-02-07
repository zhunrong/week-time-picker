import Vue, { PropType } from 'vue';
import DayGrid from './day-grid';
import { DayTime, Moment, Keys } from './utils';
import './week-time-picker.scss';

export type ValueType = {
  [key in Keys]?: string[];
};

export default Vue.extend({
  name: 'WeekTimePicker',
  components: {
    DayGrid,
  },
  props: {
    value: {
      type: Object as PropType<ValueType>,
      default: null,
    },
  },
  data() {
    return {
      startRow: -1,
      startCol: -1,
      actionType: false,
      weekday: [
        new DayTime('周一', 'mon', 0),
        new DayTime('周二', 'tue', 1),
        new DayTime('周三', 'wed', 2),
        new DayTime('周四', 'thu', 3),
        new DayTime('周五', 'fri', 4),
        new DayTime('周六', 'sat', 5),
        new DayTime('周日', 'sun', 6),
      ],
    };
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
    },
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.weekday.forEach((day) => {
          day.init(this.value ? this.value[day.field] : []);
        });
      },
    },
  },
  mounted() {
    document.addEventListener('mouseup', this.onMouseUp);
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.onMouseUp);
  },
  methods: {
    emitEvent() {
      const result: ValueType = {};
      let total = 0;
      this.weekday.forEach((day) => {
        result[day.field] = day.display();
        total += result[day.field].length;
      });
      if (total) {
        this.$emit('input', result);
      } else {
        this.$emit('input', null);
      }
      this.$emit('change', result);
    },
    onMouseDown(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.nodeName !== 'LI') return;
      this.startRow = +target.dataset.row;
      this.startCol = +target.dataset.col;
      this.actionType = target.dataset.active !== 'true';
      // 执行一次选中操作
      this.onMouseMove(e);
    },
    onMouseUp() {
      if (this.startRow === -1) return;
      this.weekday.forEach((day) => day.setActive(this.actionType));
      this.emitEvent();
      this.startRow = -1;
    },
    onMouseMove(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.nodeName !== 'LI' || this.startRow === -1) return;
      const endRow = +target.dataset.row;
      const endCol = +target.dataset.col;
      const minCol = Math.min(this.startCol, endCol);
      const maxCol = Math.max(this.startCol, endCol);
      const minRow = Math.min(this.startRow, endRow);
      const maxRow = Math.max(this.startRow, endRow);
      this.weekday.forEach((item) => {
        item.setMouseArea(minCol, maxCol, minRow, maxRow);
      });
    },
    onClear(day: DayTime) {
      day.reset();
      this.emitEvent();
    },
  },
  render() {
    return (
      <div class="week-time-picker">
        <div class="moments">
          <ul>
            {this.moments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div vOn:mousedown={this.onMouseDown} vOn:mousemove={this.onMouseMove}>
          {this.weekday.map((day) => (
            <day-grid
              key={day.field}
              day={day}
              vOn:clear={() => this.onClear(day)}
            ></day-grid>
          ))}
        </div>
      </div>
    );
  },
});
