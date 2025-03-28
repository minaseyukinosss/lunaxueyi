<template>
  <div id="header" class="header">
    <div class="header__navwrap">
      <div class="header__navbar">
        <div class="header__navbar-logo">
          <!-- <NuxtLink to="/">
            <img class="home-logo" src="@/assets/images/logo.png" />
          </NuxtLink> -->
        </div>
        <div class="header__navbar-links">
          <div class="header__navbar-link" v-for="item in NAVBAR_ARR" :key="item.to">
            <NuxtLink :to="item.to">{{ item.name }}</NuxtLink>
          </div>  
        </div>
        <div class="header__navbar-btn">
          <div class="header__navbar-btn-wrap">
            <b></b>
          </div>
        </div>
      </div>
      <div class="header__panel">
        <div class="header__panel-links">
          <div class="header__panel-links__item" v-for="item in NAVBAR_ARR" :key="item.to">
            <NuxtLink :to="item.to">{{ item.name }}</NuxtLink>
          </div>
        </div>
      </div>
      <!-- <div class="header__panel-bg"></div> -->
    </div>
  </div>
</template>

<script setup>
// 设置导航变量数组：名字，地址
const NAVBAR_ARR = [
  { name: '首页', to: '/#index' },
  { name: '音乐盒', to: '/#music' },
]

const route = useRoute()
let isCanScroll= ref(false)

watch(
  () => route.href,
  () => {
    let header = document.getElementById('header')
    header.classList.add('sticky')

    onClickNavBar()
    onClickSideNavBar()
    onScroll()
  }
)

onMounted(() => {
  onClickNavBar()
  onClickSideNavBar()
  onScroll()
  isShowSideNavbar()

  window.onresize = () => {
    return (() => {
      onScroll()
    })()
  }
  window.onscroll = onScroll
})

onUnmounted(() => {
  window.document.removeEventListener('scroll', onClickNavBar)
  window.document.removeEventListener('scroll', onClickSideNavBar)
})

const onClickNavBar = () => {
  let nodeList = document.querySelectorAll('.header__navbar-link')
  for (let i = 0; i < nodeList.length; i++) {
    let currLink = nodeList[i]
    const navbarItem = NAVBAR_ARR[i]
    if (route.href === navbarItem.to || (navbarItem.to === '/#index' && route.href === '/')) {
      currLink.classList.add('header__navbar-link--active')
    } else {
      currLink.classList.remove('header__navbar-link--active')
    }
  }
}

const onScroll = () => { 
  let header = document.getElementById('header')
  let headerOffsetTop = header.offsetTop
  console.log(window.scrollY)
  if (
    ((route.href !== '/' && route.href !== '/#index') && window.scrollY !== 0) ||
    window.innerHeight >= window.innerWidth ||
    window.innerWidth <= 992
  ) {
    header.classList.add('sticky')
  } else {
    header.classList.remove('sticky')
  }
}

const isShowSideNavbar = () => {
  let element = document.querySelector('.header__navbar-btn-wrap')
  let panel = document.querySelector('.header__panel')
  element.addEventListener('click', () => {
    element.classList.toggle('header__navbar-btn-wrap--active')
    panel.classList.toggle('header__panel--active')
  })
}

