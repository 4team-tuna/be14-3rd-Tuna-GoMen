<template>
    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        이전
      </button>
  
      <button
        v-for="page in pageNumbers"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
  
      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        다음
      </button>
    </div>
  </template>
  
  <script setup>
  import { computed, defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  })
  
  const emit = defineEmits(['change-page'])
  
  const pageNumbers = computed(() => {
    const total = props.totalPages
    const current = props.currentPage
    const maxVisible = 5
  
    let start = Math.max(1, current - Math.floor(maxVisible / 2))
    let end = start + maxVisible - 1
  
    if (end > total) {
      end = total
      start = Math.max(1, end - maxVisible + 1)
    }
  
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })
  
  const goToPage = (page) => {
    if (page >= 1 && page <= props.totalPages) {
      emit('change-page', page)
    }
  }
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  button {
    padding: 0.4rem 0.8rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
    transition: 0.2s;
  }
  
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  button.active {
    background-color: #000;
    color: white;
    font-weight: bold;
  }
  </style>
  