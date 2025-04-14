<template>
  <div class="pagination-container">
    <button
      class="nav-button"
      @click="movePage(props.currentPage - 1)"
      :disabled="props.currentPage === 1"
    >
      이전
    </button>

    <button
      v-for="page in props.totalPages"
      :key="page"
      :class="['page-button', { active: page === props.currentPage }]"
      @click="movePage(page)"
    >
      {{ page }}
    </button>

    <button
      class="nav-button"
      @click="movePage(props.currentPage + 1)"
      :disabled="props.currentPage === props.totalPages"
    >
      다음
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number
})

const emit = defineEmits(['update:page'])

function movePage(page) {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:page', page)
  }
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 48px 0 24px;
}

.nav-button {
  background: none;
  border: none;
  font-size: 14px;
  color: #5d5fef;
  cursor: pointer;
  padding: 4px 10px;
  transition: all 0.2s;
  font-weight: 500;
}

.nav-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-button {
  background-color: transparent;
  border: 1px solid #e6e7ff;
  color: #5d5fef;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.page-button:hover {
  background-color: #f0f2ff;
}

.page-button.active {
  background-color: #5d5fef;
  color: white;
  border-color: #5d5fef;
  font-weight: bold;
}
</style>
