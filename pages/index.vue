<template>
  <Loading
    v-if="isLoading"
  />
  <div v-else>
    <!-- 輪播圖 -->
    <div class="container-fluid">
      <DemoArea />
    </div>
    <!-- 中間區塊 -->
    <div class="container">
      <div class="row py-5">
        <Title
          text="現正熱映"
        />
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
        <Title
          text="TOP 排行榜"
        />
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
  </div>
</template>

<script setup>
import { getAPI } from '../api/movie'
import { useRoute } from 'vue-router'
import DemoArea from '../components/DemoArea.vue'
import MovieCard from '../components/MovieCard.vue'
import Footer from '../components/Footer.vue'
import Title from '../components/Title.vue'
import Loading from '../components/Loading.vue'

const movieList = ref()
const popularList = ref([])
const listPage = ref()
const currentPage = ref()
const genreList = ref([])
const isLoading = ref(true)

const router = useRouter()

onMounted(() => {
  getMovieList()
  getPopularList()
})

const getMovieList = async () => {
  isLoading.value = true
  const data = await getAPI(`/movie/now_playing?language=zh-tw`)
  movieList.value = data.results.slice(0, 12)
  listPage.value = data.total_pages
  currentPage.value = data.page
  isLoading.value = false
}

const getPopularList = async () => {
  isLoading.value = true
  const data = await getAPI(`/movie/popular?language=zh-tw`)
  popularList.value = data.results.slice(0, 6)
  isLoading.value = false
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