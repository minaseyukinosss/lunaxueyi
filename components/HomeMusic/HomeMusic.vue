<!--
 * @Author: junjie qiu
 * @Date: 2023-07-14 14:12:35
 * @Description: 首页音乐播放器
-->
<template>
  <link
  href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
  rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css?family=Fjalla+One&display=swap"
    rel="stylesheet"
  />
  <div class="music">
    <div class="bubble pink-bubble"></div>
    <div class="bubble blue-bubble"></div>
    <div class="bubble small-p-bubble"></div>
    <div class="bubble small-b-bubble"></div>
    <div class="music__wrap">
      <div class="music-item music-menu">
        <div class="header">
          <div class="discover">MUSIC</div>
          <div class="menu-line"></div>
        </div>
        <music-bar ref="musicBarRef" 
          :progress-dom="progressRef"
          @update-timer="onUpdateTimer"
          @update-duration="onUpdateDuration"
          @change-music="onChangeMusic"
        />
      </div>
      <div class="music-item music-player mt-16">
        <div class="player-header">
          <div class="back-arrow" />
          <div class="now-play">NOW PLAYING</div>
          <div class="double-dot">
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
        <div class="player-content">
          <!-- 音乐唱片效果 -->
          <img class="album-img" :src="albumImg" ref="albumImgRef" />
          <div class="album-decorate"></div>
          <div class="album-decorate__small"></div>
          <!-- 播放音乐信息 -->
          <div class="song-detail">
            <div class="song-name">{{ music.name }}</div>
            <!-- <div class="song-desc">{{ music.desc }}</div> -->
          </div>
          <!-- 歌词 -->
          <div ref="lyricsContainer" class="music-lyrics">
            <p v-for="(item, index) in musicLyric" 
              :key="index" 
              :data-index="index" 
              :ref="(el) => onSetLyricRef(el, index)"
              :class="{'active': lyricIndex === index}"
            >
              <span>{{ item.lineLyric }}</span>
            </p>
          </div>
          <!-- 播放进度条 -->
          <div class="music-progress">
            <div class="music-progress__inner" ref="progressInnerRef" @click="onClickProgress">
              <div class="music-progress__load"></div>
              <div class="music-progress__play" ref="progressRef"></div>
            </div>
          </div>
          <div class="music-duration">
            <div class="timer mr-1">{{ timer.formatTime }}</div>
            <Icon class="arrow" name="ic:sharp-near-me" />
            <div class="duration ml-1">{{ duration }}</div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>
<script setup name="HomeMusic">
import musicBar from './src/components/MusicBar.vue'
import { albumList } from './src/const'
import { lyricsList } from './src/lyrics'

const musicBarRef = ref()
const progressRef = ref()

const music = ref({})
const musicLyric = ref(lyricsList[0].list)

const onChangeMusic = (data) => {
  music.value = data
  musicLyric.value = lyricsList.find(item => item.name === unref(music).name)?.list || []
  albumImg.value = albumList.find(item => item.name === unref(music).name)?.img
}

const timer = ref({
  formatTime: '0:00',
  time: 0
})

const onUpdateTimer = (timeInfo) => {
  timer.value = timeInfo
}

const duration = ref('2:57')

const onUpdateDuration = (data) => {
  duration.value = data
}

const lyricsContainer = ref()

// 话题类型记录的ref
const lyricRefs = ref({})
const onSetLyricRef = (el, index) => {
  lyricRefs.value[index] = el
}

const lyricIndex = ref(null)

// 处理歌词高亮
const handleLyricActive = async (time) => {
  for (let i = musicLyric.value.length - 1; i >= 0; i--) {
    if (time >= musicLyric.value[i].time) {
      lyricIndex.value = i
      return
    }
  }
}

// 监听time
watch(()=> unref(timer).time, (newValue) => {
  handleLyricActive(newValue)
})

// 为何额外监听 lyricIndex 进行滚动呢
// 监听time的触发频率远高于 lyricIndex，导致滚动事件触发频率高，影响正常滚动
// 但滚动事件实际上是依赖于 lyricIndex 的变化，监听 lyricIndex 变化进行滚动会更好
watch(() => unref(lyricIndex), (index) => {
  if(index < 3) return
  lyricsContainer.value.scrollTo({
    top: lyricRefs.value[unref(lyricIndex) - 2].offsetTop,
    behavior: "smooth" // 使用平滑滚动效果
  })
})

const albumImgRef = ref()
const albumImg = ref(albumList[0].img)

// 根据 useState 的配置获取播放器状态
const { pausedStatus } = usePausedStatus()

// 监听播放器状态改变唱片动画状态
watch(
  () => unref(pausedStatus), 
  (newValue) => {
    if (!newValue) {
      albumImgRef.value.style.animationPlayState = 'running'
    } else {
      albumImgRef.value.style.animationPlayState = 'paused'
    }
  })

// 实现进度条跳转播放
const progressInnerRef = ref() 

// 点击进度条 计算跳转的位置
const onClickProgress = (e) => {
  // 播放位置的百分比
  const percent = e.offsetX / unref(progressInnerRef).offsetWidth
  musicBarRef.value.playerJump(percent)
}
</script>

