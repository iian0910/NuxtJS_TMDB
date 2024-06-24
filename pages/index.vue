<template>
  <div class="container">
    <select
      class="form-select"
      v-model="currentLanguage"
      @change="changeLang"
    >
      <option value="zh-tw">中文</option>
      <option value="en">English</option>
    </select>
    <div class="row">
      <div
        class="col-12 col-sm-6 col-lg-3"
        v-for="movie in movieList"
        :key="movie.id"
      >
        <div class="card" @click="detail(movie.id)">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
            class="card-img-top img-thumbnail"
            :alt="movie.original_title"
          >
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
          </div>
        </div>
      </div>
    </div>
    <pagination
      :listPage="listPage"
      :currentPage="currentPage"
      @update:page="goToPage" 
    />
  </div>
</template>

<script setup>
import { getMovieList, getMovieDetail } from '../api/movie'
import { useRoute } from 'vue-router'
import pagination from '../components/pagination.vue'

const movieList = ref()
const listPage = ref()
const currentPage = ref()
const currentLanguage = ref('zh-tw')

const router = useRouter()

onMounted(() => {
  init('zh-tw')
})

const init = async (lang) => {
  const data = await getMovieList(`/movie/now_playing?language=${lang}`)
  movieList.value = data.results
  listPage.value = data.total_pages
  currentPage.value = data.page
}

const detail = (id) => {
  router.push({ name: 'detail-id', params: { id } })
}

const changeLang = () => {
  init(currentLanguage.value)
}

const goToPage = async (page) => {
  const data = await getMovieList(`/movie/now_playing?language=${currentLanguage.value}&page=${page}`)
  movieList.value = data.results
  listPage.value = data.total_pages
  currentPage.value = data.page
}
</script>

<style lang="scss" scoped>
</style>