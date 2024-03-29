// 毫秒转 04：34
export function millisecondToTime(millisecond: number) {
  // 网易云是向下取整 使用 floor
  // 网易云不计算小时，65:23
  //分钟
  const minute: number = millisecond / 1000 / 60;
  const minutes: number | string = Math.floor(minute);

  //秒
  const second: number = (millisecond / 1000) % 60;
  let seconds: number | string = Math.floor(second);

  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds;
}

// 1659209168840 转 2022-07-31
export function timestampToTime(timestamp: number) {
  const date = new Date(timestamp);
  const m = date.getMonth();
  const d = date.getDate();
  const Y = date.getFullYear() + '-';
  const M = (m + 1 < 10 ? '0' + (m + 1) : m + 1) + '-';
  const D = d + 1 < 10 ? '0' + d : d;
  return Y + M + D;
}

export const getImgSrc = (name: string) => {
  if (typeof name === 'undefined')
    return '/src/assets/images/music_default.svg';
  const path = `/src/assets/images/${name}`;
  const modules = import.meta.globEager('/src/assets/images/*');
  return modules[path]?.default;
};

export function getUrlParam(name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.hash
    .substring(window.location.hash.search(/\?/) + 1)
    .match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
}

export function getCookie(name: string) {
  return document.cookie.match(`[;\s+]?${name}=([^;]*)`)?.pop();
}
