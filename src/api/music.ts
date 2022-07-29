import http from './index'

// 获取推荐新音乐
export function getNewsong(limit: number) {
    return http.get(`/personalized/newsong`, {
        params: {
            limit
        }
    })
}
// 获取音乐URL
export function getSongUrl(id: string) {
    return http.get(`song/url`, {
        params: {
            id
        }
    })
}
// 获取音乐url
export function getSongDounloadUrl(id: string) {
    return http.get(`/song/download/url`, {
        params: {
            id
        }
    })
}
// 获取歌曲详情
export async function getSongDetail(ids: string) {
    return http.get(`song/detail`, {
        params: {
            ids
        }
    }).then((res: any) => {
        return formatSongData(res)
    })
}

// 获取相似歌曲
export function getSimiSong(id: string | number) {
    return http.get(`/simi/song`, {
        params: {
            id
        }
    })
}
// 智能播放
export function playmodeIntelligenceList(id: string) {
    return http.get(`/playmode/intelligence/list`, {
        params: {
            id: '33894312',
            pid: '24381616',
            sid: id,
        }
    })
}
// 私人FM
export function personalFm() {
    return http.get(`personal_fm`)
}
// 获取歌词
export function getLyric(id: string) {
    return http.get(`/lyric`, {
        params: {
            id
        }
    })
}
// 热门歌单
export function topPlaylist(params = {}) {
    return http.get(`/top/playlist`, params)
}

// 获取歌单详情
export function getPlaylistDetail(id: string | number) {
    return http.get(`/playlist/detail`, {
        params: {
            id
        }
    })
}
// 获取专辑详情
export function getAlbumDetail(id: string | number) {
    return http.get(`/album`, {
        params: {
            id
        }
    })
}

// 获取歌手专辑
export function getartistAlbum(id: string | number) {
    return http.get(`/artist/album`, {
        params: {
            id
        }
    })
}
// 获取歌手详情
export function getArtistDetail(id: string | number) {
    return http.get(`/artist/detail`, {
        params: {
            id
        }
    })
}
// 获取歌手热门50首
export function getArtistTopSong(id: string | number) {
    return http.get(`/artist/top/song`, {
        params: {
            id
        }
    }).then((res: any) => {
        return formatSongData(res)
    })
}


function formatSongData(res: any) {
    res.songs = res.songs.map((song: any) => {
        const data: songTypes = {
            album: song.al,
            picUrl: song.al.picUrl,
            name: song.name,
            id: song.id,
            song: {
                ...song,
                duration: song.dt,
                album: song.al,
                artists: song.ar,
            },
            mp3Url: ''
        }
        return data
    })
    return res
}

// 最近播放
export function recentSong(limit: number = 50) {
    return http.get(`/record/recent/song`, {
        params: {
            limit
        }
    })
}
// 喜欢的音乐列表
export function queryLikelist(uid: number) {
    return http.get(`/likelist`, {
        params: {
            uid
        }
    })
}