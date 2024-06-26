<template>
  ...
</template>

<script setup>
import { getAPI } from '../api/movie'

const route = useRoute()

onMounted(() => {
  getDetail()
})

const getDetail = async () => {
  const data = await getAPI(`/movie/${route.params.id}`)
}
</script>

<style lang="scss" scoped>
</style>