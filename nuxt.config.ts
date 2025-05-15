/*
 * @Author: junjie qiu
 * @Date: 2023-03-01 00:04:07
 * @Description: file content
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-windicss',
    'nuxt-icon',
  ],
  css: ['@/assets/styles/index.scss'],
  app: {
    baseURL: '/luoxueyi/',
    head: {
      htmlAttrs: {
        lang: 'zh',
      },
      charset: 'utf-8',
      viewport:
        'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0',
      title: 'luoxueyi',
      meta: [
        {
          name: 'keywords',
          content: '罗雪苡',
        },
        {
          name: 'description',
          content: '罗雪姨',
        },
        {
          'http-equiv': 'x-ua-compatible',
          content: 'IE=edge,chrome=1',
        },
      ],
      script: [
        {
          src: '/js/bootstrap.bundle-5.0.0.alpha-min.js',
        },
        {
          src: '/js/wow.min.js',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: '/css/bootstrap-5.0.5-alpha.min.css',
        },
        {
          rel: 'stylesheet',
          href: '/css/animate.min.css',
        },
      ],
    },
  },
  build: {
    transpile: ['swiper', 'gsap'],
  },
  devServer: {
    host: '0.0.0.0'
  },
   // Production Mode
   runtimeConfig: {
    // Private config that is only available on the server
    // Config within public will be also exposed to the client
    public: {
      BASE_URL: 'http://139.196.58.92:8080/api',
      ENV: 'production',
    },
    PORT: 80,
  },
  typescript: {
    shim: false,
  },
})
