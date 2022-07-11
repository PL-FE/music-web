export function millisecondToTime(millisecond:number){
    // 网易云是向下取整 使用 floor
    // 网易云不计算小时，65:23
     //分钟
     let minute:number = millisecond/1000 / 60;
     let minutes:number|string = Math.floor(minute);

     //秒
     let second:number = millisecond/1000 % 60;
     let seconds:number|string = Math.floor(second);

     if (seconds < 10) {
         seconds = "0" + seconds;
     }
        return minutes+":"+seconds
}