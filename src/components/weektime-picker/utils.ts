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
                minutes += 1440
            } else {
                minutes -= 1440
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
        const arr = text.split(':');
        this.hour = parseInt(arr[0]);
        this.minute = parseInt(arr[1]);
    }

    get() {
        const { hour, minute } = this;
        return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
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


export class Period {
    begin: Moment;
    end: Moment;

    constructor(text: string) {
        this.set(text);
    }

    isInPeriod(period: Period) {
        return this.begin.isSameOrAfter(period.begin) && this.end.isSameOrBefore(period.end);
    }

    set(text: string) {
        const arr = text.split('-');
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
        return new Period(this.toString());
    }
}

export interface UnitPeriod {
    period: Period;
    active: boolean;
    selected: boolean;
}

const DAY_BEGIN = new Moment('00:00');
const DAY_END = new Moment('24:00');

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
            const end = current.offset(30);
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
        let lastBegin: Moment;
        let lastEnd: Moment;
        this.periods
            .filter(item => item.active)
            .forEach((item, index) => {
                const { begin, end } = item.period;
                if (index === 0) {
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
