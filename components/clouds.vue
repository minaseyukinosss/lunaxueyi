<template>
  <div ref="vantaRef" class="vanta">
    <div class="home-title">
      <p>夢を抱えて仕事をする人と社会インフラを支える</p>
      <p>～個人を幸せにする、会社を幸せにする、社会を幸せにする</p>
    </div>
  </div>
</template>

<script setup>
import * as THREE from 'three'
import CLOUDS from 'vanta/dist/vanta.clouds.min'
import { onMounted, onBeforeUnmount, ref } from 'vue'

const vantaRef = ref(null)

let vantaEffect = null

onMounted(() => {
  vantaEffect = CLOUDS({
      el: vantaRef.value,
      THREE:THREE,
      // backgroundColor: 0x000000,
      // skyColor: 0x5ca6ca,
      // cloudColor: 0x334d80,
      // skyColor: 0x5ca6ca,
      // lightColor: 0xffffff,
      // sunColor: 0x0,
      // sunGlareColor: 0x0,
      // sunlightColor: 0x0,
      mouseControls: false,
      touchControls: false,
      speed: 1.0
  })
})

onBeforeUnmount(() => {
  if(vantaEffect){
      vantaEffect.destroy()
  }
})
</script>
<style lang="scss" scoped>
.vanta {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  .home-title {
    font-size: 1.9rem;
    color: #fff;
    margin-left: 10%;
    font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
    z-index: 1;
  }
}
</style>