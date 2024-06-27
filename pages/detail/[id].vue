<template>
  <Loading
    v-if="isLoading"
  />
  <div class="container" v-else>
    <button
      type="button"
      class="btn btn-outline-danger btn-sm my-3"
      @click="goBack"
    >
      回首頁
    </button>
    <div class="row py-5">
      <div class="col-12 col-md-8">
        <Title
          :text="movie.title"
        />
        <div class="text-white lh-lg mb-5">
          {{ movie.overview }}
        </div>
        <div class="mb-4">
          <p class="text-white">電影分類：</p>
          <div class="ms-3">
            <span
              class="badge rounded-pill bg-warning text-dark me-2 px-3 py-1 d-inline-block"
              v-for="genre in movie.genres"
              :key="genre.id"
            >
              {{ genre.name }}
            </span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-white">製作公司：</p>
          <ul>
            <li
              class="text-white"
              v-for="company in movie.production_companies"
              :key="company.id"
            >
              {{ company.name }} ({{ company.origin_country }})
            </li>
          </ul>
        </div>
        <div class="mb-4">
          <p class="text-white">上映時間</p>
          <div class="ms-3">
            <p class="text-white">{{ movie.release_date }}</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="img-thumbnail" alt="...">
      </div>
    </div>
    <div class="row py-5">
      <Title
        text="電影劇照"
      />
      <div
        class="col-12 col-md-3 my-3"
        v-for="img in movieImgs"
        :key="img.file_path"
      >
        <img class="img-thumbnail" :src="`https://image.tmdb.org/t/p/w500${img.file_path}`" alt="">
      </div>
    </div>
    <div class="row py-5">
      <Title
        text="電影評論"
      />
      <div class="text-white" v-if="!movieReviews.length">尚無評論...</div>
      <div
        v-else
        class="card mb-3 col-12 col-md-8 my-3"
        v-for="review in movieReviews"
        :key="review.id"
      >
        <div class="row g-0">
          <div class="col-md-4">
            <img
              :src="`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`"
              class="img-fluid rounded-start"
              :alt="review.author_details.username">
          </div>
          <div class="col-md-8">
            <div class="card-body text-white lh-base ps-3">
              <h5 class="card-title">{{ review.author }}</h5>
              <p class="card-text">{{ review.content }}</p>
              <p class="card-text"><small class="text-muted">{{ review.updated_at }}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { getAPI } from '../api/movie'
import { useRoute } from 'vue-router'
import Title from '../components/Title.vue'
import Loading from '../components/Loading.vue'
import Footer from '../components/Footer.vue'
import { initAsyncCompiler } from 'sass'

const route = useRoute()
const router = useRouter()

const movie = ref([])
const movieImgs = ref([])
const movieReviews = ref([])
const isLoading = ref(true)

onMounted(() => {
  getDetail()
  getMovieImages()
  getMovieReviews()
})

const getDetail = async () => {
  isLoading.value = true
  const data = await getAPI(`/movie/${route.params.id}?language=zh-tw`)
  movie.value = data
  isLoading.value = false
}

const getMovieImages = async () => {
  isLoading.value = true
  const data = await getAPI(`/movie/${route.params.id}/images`)
  movieImgs.value = data.backdrops.slice(0, 4)
  isLoading.value = false
}

const getMovieReviews = async () => {
  isLoading.value = true
  const data = await getAPI(`/movie/${route.params.id}/reviews?language=zh-tw`)
  movieReviews.value = data.results
  isLoading.value = false
}

const goBack = () => {
  router.push({ name: 'index', path:'/' })
}
</script>
