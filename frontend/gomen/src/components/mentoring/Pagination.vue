<template>
    <div class="pagination-wrapper" v-if="total > 1">
      <button
        class="page-button"
        :disabled="current === 1"
        @click="goToPage(current - 1)"
      >
        ‹
      </button>
  
      <button
        v-for="page in total"
        :key="page"
        class="page-button"
        :class="{ active: current === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
  
      <button
        class="page-button"
        :disabled="current === total"
        @click="goToPage(current + 1)"
      >
        ›
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    current: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  })
  
  const emit = defineEmits(['change'])
  
  const goToPage = (page) => {
    emit('change', page)
  }
  </script>
  
  <style scoped>
  .pagination-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin-top: 32px;
  }
  
  .page-button {
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 6px 12px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .page-button:disabled {
    background-color: #e0e0e0;
    color: #aaa;
    cursor: not-allowed;
  }
  
  .page-button.active {
    background-color: #5d5fef;
    color: white;
    border-color: #5d5fef;
  }
  </style>
  