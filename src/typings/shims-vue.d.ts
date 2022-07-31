declare type BaseTypes = string

interface loginType {
    phone: string,
    password?: string,
    md5_password?: string,
    captcha?: string | number,
    countrycode?: string | number
}

// 歌曲详情
declare type songDataTypes = {
    name: string,
    id: string,
    album: albumType,
    artists: artistType[],
    duration: number, // 时长
}

declare type songTypes = {
    album: albumType, // 专辑
    song: songDataTypes, // 
    name: string, // 歌名
    id: number | string, // 封面
    picUrl: string, // 封面
    mp3Url: string, // mp3
}

// 歌单
declare type playListType = {
    picUrl: string,
    name: string,
    id: number,
    description: string,
    createTime: number,
    creator: {
        nickname: string,
    },
    songs: songTypes[]

}
// 专辑 
declare type albumType = {
    picUrl: string,
    name: string,
    id: number,
    description: string,
    publishTime: number,
    artist: artistType,
}

// 歌手
declare type artistType = {
    name: string,
    id: number,
}

declare module 'js-md5'