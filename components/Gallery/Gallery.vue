<!--
 * @Author: junjie qiu
 * @Date: 2023-08-30 14:15:15
 * @Description: 舞动的画廊
-->
<template>
  <div class="gallery">
    <div class="gallery-wrap">
      <figure v-for="(item,index) in galleryList" :key="index">
        <img :src="item.img" :alt="item.alt" :title="item.title">
        <figcaption>{{ item.desc }}</figcaption>
      </figure>
    </div>
  </div>
</template>
<script setup lang="ts" name="Gallery" >
import { galleryList } from './src/const'

onMounted(() => {
  const obj: HTMLElement = document.querySelector(".gallery-wrap") as HTMLElement
    const time = 10000

    const animStart = () => {
      if (!obj?.classList.contains("active")) {
        obj?.classList.add("active")
        setTimeout(() => {
          animEnd()
        }, time)
      }
    }

    const animEnd = () => {
      obj?.classList.remove("active")
      obj?.offsetWidth
    }

    window.addEventListener("scroll", () => {
      animStart()
    })

    window.addEventListener("resize", animStart)

    animStart()

})
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Kalam:wght@400&display=swap");

.gallery {
  width: 100%;
  min-height: 100vh;
  color: #222;
	font-family: "Kalam", sans-serif;
  background-image: url("https://images.unsplash.com/photo-1531685250784-7569952593d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMyOTE2OTh8&ixlib=rb-4.0.3&q=85&w=2000");
  background-size: cover;
	overscroll-behavior: none;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .gallery-wrap {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    max-width: 100vw;
    padding: 20px;
  }

  figure {
    --angle: 3deg;
    --count: 5;
    --duration: 1s;
    --delay: calc(-0.5 * var(--duration));
    --direction: alternate;
    --pin-color: red;

    position: relative;
    display: inline-block;
    margin: 0;
    padding: 0.5rem;
    border-radius: 5px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
    width: 100%;
    height: auto;
    text-align: center;
    background: floralwhite;

    background-image: url("https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMyOTE4ODl8&ixlib=rb-4.0.3&q=80&w=400");
    background-size: cover;
    background-position: center;

    transform-origin: center 0.22rem;
    will-change: transform;
    break-inside: avoid;
    overflow: hidden;
    outline: 1px solid transparent;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 1;
    user-select: none;

    &::after {
      position: absolute;
      top: 0.22rem;
      left: 50%;
      width: 0.7rem;
      height: 0.7rem;
      content: "";
      background: var(--pin-color);
      border-radius: 50%;
      box-shadow: -0.1rem -0.1rem 0.3rem 0.02rem rgba(0, 0, 0, 0.5) inset;
      filter: drop-shadow(0.3rem 0.15rem 0.2rem rgba(0, 0, 0, 0.5));
      transform: translateZ(0);
      z-index: 2;
    }

    img {
      aspect-ratio: 1 /1;
      width: 100%;
      object-fit: cover;
      display: block;
      background: lavender;
      border-radius: 5px;
      margin-bottom: 10px;
      z-index: 1;
    }

    &:nth-child(7n) {
      --duration: 1s;
      --pin-color: crimson;
    }
    &:nth-child(7n + 1) {
      --duration: 1.8s;
      --pin-color: hotpink;
    }
    &:nth-child(7n + 2) {
      --duration: 1.3s;
      --pin-color: magenta;
    }
    &:nth-child(7n + 3) {
      --duration: 1.5s;
      --pin-color: orangered;
    }
    &:nth-child(7n + 4) {
      --duration: 1.1s;
      --pin-color: darkorchid;
    }
    &:nth-child(7n + 5) {
      --duration: 1.6s;
      --pin-color: deeppink;
    }
    &:nth-child(7n + 6) {
      --duration: 1.2s;
      --pin-color: mediumvioletred;
    }
    &:nth-child(3n) {
      --angle: 3deg;
    }
    &:nth-child(3n + 1) {
      --angle: -3.3deg;
    }
    &:nth-child(3n + 2) {
      --angle: 2.4deg;
    }
    &:nth-child(odd) {
      --direction: alternate;
    }
    &:nth-child(even) {
      --direction: alternate-reverse;
    }
  }

  .gallery-wrap.active figure {
    animation-duration: var(--duration), 1.5s;
    animation-delay: var(--delay),
      calc(var(--delay) + var(--duration) * var(--count));
    animation-timing-function: ease-in-out;
    animation-iteration-count: var(--count), 1;
    animation-direction: var(--direction), normal;
    animation-fill-mode: both;
    animation-name: swing, swingEnd;
  }

  @media (min-width: 800px) {
    .gallery-wrap {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
  }
}

@keyframes swing {
	0% {
		transform: rotate3d(0, 0, 1, calc(-1 * var(--angle)));
	}
	100% {
		transform: rotate3d(0, 0, 1, var(--angle));
	}
}

@keyframes swingEnd {
	to {
		transform: rotate3d(0, 0, 1, 0deg);
	}
}
</style>