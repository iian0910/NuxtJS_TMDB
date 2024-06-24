// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/main.scss'],
  postcss: {
    plugins: { autoprefixer: true }
  },
  runtimeConfig: {
    public: {
      TMDBAccessKey: process.env.TMDB_ACCESS_KEY,
      TMDBBaseUrl: process.env.TMDB_BASE_URL
    }
  }
})