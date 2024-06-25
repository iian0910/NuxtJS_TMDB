<template>
  <!-- 輪播圖 -->
  <div class="container-fluid">
    <DemoArea />
  </div>
  <div class="container">
    <!-- 現正熱映 -->
    <div class="row">
      <h3 class="block_title my-3">現正熱映</h3>
      <div
        class="col-12 col-sm-6 col-lg-2 cursor-pointer mb-3"
        v-for="movie in movieList"
        :key="movie.id"
      >
        <div class="card" @click="detail(movie.id)">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            class="card-img-top img-thumbnail"
            :alt="movie.original_title"
          >
          <div class="card-body">
            <h6 class="card-title fw-bold mt-2 mb-0">{{ movie.title }}</h6>
            <small class="text-muted">{{ movie.release_date }}</small>
          </div>
        </div>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="goToNowPlayPage()"
        >
          More...
        </button>
      </div>
    </div>
    <!-- TOP 排行榜 -->
    <div class="row">
      <h3 class="block_title my-3">TOP 排行榜</h3>
      <div
        class="col-12 col-sm-6 col-lg-2 cursor-pointer mb-3"
        v-for="movie in popularList"
        :key="movie.id"
      >
        <div class="card" @click="detail(movie.id)">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            class="card-img-top img-thumbnail"
            :alt="movie.original_title"
          >
          <div class="card-body">
            <h6 class="card-title fw-bold mt-2 mb-0">{{ movie.title }}</h6>
            <small class="text-muted">{{ movie.release_date }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getMovieList, getPopularList } from '../api/movie'
import { useRoute } from 'vue-router'
import DemoArea from '../components/DemoArea.vue'

const movieList = ref()
const popularList = ref([])
const listPage = ref()
const currentPage = ref()
const genreList = ref([])

const router = useRouter()

onMounted(() => {
  initMovieList()
  initPopularList()
})

const initMovieList = async () => {
  const data = await getMovieList(`/movie/now_playing?language=zh-tw`)
  movieList.value = data.results.slice(0, 12)
  listPage.value = data.total_pages
  currentPage.value = data.page
}

const initPopularList = async () => {
  const data = await getPopularList(`/movie/popular?language=zh-tw`)
  popularList.value = data.results.slice(0, 6)
}

const detail = (id) => {
  router.push({ name: 'detail-id', params: { id } })
}

const goToNowPlayPage = () => {
  router.push({ name: 'nowPlay', path:'/nowPlay' })
}
</script>

<style lang="scss" scoped>
</style>