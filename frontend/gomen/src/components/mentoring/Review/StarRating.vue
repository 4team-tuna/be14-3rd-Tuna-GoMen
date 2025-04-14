<template>
  <div class="star-container">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ filled: star <= modelValue }"
      @click="$emit('update:modelValue', star)"
    >
      ★
    </span>
  </div>
</template>

<script setup>
const modelValue = defineModel(); // v-model 연동용
</script>

<style scoped>
.star-container {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.star {
  font-size: 80px;
  color: lightgray;
  margin: 0 10px;
  cursor: pointer;
  transition: color 0.2s;
}

.star.filled {
  color: gold;
}
</style>
