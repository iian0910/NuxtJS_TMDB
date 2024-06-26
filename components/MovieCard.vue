<template>
  <div class="card" @click="detail(movie.id)">
    <img
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      class="card-img-top img-thumbnail"
      :alt="movie.original_title"
    >
    <div class="card-body">
      <h6 class="card-title fw-bold mt-2 mb-0 text-white">{{ movie.title }}</h6>
      <small class="release_date">{{ movie.release_date }}</small>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  movie: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['detail'])

const detail = (id) => {
  emit('detail', id)
}
</script>

<style lang="scss" scoped>
.release_date {
  color: rgba(white, 0.5);
}
</style>