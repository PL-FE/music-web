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
// 获取推荐新音乐
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