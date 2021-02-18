const timePattern = /(([01]\d|2[0-3]):[0-5][0-9]|24:00)/;

export class Time {
    hour = 0;
    minute = 0;

    constructor(text?: string) {
        if (text) {
            this.set(text);
        }
    }

    set(text: string) {
        if (!timePattern.test(text)) return console.warn(`时间格式不正确：${text}`);
        const arr = text.split(':');
        this.hour = parseInt(arr[0]);
        this.minute = parseInt(arr[1]);
    }

    get() {
        const {hour, minute} = this;
        return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
    }

    toString() {
        return this.get();
    }

    isGreaterThan(time: Time) {
        return this.hour > time.hour || (this.hour === time.hour && this.minute > time.minute);
    }

    isLessThan(time: Time) {
        return this.hour < time.hour || (this.hour === time.hour && this.minute < time.minute);
    }

    isEqualTo(time: Time) {
        return this.hour === time.hour && this.minute === time.minute;
    }

    isGreaterThanOrEqualTo(time: Time) {
        return this.isGreaterThan(time) || this.isEqualTo(time);
    }

    isLessThanOrEqualTo(time: Time) {
        return this.isLessThan(time) || this.isEqualTo(time);
    }

    add(time: Time) {
        const ret = new Time();
        ret.hour = this.hour + time.hour;
        ret.minute = this.minute + time.minute;
        if (ret.minute >= 60) {
            ret.hour += Math.floor(ret.minute / 60);
            ret.minute %= 60;
        }
        if (ret.hour > 24) {
            ret.hour %= 24;
        }
        return ret;
    }
}

export class Period {
    begin: Time;
    end: Time;

    constructor(text: string) {
        this.set(text);
    }

    isInPeriod(period: Period) {
        return this.begin.isGreaterThanOrEqualTo(period.begin) && this.end.isLessThanOrEqualTo(period.end);
    }

    set(text: string) {
        const arr = text.split('-');
        this.begin = new Time(arr[0]);
        this.end = new Time(arr[1]);
    }

    get() {
        return `${this.begin}-${this.end}`;
    }

    toString() {
        return this.get();
    }

    clone() {
        return new Period(this.toString());
    }
}

export interface UnitPeriod {
    period: Period;
    active: boolean;
    selected: boolean;
}

const DAY_BEGIN = new Time('00:00');
const DAY_END = new Time('24:00');
const PERIOD_STEP = new Time('00:30');

export class Day {
    label: string;
    periods: UnitPeriod[] = [];

    constructor(label: string) {
        this.label = label;
    }

    /**
     * 初始化时段
     * @param strings
     */
    init(strings: string[] = []) {
        const periods = strings.map(str => new Period(str));
        this.periods = [];
        let current = DAY_BEGIN;
        while (current < DAY_END) {
            const begin = current;
            const end = current.add(PERIOD_STEP);
            const period = new Period(`${begin}-${end}`);
            this.periods.push({
                period,
                active: !!periods.find(item => period.isInPeriod(item)),
                selected: false
            });
            current = end;
        }
    }

    /**
     * 重置时段的状态
     */
    resetPeriods() {
        this.periods.forEach(period => {
            period.active = false;
            period.selected = false;
        });
    }

    /**
     * 复制时段列表
     * @param day
     */
    copyPeriodsFrom(day: Day) {
        this.periods = day.periods.map(item => {
            return {
                active: item.active,
                period: item.period.clone(),
                selected: item.selected
            };
        });
    }

    toArray(): string[] {
        const arr: string[] = [];
        let lastBegin: Time;
        let lastEnd: Time;
        this.periods
            .filter(item => item.active)
            .forEach((item, index) => {
                const {begin, end} = item.period;
                if (index === 0) {
                    lastBegin = begin;
                    lastEnd = end;
                } else if (lastEnd.isEqualTo(begin)) {
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
