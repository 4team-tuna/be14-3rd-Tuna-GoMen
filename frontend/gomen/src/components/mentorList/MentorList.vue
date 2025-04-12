<template>
  <div class="mentor-list-wrapper">
    <div class="mentor-grid">
      <MentorCard
        v-for="mentor in mentors"
        :key="mentor.id"
        :mentor="mentor"
        @openApply="$emit('openApply', mentor)"
      />
    </div>
  </div>
</template>

<script setup>
import MentorCard from './MentorCard.vue'

defineProps({
  mentors: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.mentor-list-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}

.mentor-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px 24px; 
  width: 100%;
  max-width: 1000px;
}
</style>
