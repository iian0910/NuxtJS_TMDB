<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" @click="prevPage" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in displayedPages"
        :key="page"
        :class="{ active: currentPage === page, disabled: page === '...' }"
      >
        <a class="page-link" @click="goToPage(page)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" @click="nextPage" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>

const props = defineProps({
  listPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:page'])

const displayedPages = computed(() => {
  const pages = []

  if(props.listPage <= 7) {
    for(let i = 1; i < props.listPage; i++) {
      pages.push(i)
    }
  } else {
    if (props.currentPage <= 4) {
      for(let i = 1; i < 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(props.listPage)
    } else if (props.currentPage >= props.listPage - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = props.listPage - 4; i <= props.listPage; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(props.listPage)
    }
  }

  return pages
})

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('update:page', props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.listPage) {
    emit('update:page', props.currentPage + 1)
  }
}

const goToPage = (page) => {
  emit('update:page', page)
}
</script>