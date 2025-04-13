<template>
  <div class="mentor-list-wrapper">
    <div class="mentor-grid">
      <MentorCard
        v-for="mentor in mentorlist"
        :key="mentor.id"
        :mentor="mentor"
        :isMentor="isMentor"
        :currentUser="currentUser"
      />
    </div>
  </div>
</template>

<script setup>
import MentorCard from './MentorCard.vue'

defineProps({
  mentorlist: {
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
