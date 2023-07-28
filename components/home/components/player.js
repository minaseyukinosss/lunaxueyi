import { Howl, Howler } from 'howler'
import music1 from '~/assets/audio/yinweini.mp4'
import music2 from '~/assets/audio/toutou.mp4'
import music3 from '~/assets/audio/lalala.mp4'

export function useMusicPlayer(props, emits) {

  const playerHowl = ref()

  // 歌曲列表
  const musicList = ref([music1, music2, music3])

  // 当前播放歌曲的索引
  const playingIndex = ref(0)

  // 当前播放的歌曲
  const playingMusic = computed(() => unref(musicList)[unref(playingIndex)])

  // 播放器是否暂停
  const playerIsPaused = ref(true)

 /**
   * @description 播放
   * @param mode 模式，'new'播放新的音乐
   */ 
  const playerPlay = (mode) => {
    if (mode === 'new' || !playerHowl.value) {
       // 播放器实例
       playerHowl.value = new Howl({
        src: playingMusic.value,
        volume: 0.8,
        loop: true,
        // html5: true,
        preload: true,
        // mute: true,
        onplay: function() {
          // 根据传入的dom更新音乐时长
          emits('update-duration', formatTime(Math.round(playerHowl.value.duration())))
          // 更新音乐进度条
          requestAnimationFrame(step)
        },
      })
    } 
    playerHowl.value.play()
    playerIsPaused.value = false
  }

  /**
   * @description 暂停
   */ 
  const playerPause = () => {
    playerHowl.value.pause()
    playerIsPaused.value = true
  }

  /**
   * @description 根据指令播放上一首或下一首
   * @param {*} direction 指令 prev | next
   */  
  const playerSkip = (direction) => {
    if (direction === 'prev') {
      playingIndex.value--
      if (playingIndex.value < 0) {
        playingIndex.value = musicList.value.length - 1
      }
    } else {
      playingIndex.value++
      if (playingIndex.value >= musicList.value.length) {
        playingIndex.value = 0
      }
    }
   playerSkipTo(playingIndex.value)
  }

  /**
   * @description 根据播放列表索引跳到特定的曲目
   * @param  {Number} index 索引
   */
  const playerSkipTo = (index) => {
    playingIndex.value = index
    // 停止播放当前音乐
    if (playerHowl.value) {
      playerPause()
    }
    // 播放新的音乐
    playerPlay('new') 
  }

  function playerJump(percent) {
    // 判断是否已有播放器实例
    if (unref(playerHowl)) {
      // 存在直接请求seek函数
      seek(percent)
    } else {
      // 不存在先生成一个
      playerPlay()
      // 再请求seek函数
      seek(percent)
    }
  }

  /**
   * @description 根据进度条百分比设置当前音乐播放的位置
   * @param  {Number} percent 歌曲跳过的百分比
   */
  function seek(percent) {
    if (playerHowl.value.playing()){
      playerHowl.value.seek(playerHowl.value.duration() * percent)
    }
  }

  /**
   * @description 更新音乐播放进度
   */
  const step = () => {
    const seek = playerHowl.value.seek() || 0
    const timeInfo = {
      time: seek,
      formatTime: formatTime(Math.round(seek))
    }
    emits('update-timer', timeInfo)
    props.progressDom.style.width = (((seek / playerHowl.value.duration()) * 100) || 0) + '%'
    if (playerHowl.value.playing()) {
        requestAnimationFrame(step)
    }
  }

  /**
   * @description 将时间格式从秒转换为M:SS。
   * @param  {Number} secs 秒数转换
   * @return {String} 格式化的时间
   */
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = (secs - minutes * 60) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  // 获取当前播放音乐的索引值
  const getPlayingMusicIndex = computed(() => unref(playingIndex))

  // 获取当前播放器是否为暂停状态
  const getPlayerIsPaused = computed(() => unref(playerIsPaused))

  return { getPlayingMusicIndex, getPlayerIsPaused, playerSkipTo, playerPlay, playerPause, playerSkip, playerJump }
}
 

