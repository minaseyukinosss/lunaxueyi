<!--
 * @Author: junjie qiu
 * @Date: 2023-07-17 13:55:22
 * @Description: 音乐播放器
-->
<template>
  <div class="music-bar">
    <div class="album-list">
      <Swiper
        loop
        :effect="'coverflow'"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="index-swiper"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="(item,index) in albumList"  :key="index">
          <img class="album-img" :src="item.img" @click="playMusic(index)">
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="music-list">
      <div class="music-item" v-for="(item,index) in albumList" :key="index" @click="playMusic(index)">
        <img class="music-img" :src="item.img">
        <div class="music-info">
          <span class="music-name">{{ item.name }}</span>
          <span class="music-desc">{{ item.desc }}</span>
        </div>
      </div>
    </div>
    <div class="player-info">
      <div class="player-cover">
        <img :src="currentSong.img" ref="playerImg"/>
        <div class="pointer"></div>
      </div>
      <div class="song-detail">
        <div class="song-name">{{ currentSong.name }}</div>
        <div class="song-desc">{{ currentSong.desc }}</div>
      </div>
    </div>
    <div class="action">
      <div class="action-bar">
        <Icon name="ic:round-skip-previous" size="20"  @click="onPrev"/>
        <Icon v-if="isPaused" name="ic:baseline-play-circle-outline" size="20" @click="onPlay"/>
        <Icon v-else name="ic:baseline-pause-circle-outline" size="20"  @click="onPause" />
        <Icon name="ic:round-skip-next" size="20" @click="onNext" />
      </div>
    </div>
  </div>
</template>
<script setup name="MusicBar">
import { useMusicPlayer } from '../hooks/player'
import { albumList } from '../const'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { EffectFade } from 'swiper'
let modules = [EffectFade]


const props = defineProps(['progressDom'])

const emits = defineEmits(['update-timer', 'update-duration', 'change-music'])

const { 
  getPlayingMusicIndex,
  getPlayerIsPaused, 
  playerSkipTo, 
  playerPlay, 
  playerPause, 
  playerSkip,
  playerJump,
} = useMusicPlayer(props, emits)

const playerImg = ref()

const isPaused = computed(() => unref(getPlayerIsPaused))

// 为所有组件共享播放器状态
const { setPausedStatus } = usePausedStatus('pausedStatus')

watch(() => unref(isPaused), (newValue) => {
  // 更新歌曲图片动画状态
  if (!newValue) {
    playerImg.value.style.animationPlayState = 'running'
  } else {
    playerImg.value.style.animationPlayState = 'paused'
  }
  // 更新播放器状态
  setPausedStatus(newValue)
})

// 轮播图实例
const albumSwiper = ref()

const onSwiper = (swiper) => {
  albumSwiper.value = swiper
}

// 当前音乐对象
const currentSong = computed(() => albumList[unref(getPlayingMusicIndex)])

watch(
  () => unref(getPlayingMusicIndex),
  (newValue) => {
    unref(albumSwiper) && albumSwiper.value.slideTo(newValue + 1)
  }
)

watch(
  () => unref(currentSong),
  () => {
    emits('change-music', unref(currentSong))
  },
  // to do 内部初始化外部歌词列表
  // 此处本来想用及时回调属性，但会导致服务端跟客户端渲染的dom数不一样
)

// 播放音乐
const playMusic = (index) => {
  playerSkipTo(index)
}

// 播放
const onPlay = () => {
  playerPlay()
}

// 暂停
const onPause = () => {
  playerPause()
}

// 上一首
const onPrev = () => {
  playerSkip('prev')
}

// 下一首
const onNext = () => {
  playerSkip('next')
}

defineExpose({ playerJump })

onMounted(() => {
  // onPlay()
})
</script>
<style lang="scss" scoped>

.music-bar {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .album-list {
    .album-img {
      width: 165px;
      height: 165px;
    }
  }

  .music-list {
    display: flex;
    flex-direction: column;

    .music-item {
      display: flex;
      padding: 8px 16px;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.02);
        // box-shadow: -8px 10px 3px -11px rgba(0, 0, 0, 0.4);
      }

      .music-img {
        width: 36px;
        height: 36px;
        border-radius: 12px;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .music-info {
        flex: 1;
        width: 0;
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        .music-name {
          font-family: "Roboto", sans-serif;
          color: var(--font-color);
          font-weight: 500;
          font-size: 10px;
        }

        .music-desc {
          font-family: "Roboto", sans-serif;
          color: #d0d2e5;
          font-weight: 400;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .player-info {
    position: relative;
    width: 100%;
    height: 68px;
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    background-color: #bae6f2;
    border-radius: 25px 25px 0 0;

    .player-cover {
      position: relative;

      img { 
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
        margin: 10px 0 10px 25px;
        border: 2px solid #fff;
        box-shadow: 0px 15px 30px -6px rgba(0, 0, 0, 0.5);
        animation: rotate-ani 5s linear infinite;
        animation-play-state: paused;
      }

      .pointer {
        position: absolute;
        top: 27px;
        width: 9px;
        height: 9px;
        margin: -6px 0 0 37px;
        background-color: #a5c8e3;
        border-radius: 50%;
        box-shadow: inset 0 0 0 1.7px #fff;
      }
    }

    .song-detail {
      flex: 1;
      width: 0;
      display: flex;
      flex-direction: column;
      padding: 8px 30px 8px 15px;

      .song-name {
        font-family: "Roboto", sans-serif;
        color: var(--font-color);
        font-weight: 500;
        font-size: 10px;
      }

      .song-desc {
        font-family: "Roboto", sans-serif;
        color: #6590ad;
        font-weight: 400;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .action {
    position: absolute;
    bottom: 0;
    color: #c5c7da;
    width: 100%;
    background-color: #fff;
    border-radius: 20px 20px 30px 30px;
    height: 52px;

    .action-bar {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 52px;

      svg {
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          transform: scale(1.3);
          color: #80cc9b;
        }
      }
    }
  }
}

.index-swiper:deep() {
  .swiper-slide{
    display: flex;
    justify-content: center;

    &:hover {
      transform: scale(1.01);
    }
  }
}

@keyframes rotate-ani {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>../player../hooks/player