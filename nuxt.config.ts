// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /*typescript: {
    typeCheck: true
  },*/
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  //css: ['~/assets/css/main.css'],
  components: [{
    path: '~/components',
    pathPrefix: false
  }],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'localhost:3000'
    }
  },
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/']
    }
  },
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ]
})