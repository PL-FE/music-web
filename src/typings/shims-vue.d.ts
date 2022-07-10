declare type BaseTypes = string

declare type songDataTypes = {
    name:string,
    id:string,
    album:string,
    artists:object[],
}
declare type songTypes = {
    album:object, // 专辑
    song:songDataTypes, // 歌手
    name:string, // 歌名
    id:number|string, // 封面
    picUrl:string, // 封面
    mp3Url:string, // mp3
}