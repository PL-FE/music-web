<template>
  <div
    v-if="musicStore.playList.length"
    ref="controbarRef"
    class="controbar-container"
    @click.self="openPlayList"
  >
    <MusicProgress
      v-model:value="progress"
      v-model:bufferedValue="timeBufferedProgress"
      class="custom-slider-time"
    />
    <div class="controller-main left">
      <svg-icon
        class="icon-svg"
        icon-name="icon-previous"
        @click="hanlderPrevious"
      ></svg-icon>
      <PlayButton :song-id="musicStore.playSongId" />
      <svg-icon
        class="icon-svg"
        icon-name="icon-next"
        @click="hanlderNext"
      ></svg-icon>
      <div v-if="musciArrts.duration" class="time">
        {{ useAudioGetCurtime(musciArrts.currentTime) }} /
        {{ millisecondToTime(musciArrts.duration) }}
      </div>
    </div>

    <div class="mid" @click.capture="openPlayList">
      <audio
        ref="audioRef"
        :src="musciArrts.mp3Url"
        preload="auto"
        volume="0.5"
        @play="hanlderPlay"
        @pause="hanlderpause"
        @timeupdate="handleTimeupdate"
        @ended="handlerEnded"
        @error="error"
        @canplay="canplay"
        @loadeddata="loadeddata"
        @playing="handlerPlaying"
      ></audio>
      <SongItem
        v-if="musicStore.curSong"
        :has-status-icon="false"
        :data="musicStore.curSong"
        class="song-item"
      >
      </SongItem>
    </div>
    <div class="right">
      <el-slider v-model="volume" class="slider-volume" />
      <svg-icon
        v-if="!musicStore.isMute"
        class="icon-svg mini"
        icon-name="icon-voice"
        @click="handlerVoice(true)"
      >
      </svg-icon>
      <svg-icon
        v-else
        class="icon-svg mini"
        icon-name="icon-mute"
        @click="handlerVoice(false)"
      ></svg-icon>
      <svg-icon
        v-if="[0, 1].includes(musicStore.loopModel)"
        class="icon-svg mini"
        :color="musicStore.loopModel === 0 ? '#909090' : '#fff'"
        icon-name="icon-loop"
        @click="handlerLoopSong"
      ></svg-icon>
      <svg-icon
        v-else
        class="icon-svg mini"
        icon-name="icon-loop1"
        @click="handlerLoopSong"
      ></svg-icon>
      <svg-icon
        class="icon-svg mini random"
        color="#909090"
        icon-name="icon-random"
        @click="randomSongList"
      >
      </svg-icon>
      <svg-icon
        class="icon-svg mini showPlayList"
        :class="{ isShowPlayList: route.name === 'playList' }"
        icon-name="icon-upward_arrow"
        @click="openPlayList"
      ></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineMusicStore } from '@/store/index';
import {
  watchEffect,
  ref,
  nextTick,
  reactive,
  computed,
  onUnmounted,
  onMounted,
} from 'vue';
import { getSongDounloadUrl } from '@/api/music';
import SongItem from '@/components/SongItem.vue';
import { millisecondToTime } from '@/utils/index';
import MusicProgress from '@/components/common/MusicProgress.vue';
import PlayButton from '@/components/common/PlayButton.vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const controbarRef = ref(null);
const musciArrts = reactive({
  mp3Url: '',
  duration: 0,
  currentTime: 0,
  curtimeSlider: 0,
});
const musicStore = defineMusicStore();
const audioRef = ref<HTMLAudioElement>();
const {
  progress, // 0-100
  timeBufferedProgress, // 0-100
  customChangeProgress,
} = useProgress();

const {
  hanlderPlay,
  hanlderpause,
  hanlderNext,
  hanlderPrevious,
  handleTimeupdate,
  handlerEnded,
  handlerPlaying,
  loadeddata,
  canplay,
  error,
} = useAudioEvent(customChangeProgress.value);
const { handlerVoice, volume, handlerLoopSong, randomSongList } = useAudioApi();

const openPlayList = () => {
  const isShow = route.name !== 'playList';
  if (isShow) {
    router.push({
      name: 'playList',
      query: {
        ...musicStore.urlId,
      },
    });
  } else {
    router.go(-1);
  }
};