const onClickSideNavBar = () => {
  let nodeList = document.querySelectorAll('.header__panel-links__item')
  for (let i = 0; i < nodeList.length; i++) {
    let currLink = nodeList[i]
    const navbarItem = NAVBAR_ARR[i]
    if (route.href === navbarItem.to || (navbarItem.to === '/#index' && route.href === '/')) {
      currLink.classList.add('header__panel-links__item--active')
    } else {
      currLink.classList.remove('header__panel-links__item--active')
    }
  }
  // 侧边导航点击后隐藏导航菜单
  let sideNavbarBtn = document.querySelector('.header__navbar-btn-wrap')
  let panel = document.querySelector('.header__panel')
  sideNavbarBtn.classList.remove('header__navbar-btn-wrap--active')
  panel.classList.remove('header__panel--active')
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 4.5rem;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  // background-color: #fff;
  

  &__navwrap {
    width: 100%;
  }

  &__navbar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.4rem 0 3.5rem;
    margin-right: 9rem;
    white-space: nowrap; // 文本不会换行
  }

  &__navbar-logo {
    img {
      height: 2.25rem;
    }
  }

  &__navbar-links {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__navbar-link {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
    margin-left: 4rem;
    border-radius: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: color 500ms;

    a {
      position: relative;
      height: 100%;
      color: #fff;
      text-decoration: none;
      font-size: 0.9rem;
      transition: all 0.3s ease-out 0s;

      &:hover {
        font-weight: bold;
      }
    }
  }

  &__navbar-btn {
    position: absolute;
    top: 20%;
    right: -6.5rem;
    z-index: 9999;
  }
  
  &__navbar-btn-wrap {
    position: relative;
    width: 23px;
    height: 23px;

    &::before, b , &::after {
      content: "";
      position: absolute;
      width: 23px;
      height: 3px;
      -webkit-transition: all 500ms;
      -o-transition: all 500ms;
      transition: all 500ms;
      background: #fff;
      right: 3px;
    }

    b {
      top: 10px;
      opacity: 1;
      -webkit-transition-duration: 700ms;
      -o-transition-duration: 700ms;
      transition-duration: 700ms;
    }

    &::before {
      top: 2px;
      -webkit-transform: rotate(0); // 支持 safari 浏览器
      -ms-transform: rotate(0); // 支持 IE 浏览器
      transform: rotate(0);
      -webkit-transform-origin: right;
      -ms-transform-origin: right;
      transform-origin: right;
    }

    &::after {
      top: 18px;
      margin-bottom: 0;
      -webkit-transform: rotate(0);
      -ms-transform: rotate(0);
      transform: rotate(0);
      -webkit-transform-origin: right;
      -ms-transform-origin: right;
      transform-origin: right;
    }
  }

  &__navbar-btn-wrap--active {
    b {
      opacity: 0;
      -webkit-transition-duration: 0ms;
      -o-transition-duration: 0ms;
      transition-duration: 0ms;
    }
    &::before {
      -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      transform: rotate(-45deg);
      -webkit-transform-origin: right;
      -ms-transform-origin: right;
      transform-origin: right;
    }
    &::after {
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      -webkit-transform-origin: right;
      -ms-transform-origin: right;
      transform-origin: right;
    }
  }

  &__panel {
    width: 24rem;
    height: 100%;
    position: fixed;
    top: 0;
    right: -24rem;
    background: #fff;
    display: flex;
    justify-content: center;
    margin-top: 4.5rem;
    // background: rgba(255, 255, 255, 0.7);
    // box-shadow: 0px 12px 25px 0px rgba(0, 0, 0, 0.1);
    // backdrop-filter: blur(15px);
    z-index: 4;
    transition: 0.5s;
    -webkit-transition: 0.5s;
  }

  &__panel--active {
    right: 0;
  }

  &__panel-links {
    width: 100%;
    font-size: 1.4rem;
    color: #3d424d;
    font-weight: bold;
    text-align: center;

    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 5rem;
      position: relative;
      border-bottom: 1px solid #e6e7eb;
      &:first-child {
        border-top: 1px solid #e6e7eb;
      }

      a {
        color: #3d424d;
        text-decoration: none;
      }
    }

    &__item--active {
      a {
        color: #3778e5;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 0.25rem;
        height: 100%;
        background: #3778e5;
      }
    }
  }

  &__panel-bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.8;
    z-index: 2;
  }

  @media screen and (min-width: 992px) {
    &__navbar-links {
      visibility: visible;
    }

    &__navbar-btn, &__panel {
      visibility: hidden;
    }
  }

  @media screen and (max-width: 992px) {
    &__navbar-links {
      visibility: hidden;
    }

    &__navbar-btn, &__panel {
      visibility: visible;
    }

    &__navbar-btn-wrap {
      &::before, b , &::after {
        background: #676b73;
      }
    }
  }

  @media screen and (max-width: 576px) {
    &__panel {
      width: 14rem;
      right: -14rem;
    }

    &__panel--active {
      right: 0;
    }
    &__navbar-links {
      visibility: hidden;
    }

    &__navbar-btn, &__panel {
      visibility: visible;
    }

    &__navbar-btn-wrap {
      &::before, b , &::after {
        background: #676b73;
      }
    }
  }
}

.sticky {
  position: fixed;
  z-index: 3;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 12px 25px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-out 0s;
  // backdrop-filter: blur(15px);

  .header__navbar-link {
    a {
      color: #676b73;

      &::after {
        background-color: #676b73;
      }
    }
  }
}

.header__navbar-link--active {
  background-color: hsla(0,0%,100%,.5);
}
</style>