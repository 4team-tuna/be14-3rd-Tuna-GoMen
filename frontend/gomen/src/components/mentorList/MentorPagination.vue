<template>
    <div class="flex justify-center mt-12 space-x-2 text-sm">
      <button class="px-3 py-1 rounded hover:underline text-gray-500">이전</button>
      <button
        v-for="page in 5"
        :key="page"
        class="px-3 py-1 rounded hover:bg-blue-100 text-gray-700 font-semibold"
      >
        {{ page }}
      </button>
      <button class="px-3 py-1 rounded hover:underline text-gray-500">다음</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MentorPagination'
  }
  </script>
  
  <style scoped>
  /* 스타일 커스터마이징 필요 시 여기에 */
  </style>
  