function useAudioEvent(customChangeProgress: boolean) {
  // 查询播放时间
  watchEffect(async () => {
    if (musicStore.curSong) {
      const id = musicStore.curSong.id;
      try {
        const songData: any = await getSongDounloadUrl(Number(id));
        musciArrts.mp3Url = songData.url;
      } catch (error) {
        musicStore.setPlaying(false);
      }
      musciArrts.duration = musicStore.curSong.duration;
    }
  });
  // 控制播放暂停
  watchEffect(() => {
    if (musciArrts.mp3Url) {
      if (musicStore.playing) {
        nextTick(() => {
          audioRef.value?.play();
        });
      } else {
        nextTick(() => {
          audioRef.value?.pause();
        });
      }
    }
  });
  // 静音
  watchEffect(() => {
    if (audioRef.value) {
      audioRef.value.muted = musicStore.isMute;
    }
  });
  watchEffect(() => {
    if (musicStore.curSong) {
      musicStore.loading = true;
    }
  });
  function keydownListener(e) {
    switch (e.code) {
      case 'Space':
        musicStore.doPlay();
        break;
      case 'ArrowLeft':
        musicStore.preSong();
        break;
      case 'ArrowRight':
        musicStore.nextSong();
        break;
      case 'ArrowUp':
        musicStore.setCurrentVolume(musicStore.currentVolume + 0.1);
        break;
      case 'ArrowDown':
        musicStore.setCurrentVolume(musicStore.currentVolume - 0.1);
        break;
    }
  }
  onMounted(() => {
    document.addEventListener('keydown', keydownListener);
  });
  onUnmounted(() => {
    document.removeEventListener('keydown', keydownListener);
  });
  return {
    canplay() {
      musicStore.loading = false;
    },
    handlerPlaying() {
      // TODO: 卡顿时候需要loading
      // musicStore.loading = true
    },
    error() {
      audioRef.value?.load();
    },
    loadeddata() {
      nextTick(() => {
        nextTick(() => {
          audioRef.value?.play();
        });
      });
    },
    handlerEnded() {
      musicStore.nextSong();
    },
    // 监听播放事件
    hanlderPlay() {
      musicStore.setPlaying(true);
    },
    // 监听暂停事件
    hanlderpause() {
      musicStore.setPlaying(false);
    },
    // 下一首
    hanlderNext() {
      musicStore.nextSong();
    },
    // 上一首
    hanlderPrevious() {
      musicStore.preSong();
    },
    // 播放位置被改变
    handleTimeupdate() {
      if (!customChangeProgress) {
        musciArrts.currentTime = <number>audioRef.value?.currentTime;
        musicStore.currentTime = musciArrts.currentTime;
      }

      // 获取已缓冲部分的 TimeRanges 对象
      if (audioRef.value) {
        const timeRanges = audioRef.value.buffered;
        if (timeRanges.length) {
          // 获取以缓存的时间
          const timeBuffered = timeRanges.end(timeRanges.length - 1);
          musicStore.timeBuffered = timeBuffered;
        }
      }
    },
  };
}
function useAudioApi() {
  musicStore.setCurrentVolume(audioRef.value?.volume || 0.5);
  watchEffect(() => {
    if (audioRef.value) {
      audioRef.value.volume = musicStore.currentVolume;
    }
  });
  const volume = computed({
    get() {
      return musicStore.currentVolume * 100;
    },
    set(val) {
      musicStore.setCurrentVolume(val / 100);
    },
  });
  return {
    volume,
    handlerVoice(isMute: boolean) {
      musicStore.hanlderMute(isMute);
    },
    handlerLoopSong() {
      const list = [0, 1, 2];
      musicStore.loopModel = list[(musicStore.loopModel + 1) % list.length];
    },
    randomSongList() {
      musicStore.randomSongList();
    },
  };
}

function useAudioGetCurtime(currentTime: number) {
  return millisecondToTime(Math.floor(currentTime * 1000));
}

function useProgress() {
  const progress = computed({
    get() {
      if (!musciArrts.currentTime) return 0;
      return (musciArrts.currentTime / (musciArrts.duration / 1000)) * 100;
    },
    set(val) {
      clearTimeout(customChangeProgressTimer);
      customChangeProgressTimer = setTimeout(() => {
        customChangeProgress.value = false;
      }, 500);
      customChangeProgress.value = true;
      if (audioRef.value) {
        const time = (val * (musciArrts.duration / 1000)) / 100;
        audioRef.value.currentTime = time;
      }
    },
  });
  const timeBufferedProgress = computed(() => {
    return (musicStore.timeBuffered / (musciArrts.duration / 1000)) * 100;
  });
  let customChangeProgress = ref(false);
  let customChangeProgressTimer: any = null;
  const formatTooltip = (value: number) => {
    return millisecondToTime(value * (musciArrts.duration / 100));
  };
  return {
    progress,
    timeBufferedProgress,
    customChangeProgress,
    formatTooltip,
  };
}
</script>

<style lang="less" scoped>
.controbar-container {
  position: sticky;
  width: 100%;
  top: calc(100vh - 64px);
  z-index: 3;
  background-color: #212121;
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  .song-item {
    margin-bottom: 0;
  }

  .custom-slider-time {
    position: absolute;
    top: -4px;
    left: 0;
  }

  .slider-volume {
    .slider-style(#fff);
  }

  :deep(.icon-svg) {
    cursor: pointer;
    margin: 0 20px;

    &.mini {
      margin: 0 10px;
    }

    &.main {
      font-size: 30px;
    }

    &.random {
      &:not(:active) {
        animation: flip 0.4s ease-in-out;
      }
    }

    &.showPlayList {
      transition: all 0.5s;
    }

    &.isShowPlayList {
      transform: rotate(-180deg);
    }
  }

  .controller-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mid {
    // text-align: center;
    width: 400px;
  }

  .right {
    display: flex;
    align-items: center;

    .slider-volume {
      width: 80px;
    }
  }
}

.slider-style(@mainColor) {
  --el-slider-button-size: 15px;
  --el-slider-button-wrapper-offset: -16px;

  :deep(.el-slider__bar) {
    background-color: @mainColor;
    height: 3px;

    &:hover {
      height: 3px;
    }
  }

  :deep(.el-slider__button) {
    border-color: @mainColor;
    background-color: @mainColor;
  }

  :deep(.el-slider__runway) {
    @runwayColor: rgba(255, 255, 255, 0.4);
    // 轨道
    height: 2px;
    background-color: @runwayColor;
  }
}

@keyframes flip {
  0% {
    fill-color: #fff;
  }

  50% {
    fill-color: #fff;
    transform: rotateX(180deg);
  }

  100% {
    fill-color: inherit;
    transform: rotateX(360deg);
  }
}
</style>
