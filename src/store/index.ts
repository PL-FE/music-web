import { defineStore } from "pinia" // 定义容器
 
// 记录用户数据
export const defineUserStore = defineStore('userStore', {
  state: () => {
    return {
      user:<any>{}
    }
  },
  getters: {
  },
  actions: {
  }
})

// 记录音乐数据
export const defineMusicStore = defineStore('musicStore', {
  state: () => {
    return {
      // 维护播放id
      playSongId: <string|number> -1,
      // 是否在播放
      playing:false,
      // 维护播放列表
      playList:<songTypes[]>[]
    }
  },
  getters: {
    // 记录当前歌曲
    curSong: (state) => state.playList.find((song:songTypes)=>song.id == state.playSongId),
    // 记录当前歌曲下标
    playIndex:(state) => state.playList.findIndex((song:songTypes)=>song.id == state.playSongId),
  },
  actions:{
    // 下一首
    nextSong(){
      if(this.playIndex === this.playList.length-1){
        return
      }
      this.playSongId = this.playList[this.playIndex+1]?.id || this.playSongId
    },
    // 上一首
    preSong(){
      if(!this.playIndex){
        return
      }
      this.playSongId = this.playList[this.playIndex-1]?.id || this.playSongId
    },
  }
})
 
