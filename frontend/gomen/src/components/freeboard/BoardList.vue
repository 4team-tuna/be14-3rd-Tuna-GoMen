<template>
    <table class="board-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>글쓴이</th>
          <th>등록일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in paginated" :key="post.id">
          <td>{{ startIndex + index + 1 }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.author }}</td>
          <td>{{ post.date }}</td>
        </tr>
      </tbody>
    </table>
  
    <div class="pagination">
      <button @click="changePage(page)" v-for="page in totalPages" :key="page">
        {{ page }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    posts: Array,
    currentPage: Number,
    pageSize: Number
  })
  const emit = defineEmits(['change-page'])
  
  const startIndex = computed(() => (props.currentPage - 1) * props.pageSize)
  
  const paginated = computed(() =>
    props.posts.slice(startIndex.value, startIndex.value + props.pageSize)
  )
  
  const totalPages = computed(() =>
    Math.ceil(props.posts.length / props.pageSize)
  )
  
  const changePage = (page) => emit('change-page', page)
  </script>
  
  <style scoped>
  .board-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }
  .board-table th, .board-table td {
    border: 1px solid #ddd;
    padding: 0.5rem;
  }
  .pagination button {
    margin: 0 0.25rem;
    padding: 0.25rem 0.5rem;
  }
  </style>
  