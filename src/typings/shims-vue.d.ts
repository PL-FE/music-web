declare type BaseTypes = string

interface loginType {
    phone:string,
    password?:string,
    md5_password?:string,
    captcha?:string|number,
    countrycode?:string|number
}

declare type songDataTypes = {
    name:string,
    id:string,
    album:{
        picUrl:string,
        name:string,
    },
    artists:object[],
    duration:number, // 时长
}
declare type songTypes = {
    album:{
        picUrl:string,
        name:string,
    }, // 专辑
    song:songDataTypes, // 歌手
    name:string, // 歌名
    id:number|string, // 封面
    picUrl:string, // 封面
    mp3Url:string, // mp3
}

declare module 'js-md5'