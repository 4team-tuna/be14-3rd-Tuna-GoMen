<template>
  <div class="search-wrapper">
    <input
      type="text"
      class="search-input"
      placeholder="관심직무를 입력해보세요"
      v-model="searchValue"
      @input="emitSearch"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const searchValue = ref('')
const emit = defineEmits(['search'])

function emitSearch() {
  emit('search', searchValue.value)
}
</script>

<style scoped>
.search-wrapper {
  display: flex;
  align-items: center;
  border: 2px solid #ccc;
  border-radius: 32px;
  padding: 14px 24px;
  width: 100%;
  max-width: 520px;
  margin: 36px auto;
  background-color: white;
  box-sizing: border-box;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 17px;
  color: #333;
  background: transparent;
}
</style>
