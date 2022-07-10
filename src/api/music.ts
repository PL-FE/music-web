import http from './index'
 
// 获取推荐新音乐
export function getNewsong(limit:number) {
    return http.get(`/personalized/newsong`,{
        params:{
            limit
        }
    })
}
// 获取音乐URL
export function getSongUrl(id:string) {
    return http.get(`song/url`,{
        params:{
            id
        }
    })
}
// 获取音乐url
export function getSongDounloadUrl(id:string) {
    return http.get(`/song/download/url`,{
        params:{
            id
        }
    })
}
// 获取歌曲详情
export function getSongDetail(ids:string) {
    return http.get(`song/detail`,{
        params:{
            ids
        }
    })
}
// 获取相似歌曲
export function getSimiSong(id:string) {
    return http.get(`/simi/song`,{
        params:{
            id
        }
    })
}
// 智能播放
export function playmodeIntelligenceList(id:string) {
    return http.get(`/playmode/intelligence/list`,{
        params:{
            id:'33894312',
            pid:'24381616',
            sid:id,
        }
    })
}
// 私人FM
export function personalFm() {
    return http.get(`personal_fm`)
}