<template>
 <div class="home-index">
  <div class="home-index__wrap" ref="main">
    <div class="home-index__wrap-info">
      <span class="info-text">HAPPY<span>WISH</span></span>
      <span class="info-text">BIRTHDAY<span>HEALTH</span></span>
      <span class="info-text">TO<span>HAPPY</span></span>
      <span class="info-text">LUO XUEYI<span><a>SUCCESS</a></span></span>
    </div>
    <div class="scroll-btn">
      <Icon class="scroll-btn__mouse" name="gg:mouse" />
      <div class="scroll-btn__arrow">
        <Icon name="material-symbols:arrow-downward-alt-rounded" />
      </div>
    </div>
  </div>
  <div class="home-index__wrap-image">
  </div>
  <div class="home-index-mask"></div>
</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const main = ref()
let gsapContext

onMounted(() => {
  gsapContext = gsap.context((self) => {
    const boxes = self.selector('.info-text')
    boxes.forEach((text) => {
      gsap.to(text, {
        backgroundSize: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: text,
          start: 'center 30%',
          end: 'center 20%',
          scrub: true,
        },
      })
    })
  }, main.value) // <- Scope!
})

onUnmounted(() => {
  gsapContext.revert() // <- Easy Cleanup!
})

</script>
<style lang="scss" scoped>

.home-index {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(137.1deg,#ecfcff 27.5%,#a6efff 94.09%);
}

.home-index__wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0 10%;
  position: relative;
  z-index: 2;
}

.home-index__wrap-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 80%;
}

.info-text {
  font-size: 5rem;
  font-weight: 600;
  letter-spacing: -.01em;
  line-height: 100%;
  margin: 0;
  z-index: 2;
  
  width: 100%;
  color: rgba($color: #6cdefa, $alpha: 0.5);
  background: linear-gradient(to right, #6cfadd, #6cfadd) no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 0%;
  transition: background-size cubic-bezier(.1,.5,.5,1) 0.5s;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;

  span {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #6cdefa;
    color: #fff;
    
    clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
    transform-origin: center;
    transition: all cubic-bezier(.1,.5,.5,1) 0.4s;
  }

  &:hover > span {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
}



.scroll-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;

  &__mouse {
    font-size: 1.5rem;
  }

  &__arrow {
    margin-top: 0.8rem;
    overflow: hidden;

    svg {
      font-size: 0.9rem;
      animation: scrollmove 1.8s ease-in-out .4s infinite;
    }
  }
}

.home-index__wrap-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center; /* 将背景图片居中显示 */
  background-image: url('@/assets/images/home/home-portrait.png');
}

.home-index-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.9;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAE1JREFUOE9j5BaRuvnr+2cGNk5eBhighM8IMhBuEhUYKAZS4jKQW0D6aeNCargMFge0cSE1Ync0DCGhSI3Ypk0sU8Nlo+lwtDykoOQGAAxCqvFBleXSAAAAAElFTkSuQmCC) repeat 0 0/0.2rem 0.2rem;
}

@keyframes scrollmove {
  0% {
    transform: translateY(-150%);
  }

  80% {
    transform: translateY(250%);
  }

  100% {
    transform: translateY(300%);
  }
}

@media screen and (max-width: 992px) {
  .info-text {
    font-size: 2rem;
  }
}
</style>