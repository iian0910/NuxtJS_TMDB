<template>
  <h3 class="block_title my-3">{{ props.text }}</h3>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.block_title {
  color: white;
  line-height: 2;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    background-color: #ff2c1f;
    background: linear-gradient(to right, rgba(255,44,31,1) 0%,rgba(168,138,165,0) 60%,rgba(125,185,232,0) 99%);
  }
}
</style>