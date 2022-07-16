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
      playSongId: <string|number> 0,
      // 是否在播放
      playing:false,
      // 当前播放进度，秒
      currentTime:0, 
      // 缓存的进度
      timeBuffered:0, 
      // 当前音量
      currentVolume:0.5, 
      tempVolume:0.5, 
      // 是否静音
      isMute:false, 
      // 播放列表
      playList:<songTypes[]>[]
    }
  },
  getters: {
    // 记录当前歌曲
    curSong: (state) => state.playList.find((song:songTypes)=>song.id == state.playSongId) || state.playList[0],
    // 记录当前歌曲下标
    playIndex:(state) => state.playList.findIndex((song:songTypes)=>song.id == state.playSongId),
  },
  actions:{
    canplay(){
      this.playing = !this.playing
    },
    // 下一首
    nextSong(){
      if(this.playIndex === this.playList.length-1){
        this.playSongId = this.playList[0].id
        return
      }
      this.playSongId = this.playList[this.playIndex+1]?.id || this.playSongId
    },
    // 上一首
    preSong(){
      if(!this.playIndex){
        this.playSongId = this.playList[this.playList.length - 1].id
        return
      }
      this.playSongId = this.playList[this.playIndex-1]?.id || this.playSongId
    },
    hanlderMute(isMute:boolean){
      this.isMute = isMute
      
      if(isMute){ // 静音时
        this.tempVolume = this.currentVolume
        this.currentVolume = 0
      } else {
        this.currentVolume = this.tempVolume
      }
    }
  }
})
 
