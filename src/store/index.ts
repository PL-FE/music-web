import { defineStore } from "pinia" // 定义容器
import { getSongDetail, getSimiSong, getPlaylistDetail } from '@/api/music';

// 记录用户数据
export const defineUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: <any>{}
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
      playSongId: <string | number>0,
      // 是否在播放
      playing: false,
      // 是否缓存中
      loading: false,
      // 播放模式，0关闭循环、1列表循环、2单曲循环
      loopModel: 0,
      // 当前播放进度，秒
      currentTime: 0,
      // 缓存的进度
      timeBuffered: 0,
      // 当前音量
      currentVolume: 0.5,
      tempVolume: 0.5,
      // 是否静音
      isMute: false,
      // 是否打开播放列表页面
      isShow: false,
      // 播放列表
      playList: <songTypes[]>[],
      playListIds: <any>[]
    }
  },
  getters: {
    // 记录当前歌曲
    curSong: (state) => state.playList.find((song: songTypes) => song.id == state.playSongId) || state.playList[0],
    // 记录当前歌曲下标
    playIndex: (state) => state.playList.findIndex((song: songTypes) => song.id == state.playSongId),
  },
  actions: {
    // 设置播放列表,当前播放发id
    async setPlayList(ids: number[], id: number = ids[0]) {
      this.playListIds = ids
      const playListRes: any = await getSongDetail(ids.join(','))
      this.playList = playListRes.songs
      this.playSongId = id
    },
    // set相近歌曲
    setSimiSong(songId: string | number) {
      getSimiSong(songId).then((res: any) => {
        const simiSongids = res.songs.map((a: any) => a.id)
        simiSongids.unshift(songId) // 相近歌曲包含自己
        this.setPlayList(simiSongids)
      })
    },
    // 设置专辑
    async setplayListSong(playListId: string | number) {
      const playListRes: any = await getPlaylistDetail(playListId)
      const ids = playListRes.playlist.trackIds.map((a: any) => a.id)
      this.setPlayList(ids)
    },
    // 设置播放
    setPlaying(val: boolean) {
      if (this.loading) {
        return
      }
      this.playing = val
    },
    setCurrentVolume(val: number) {
      if (val >= 0 && val <= 1) {
        this.currentVolume = val
      }
    },
    // 播放暂停
    doPlay() {
      this.setPlaying(!this.playing)
    },
    // 下一首
    nextSong() {
      if (this.playIndex === this.playList.length - 1) {
        this.playSongId = this.playList[0].id
        return
      }
      this.playSongId = this.playList[this.playIndex + 1]?.id || this.playSongId
    },
    // 上一首
    preSong() {
      if (!this.playIndex) {
        this.playSongId = this.playList[this.playList.length - 1].id
        return
      }
      this.playSongId = this.playList[this.playIndex - 1]?.id || this.playSongId
    },
    // 处理静音
    hanlderMute(isMute: boolean) {
      this.isMute = isMute

      if (isMute) { // 静音时
        this.tempVolume = this.currentVolume
        this.currentVolume = 0
      } else {
        this.currentVolume = this.tempVolume
      }
    },
    // 随机播放
    randomSongList() {
      const { playSongId } = this
      const data: songTypes[] = []
      let playSong = null
      this.playList.forEach(song => {
        if (song.id === playSongId) {
          playSong = song
        } else {
          data.push(song)
        }
      })
      data.sort(randomSort);
      if (playSong) {
        data.unshift(playSong)
      }
      this.playList.splice(0, this.playList.length, ...data)
      function randomSort() {
        return Math.random() > 0.5 ? -1 : 1;
      }
    }
  }
})

