<template>
  ...
</template>

<script setup>
import { getMovieDetail, getLang } from '../api/movie'

const route = useRoute()

onMounted(() => {
  detail()
  lang()
})

const detail = async () => {
  const data = await getMovieDetail(`/movie/${route.params.id}`)
}

const lang = async () => {
  const data = await getLang(`/watch/providers/movie`)
}
</script>

<style lang="scss" scoped>
</style>