<style lang="scss" scoped>
.music {
  // 泡泡颜色
  --blue-bubble: #bbe6f3;
  --small-b-bubble: #bae5f2;
  --pink-bubble: #ebc7e5;
  --font-color: #063064;
 
  width: 800px;
  // height: 600px;
  min-height: 100%;
  margin: 4.5rem auto;
  // padding: 4.5rem 0;
  position: relative;
  overflow: hidden;
  background-color: #f3fcfd;
  border-radius: 6px;
  -webkit-box-shadow: 1px 2px 29px 2px rgba(220, 244, 250, 1);
  -moz-box-shadow: 1px 2px 29px 2px rgba(220, 244, 250, 1);
  box-shadow: 1px 2px 29px 2px rgba(220, 244, 250, 1);

  &__wrap{
    height: 100%;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    z-index: 2;

    .music-item {
      width: 235px;
      height: 500px;
      border-radius: 30px;
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
    }

    .music-menu {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      // box-shadow: 2px 14px 40px -20px rgba(0, 0, 0, 0.2);

      .header {
        font-family: "Fjalla One", sans-serif;
        color: var(--font-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 235px;
        padding: 24px 24px 16px 24px;
        font-size: 22px;

        .menu-line {
          border: 1px solid var(--font-color);
          width: 25px;
          border-radius: 50px;
          position: relative;
          &:before {
            content: "";
            position: absolute;
            top: 4px;
            left: 12px;
            border: 0.05em solid;
            width: 10px;
            border-radius: 50px;
          }
          &:after {
            content: "";
            position: absolute;
            top: 4px;
            left: 5px;
            border: 0.05em solid;
            width: 5px;
            border-radius: 50px;
          }
        }
      }
    }

    .music-player {
      display: flex;
      flex-direction: column;
      background-color: #bbe6f3;
      // box-shadow: -6px 14px 40px -20px rgba(0, 0, 0, 0.2);
      .player-header {
        display: flex;
        margin-top: 25px;
        justify-content: space-between;
        align-items: center;

        .back-arrow {
          position: relative;
          width: 20px;
          height: 2px;
          margin-left: 20px;
          border-radius: 10px;
          background-color: #043165;

          &::before {
            content: '';
            position: absolute;
            width: 10px;
            height: 2px;
            top: -2.5px;
            left: 0;
            border-radius: 5px;
            background-color: #043165;
            transform: rotate(-30deg);
          }
        }
        .now-play {
          font-family: "Roboto", sans-serif;
          color: var(--font-color);
          font-weight: 500;
          font-size: 10px;
        }

        .double-dot {
          display: flex;
          margin-right: 15px;
          .dot {
            border-radius: 50%;
            width: 3px;
            height: 3px;
            background-color: #043165;
            margin-right: 5px;
          }
        }
      }
      .player-content {
        flex: 1;
        height: 0;
        margin-top: 10px;
        background-color: #fff;
        border-radius: 30px;
        box-shadow: 2px 14px 40px -20px rgba(0, 0, 0, 0.2);
        position: relative;

        .album-img {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 3px solid #fff;
          position: relative;
          left: 37px;
          top: 30px;
          object-fit: cover;
          object-position: center;
          animation: rotateImg 5s linear 0s infinite forwards;
          animation-play-state: paused;
          z-index: 10;
        }

        .album-decorate {
          width: 205px;
          height: 90px;
          border-radius: 50%;
          background-color: #eff3f8;
          position: absolute;
          top: 65px;
          left: 13px;
        }

        .album-decorate__small {
          width: 176px;
          height: 130px;
          border-radius: 50%;
          background-color: #dae3f0;
          position: absolute;
          top: 45px;
          left: 29px;
        }

        .song-detail {
          margin: 50px 0 10px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          .song-name {
            font-family: "Fjalla One", sans-serif;
            color: #063064;
            font-weight: 500;
            font-size: 16px;
          }

          .song-desc {
            margin-top: 6px;
            font-family: "Roboto", sans-serif;
            color: #aeb8cc;
            font-weight: 400;
            font-size: 12px;
          }
        }

        .music-lyrics {
          height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: scroll;
          position: relative;

          span {
            font-size: 12px;
            transition: transform 0.3s;
          }

          .active {
            color: #42b883;
            font-weight: 500;
            transform: scale(1.08);
          }
        }

        .music-duration {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Roboto", sans-serif;
          font-size: 9px;
          font-weight: 500;
          color: #c9cade;

          .timer {
            color: #063064;
          }
          .arrow {
            transform: rotate(-45deg);
            font-size: 12px;
            color: #063064;
          }
        }

        .music-progress {
          height: 6px;
          margin: 20px 10px 10px;

          &__inner {
            position: relative;
            height: 6px;
            cursor: pointer;
          }

          &__load {
            width: 100%;
            height: 6px;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
          }

          &__play {
            width: 0%;
            height: 6px;
            position: absolute;
            background-color: #0ef5da;
            border-radius: 5px;
          }
        }
      }
    }
  }

  .bubble {
    position: absolute;
    border-radius: 50%;
    z-index: 1;
  }

  .pink-bubble {
    width: 460px;
    height: 460px;
    right: -160px;
    top: -110px;
    background-color: var(--pink-bubble);
  }

  .blue-bubble {
    width: 520px;
    height: 520px;
    left: -30px;
    top: 345px;
    background-color: var(--blue-bubble);
  }

  .small-b-bubble {
    width: 50px;
    height: 50px;
    right: 40px;
    bottom: 85px;
    background-color: var(--small-b-bubble);
  }

  .small-p-bubble {
    width: 105px;
    height: 105px;
    left: -45px;
    top: 140px;
    background-color: var(--pink-bubble);
  }

  @media screen and (max-width: 992px) {
    width: 100%;

    &__wrap{ 
      flex-direction: column;
    }

    .pink-bubble {
      transform: scale(0.8);
    }
    .blue-bubble {
      top: 485px;
      left: -115px;
      transform: scale(0.8);
    }
    .small-b-bubble {
      right: -10px;
    }
  }
}

@keyframes rotateImg {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>./lyrics./src/components/const./src/lyrics