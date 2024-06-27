<template>
  <div class="container">
    <button
      type="button"
      class="btn btn-outline-danger btn-sm my-3"
      @click="goBack"
    >
      回首頁
    </button>
    <div class="row">
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
import Title from '../components/Title.vue'

const movieList = ref()
const listPage = ref()
const currentPage = ref()

const router = useRouter()

onMounted(() => {
  getNowPlayList()
})

const getNowPlayList = async () => {
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

const goBack = () => {
  router.push({ name: 'index', path:'/' })
}
</script>

<style lang="scss" scoped>
</style>