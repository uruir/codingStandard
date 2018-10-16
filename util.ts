import fs from 'fs';
import moment from 'moment';

type Maybe<T> = T | void;
export const isDefined = <T>(x: Maybe<T>): x is T => x !== undefined && x !== null;
type GetDefaultData<T> = (param: T, defaultValue?: T) => T;
export const getDefaultBoolean: GetDefaultData<boolean> = param => Boolean(param);
export const getDefaultNumber: GetDefaultData<number> = (param, defaultValue = 0) => {
    return isNaN(Number(param)) ? defaultValue : Number(param);
};
export const getDefaultString: GetDefaultData<string> = (param, defaultValue = '-') => {
    return isDefined(param) ? String(param) : defaultValue;
};

enum MathDecide {
    'ceil' = 'ceil',
    'floor' = 'floor',
    'round' = 'round',
}
export const formatMoney = (num: number | string, decimals: number = 8, padright: boolean = false, roundtag: MathDecide = MathDecide.round): string => {
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数，最多 10 位，默认 8 位
    * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
    * padright: 是否用 0 补齐右边
    * */
    if (decimals > 10) {
        decimals = 10
    }
    let str = '' + num
    if (isNaN(parseFloat(str)) || Number(num) === 0) {
        return '0'
    } else if (/e/i.test(str)) {
        str = str.toUpperCase()
        let [l, r] = str.split('E')
        if (r.indexOf('-') === 0) {
            str = (+l / Math.pow(10, Math.abs(+r))).toFixed(Math.abs(decimals))
        } else {
            str = '' + +l * Math.pow(10, Math.abs(+r))
        }
    }
    if (str.length > 17) {
        str = str.slice(0, 17)
    }
    if (+str === 0) {
        return '0'
    }
    // console.warn('formatMoney > num decimals str n prec', num, decimals, str)
    roundtag = roundtag || MathDecide.round;
    let n = !isFinite(+str) ? '0' : str
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    let s: any
    if (prec === 0) {
        return Math.round(+n) + ''
    }
    // console.warn('formatMoney > num decimals str n prec', num, decimals, str, n, prec)
    if (prec) {
        s = n.split('.')
    }
    // console.log('prec n s', prec, n, s)
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    if (s.length === 1) {
        return s[0]
    } else if ((s[1] || '').length < prec && padright) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
        return s.join('.')
    } else if ((s[1]).length > prec) {
        s[1] = parseFloat('0.' + s[1]).toFixed(prec)
        s[1] = s[1].slice(2)
        return s.join('.')
    } else {
        let len = s[1].length
        while (len--) {
            if (s[1][len] !== '0') {
                break
            }
        }
        if (len !== s[1].length - 1) {
            s[1] = s[1].slice(0, len - s[1].length + 1)
        }
        if (!s[1]) {
            return s[0]
        }
        s[1] = s[1].slice(0, prec)
        return s.join('.')
    }
}

export enum TimeFormat {
    long = 'YY-MM-DD HH:mm',
    short = 'YY-MM-DD',
    xShort = 'MM-DD',
    unix = 'X'
}
// 格式化时间
export const formatTime = (time: string | number, toFormat: TimeFormat = TimeFormat.long) => {
    try {
        let str = '' + time
        if (
            /\d{4}-\d{2}-\d{2}/.test(str)
            || String(parseInt(str)).length === 10
        ) {
            return moment(str).format(toFormat)
        } else if (String(parseInt(str)).length === 13) {
            return moment(Math.round(+str / 1000)).format(toFormat)
        } else {
            return '-'
        }
    } catch (e) {
        return '-'
    }
}

export const delDir = (path) => {
    try {
        let files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach((file, index) => {
                let curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    delDir(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
            console.info('成功：删除文件夹', path)
        }
    } catch (e) {
        console.error('错误：删除文件夹', path, e)
    }
};