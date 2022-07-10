declare type BaseTypes = string

declare type artistTyes = {
    name:string,
    picUrl:string,
}
declare type songTypes = {
    album:object, // 专辑
    artists:artistTyes[], // 歌手
    name:string, // 歌名
}
