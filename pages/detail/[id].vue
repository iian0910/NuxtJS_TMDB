<template>
  ...
</template>

<script setup>
import { getMovieDetail } from '../api/movie'

const route = useRoute()

onMounted(() => {
  detail()
})

const detail = async () => {
  const data = await getMovieDetail(`/movie/${route.params.id}`)
}
</script>

<style lang="scss" scoped>
</style>