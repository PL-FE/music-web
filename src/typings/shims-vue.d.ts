
interface loginTypes {
    phone: string,
    password?: string,
    md5_password?: string,
    captcha?: string | number,
    countrycode?: string | number
}

// 艺术家
declare type artistTypes = {
    name: string,
    id: number,
    img1v1Url: string,
    picUrl: string,
    briefDesc: string
}

// 歌曲详情
declare type songTypes = {
    album: albumTypes,
    artist: artistTypes,
    artists: artistTypes[],
    id: number,
    name: string,
    mp3Url: string, // mp3
    duration: number, // 时长
}


// 歌单
declare type playListTypes = {
    picUrl?: string, // 小封面
    name: string,
    id: number,
    createTime: number,
    creator: {
        nickname: string,
    },
    songs?: songTypes[],
    // 详情
    coverImgUrl?: string,
    description?: string,
    trackIds?: object[]
}
// 专辑 
declare type albumTypes = {
    artist: artistTypes,
    artists: artistTypes[],
    picUrl: string,
    blurPicUrl: string,
    name: string,
    id: number,
    description: string,
    publishTime: number,
}


declare module 'js-md5'