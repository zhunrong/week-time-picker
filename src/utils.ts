const timePattern = /(([01]\d|2[0-3]):[0-5][0-9]|24:00)/;

export class Moment {
  hour = 0;
  minute = 0;

  get minutes() {
    return this.hour * 60 + this.minute;
  }

  set minutes(minutes: number) {
    while (minutes < 0 || minutes > 1440) {
      if (minutes < 0) {
        minutes += 1440;
      } else {
        minutes -= 1440;
      }
    }
    this.hour = Math.floor(minutes / 60);
    this.minute = minutes % 60;
  }

  constructor(text?: string) {
    if (text) {
      this.set(text);
    }
  }

  set(text: string) {
    if (!timePattern.test(text)) return console.warn(`时间格式不正确：${text}`);
    const arr = text.split(":");
    this.hour = parseInt(arr[0]);
    this.minute = parseInt(arr[1]);
  }

  get() {
    const { hour, minute } = this;
    return `${hour < 10 ? `0${hour}` : hour}:${
      minute < 10 ? `0${minute}` : minute
    }`;
  }

  toString() {
    return this.get();
  }

  /**
   * 是否在指定时刻之后
   * @param moment
   */
  isAfter(moment: Moment) {
    return this.minutes > moment.minutes;
  }

  /**
   * 是否在指定时刻之前
   * @param moment
   */
  isBefore(moment: Moment) {
    return this.minutes < moment.minutes;
  }

  /**
   * 是否为同一时刻
   * @param moment
   */
  isSame(moment: Moment) {
    return this.minutes === moment.minutes;
  }

  /**
   * 是否与指定时刻相同或处于之后
   * @param moment
   */
  isSameOrAfter(moment: Moment) {
    return this.minutes >= moment.minutes;
  }

  /**
   * 是否与指定时刻相同或处于之前
   * @param moment
   */
  isSameOrBefore(moment: Moment) {
    return this.minutes <= moment.minutes;
  }

  /**
   * 是否处于两个时刻之前
   * @param begin
   * @param end
   */
  isBetween(begin: Moment, end: Moment) {
    return this.isSameOrAfter(begin) && this.isSameOrBefore(end);
  }

  /**
   * 返回偏移后的时刻
   * @param minutes 分钟数
   */
  offset(minutes: number) {
    const moment = new Moment();
    const before = this.minutes;
    moment.minutes = before + minutes;
    return moment;
  }
}

export class TimeRange {
  begin: Moment;
  end: Moment;

  constructor(text: string) {
    this.set(text);
  }

  isBetween(timeRange: TimeRange) {
    return (
      this.begin.isSameOrAfter(timeRange.begin) &&
      this.end.isSameOrBefore(timeRange.end)
    );
  }

  set(text: string) {
    const arr = text.split("-");
    this.begin = new Moment(arr[0]);
    this.end = new Moment(arr[1]);
  }

  get() {
    return `${this.begin}-${this.end}`;
  }

  toString() {
    return this.get();
  }

  clone() {
    return new TimeRange(this.toString());
  }
}

export interface UnitTime {
  range: TimeRange;
  active: boolean;
  selected: boolean;
}

export type Keys = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export class DayTime {
  data: UnitTime[] = [];

  constructor(public label: string, public field: Keys, public index: number) {}

  /**
   * 初始化时段
   * @param strings
   */
  init(strings: string[] = [], step = 30) {
    const data = strings.map(str => new TimeRange(str));
    this.data = [];
    let current = 0;
    while (current < 1440) {
      const begin = new Moment();
      begin.minutes = current;
      const end = new Moment();
      end.minutes = current + step;
      const range = new TimeRange(`${begin}-${end}`);
      this.data.push({
        range,
        active: !!data.find(item => range.isBetween(item)),
        selected: false
      });
      current += step;
    }
  }

  /**
   * 设置选中区间
   * @param begin
   * @param end
   */
  setSelected(begin: number, end: number) {
    this.data.forEach((item, index) => {
      item.selected = begin <= index && index <= end;
    });
  }

  /**
   * 设置鼠标选中范围
   * @param left
   * @param right
   * @param top
   * @param bottom
   */
  setMouseArea(left: number, right: number, top: number, bottom: number) {
    if (top <= this.index && this.index <= bottom) {
      this.data.forEach((item, index) => {
        item.selected = left <= index && index <= right;
      });
    } else {
      this.data.forEach(item => (item.selected = false));
    }
  }

  setActive(bool: boolean) {
    this.data.forEach(item => {
      if (item.selected) {
        item.active = bool;
        item.selected = false;
      }
    });
  }

  /**
   * 重置时段的状态
   */
  reset() {
    this.data.forEach(period => {
      period.active = false;
      period.selected = false;
    });
  }

  /**
   * 复制时段列表
   * @param day
   */
  copy(day: DayTime) {
    this.data = day.data.map(item => {
      return {
        active: item.active,
        range: item.range.clone(),
        selected: item.selected
      };
    });
  }

  /**
   * 将连续时段合并再以字符串数组方式输出
   */
  display(): string[] {
    const arr: string[] = [];
    let lastBegin: Moment;
    let lastEnd: Moment;
    this.data.forEach(item => {
      if (!item.active) return;
      const { begin, end } = item.range;
      if (!lastBegin) {
        lastBegin = begin;
        lastEnd = end;
      } else if (lastEnd.isSame(begin)) {
        lastEnd = end;
      } else {
        arr.push(`${lastBegin}-${lastEnd}`);
        lastBegin = begin;
        lastEnd = end;
      }
    });
    if (lastBegin && lastEnd) {
      arr.push(`${lastBegin}-${lastEnd}`);
    }
    return arr;
  }
}
