<template>
  <div class="container">
    <div class="row">
      <!-- 現正熱映 -->
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
    </div>
    <Pagination
      :listPage="listPage"
      :currentPage="currentPage"
      @update:page="goToPage" 
    />
  </div>
</template>

<script setup>
import { getAPI } from '../api/movie'
import { useRoute } from 'vue-router'
import Pagination from '../components/Pagination.vue'

const movieList = ref()
const listPage = ref()
const currentPage = ref()

const router = useRouter()

onMounted(() => {
  getMovieList()
})

const getMovieList = async () => {
  const data = await getAPI(`/movie/now_playing?language=zh-tw`)
  movieList.value = data.results
  listPage.value = data.total_pages
  currentPage.value = data.page
}

const detail = (id) => {
  router.push({ name: 'detail-id', params: { id } })
}

const goToPage = async (page) => {
  const data = await getAPI(`/movie/now_playing?language=zh-tw&page=${page}`)
  movieList.value = data.results
  listPage.value = data.total_pages
  currentPage.value = data.page
}
</script>

<style lang="scss" scoped>
</style>