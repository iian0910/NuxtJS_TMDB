<template>
  <!-- 輪播圖 -->
  <div class="container-fluid">
    <DemoArea />
  </div>
  <!-- 中間區塊 -->
  <div class="container">
    <div class="row py-5">
      <h3 class="block_title my-3">現正熱映</h3>
      <div
        class="col-12 col-sm-6 col-lg-2 cursor-pointer mb-3"
        v-for="movie in movieList"
        :key="movie.id"
      >
        <MovieCard
          :movie="movie"
          @detail="detail"
        />
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
    <div class="row py-5">
      <h3 class="block_title my-3">TOP 排行榜</h3>
      <div
        class="col-12 col-sm-6 col-lg-2 cursor-pointer mb-3"
        v-for="movie in popularList"
        :key="movie.id"
      >
        <MovieCard
          :movie="movie"
          @detail="detail"
        />
      </div>
    </div>
  </div>
  <!-- Footer -->
  <Footer />
</template>

<script setup>
import { getMovieList, getPopularList } from '../api/movie'
import { useRoute } from 'vue-router'
import DemoArea from '../components/DemoArea.vue'
import MovieCard from '../components/MovieCard.vue'
import Footer from '../components/Footer.vue'

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