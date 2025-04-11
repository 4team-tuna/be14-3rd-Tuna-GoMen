<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <MentorCard
      v-for="mentor in mentors"
      :key="mentor.id"
      :mentor="mentor"
    />
  </div>
</template>

<script>
import MentorCard from './MentorCard.vue'

export default {
  name: 'MentorList',
  components: {
    MentorCard
  },
  props: {
    mentors: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
/* 필요 시 추가 스타일 */
</style>
