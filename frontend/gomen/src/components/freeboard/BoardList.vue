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
          <td>
  <router-link :to="`/boards/free/${post.id}`" class="router-link">{{ post.title }}</router-link>
</td>
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
  border-collapse: separate;
  border-spacing: 0 8px; /* 행 간격 */
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  text-align: center;
}

.board-table thead th {
  background-color: #f1f3f5;
  color: #333;
  font-weight: 600;
  padding: 12px;
  border: none;
  border-top: 1px solid #dee2e6;
  border-bottom: 2px solid #dee2e6;
}

.board-table tbody tr {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.board-table tbody tr:hover {
  transform: scale(1.01);
  background-color: #f8f9fa;
}

.board-table td {
  padding: 12px;
  border: none;
}

.router-link {
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease-in-out;
}

.router-link:hover {
  transform: scale(1.02);
  font-weight: 600;
  color: #222;
}

/* 페이지네이션 버튼 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #f1f3f5;
  border: none;
  padding: 8px 12px;
  margin: 0 4px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.pagination button:hover {
  background-color: #dee2e6;
}

.pagination button:focus {
  outline: none;
  background-color: #ced4da;
}



  </style>
  