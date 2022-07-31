// 毫秒转 04：34
export function millisecondToTime(millisecond: number) {
    // 网易云是向下取整 使用 floor
    // 网易云不计算小时，65:23
    //分钟
    let minute: number = millisecond / 1000 / 60;
    let minutes: number | string = Math.floor(minute);

    //秒
    let second: number = millisecond / 1000 % 60;
    let seconds: number | string = Math.floor(second);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds
}

// 1659209168840 转 2022-07-31
export function timestampToTime(timestamp: number) {
    const date = new Date(timestamp);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = date.getDate() + ' ';
    return Y + M + D;
}

export const getImgSrc = (name: string) => {
    if (typeof name === 'undefined') return '/src/assets/images/music_default.svg'
    const path = `/src/assets/images/${name}`
    const modules = import.meta.globEager('/src/assets/images/*')
    return modules[path]?.default
}

export function getUrlParam(name: string) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.hash.substring((window.location.hash.search(/\?/)) + 1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
}
