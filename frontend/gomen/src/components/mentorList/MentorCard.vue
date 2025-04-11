<template>
  <div class="mentor-card border rounded-2xl shadow-md p-5 w-full max-w-sm bg-white">
    <div class="flex items-center gap-4 mb-4">
      <img
        :src="mentor.image"
        alt="profile"
        class="w-16 h-16 rounded-full object-cover shrink-0 border"
      />
      <div class="flex flex-col">
        <h3 class="font-bold text-base leading-tight">{{ mentor.name }}</h3>
        <div class="text-yellow-400 text-sm">⭐ {{ mentor.rating }}</div>
      </div>
    </div>
    <div class="text-sm font-semibold text-gray-800 mb-1">{{ mentor.title }}</div>
    <div class="text-xs text-gray-500 mb-1">{{ mentor.skills }}</div>
    <div class="text-xs text-gray-600 mb-3 leading-snug">{{ mentor.description }}</div>
    <button class="mt-auto px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
      멘토 신청
    </button>
  </div>
</template>

<script>
export default {
  name: 'MentorCard',
  props: {
    mentor: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.mentor-card {
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.mentor-card:hover {
  transform: translateY(-4px);
}
</style>
