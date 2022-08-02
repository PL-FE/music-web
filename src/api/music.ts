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
        res.songs = formatSongData(res.songs)
        return res
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
// 热门歌手
export function getTopArtists(params = {}) {
    return http.get(`/top/artists`, params)
}
// 热门歌单
export function getTopPlaylist(params = {}) {
    return http.get(`/top/playlist`, params)
}

// 获取歌单详情
export function getPlaylistDetail(id: string | number) {
    return http.get(`/playlist/detail`, {
        params: {
            id
        }
    }).then((res: any) => {
        const playlist: playListType = formatPlayListData(res.playlist)
        res.playlist = playlist
        return res
    })
}
// 获取专辑详情
export function getAlbum(id: string | number) {
    return http.get(`/album`, {
        params: {
            id
        }
    }).then((res: any) => {
        res.songs = formatSongData(res.songs)
        return res
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
        res.songs = formatSongData(res.songs)
        return res
    })
}


function formatPlayListData(playList: any) {
    const _playList = {
        ...playList,
        picUrl: playList.coverImgUrl,
        name: playList.name,
        id: playList.id,
        description: playList.description,
        createTime: playList.createTime,
        creator: {
            ...playList.creator,
            nickname: playList.creator.nickname,
        },
        songs: formatSongData(playList.tracks)
    }
    return _playList
}
function formatSongData(songs: any) {
    const list = songs.map((song: any) => {
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
    return list
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
// 每日推荐的歌曲
export function recommendSongs() {
    return http.get(`/recommend/songs`).then((res: any) => {
        res.songs = formatSongData(res.dailySongs)
        return res
    })
}
// 每日推荐的歌单
export function recommendResource() {
    return http.get(`/recommend/resource`)
}
// 获取最新专辑
export function getAlbumNewest() {
    return http.get(`/album/newest`)
}
// 获取歌曲标签心情与流派
export function getPlaylistCatlist() {
    return http.get(`/playlist/catlist`)
}