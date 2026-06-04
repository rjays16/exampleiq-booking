export default defineNuxtConfig({
  compatibilityDate: '2026-06-01',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],
  runtimeConfig: {
    public: {
      googleMapsApiKey: ''
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        }
      ]
    }
  }
})