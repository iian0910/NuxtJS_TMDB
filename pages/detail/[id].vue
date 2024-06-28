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
              class="badge rounded-pill bg-warning text-dark mb-3 mb-sm-0 me-2 px-3 py-1 d-inline-block"
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
        class="col-12 col-md-4 mb-3"
        v-for="review in movieReviews"
        :key="review.id"
      >
        <div
          class="card h-100 bg-transparent border-white"
        >
          <div class="card-body">
            <p class="card-text text-white">{{ spliceContent(review.content) }}</p>
            <small class="card-title text-end d-block release_date">— {{ review.author }} {{ dateTrans(review.updated_at) }}</small>
            <div class="d-flex justify-content-md-end mt-3">
              <button
                type="button"
                class="btn btn-outline-danger"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="openModal(review.content)"
              >MORE...</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border border-white bg-black text-white">
          <div class="modal-body lh-lg">
            {{reviewContent}}
          </div>
        </div>
      </div>
    </div>
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
const reviewContent = ref('')

onMounted(() => {
  getDetail()
  getMovieImages()
  getMovieReviews()
})

const dateTrans = (date) => {
  const year = new Date(date).getFullYear()
  const month = (new Date(date).getMonth() + 1).toString().padStart(2, '0')
  const day = (new Date(date).getDay()).toString().padStart(2, '0')

  return month + '/' + day + '/' + year
}

const spliceContent = (content) => {
  if(content.length > 100) {
    return content.substring(0, 180) + '...'
  }
}

const getDetail = async () => {
  isLoading.value = true
  const data = await getAPI(`/movie/${route.params.id}`)
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
  const data = await getAPI(`/movie/${route.params.id}/reviews`)
  movieReviews.value = data.results
  isLoading.value = false
}

const goBack = () => {
  router.push({ name: 'index', path:'/' })
}

const openModal = (review) => {
  reviewContent.value = review
}
</script>
