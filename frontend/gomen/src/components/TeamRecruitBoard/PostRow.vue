<template>
    <RouterLink :to="`/recruit/${post.id}`" class="post-row">
      <div class="post-title">
        <span class="status" :class="post.isActivated === 'Y' ? '모집중' : '모집완료'">
          {{ post.isActivated === 'Y' ? '🟢' : '🔴' }}
        </span>
        {{ post.title }}
      </div>
      <div class="team-name">
        {{ post.teamName }}
      </div>
      <div class="post-info">
        <span class="nickname">{{ post.nickname }}</span>
        <span class="created-at">{{ formatDate(post.createdAt) }}</span>
      </div>
    </RouterLink>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import { RouterLink } from 'vue-router'
  
  const props = defineProps({
    post: {
      type: Object,
      required: true,
      default: () => ({
        id: 1,
        title: '프로젝트 제목',
        teamName: '팀 이름',
        nickname: '작성자',
        createdAt: '2025-04-10T12:00:00Z',
        isActivated: 'Y' // 'Y' or 'N'
      })
    }
  })
  
  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
  }
  </script>
  
  <style scoped>
  .post-row {
    display: block;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 12px;
    background-color: #fff;
    text-decoration: none;
    color: inherit;
    transition: box-shadow 0.2s ease;
  }
  
  .post-row:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .post-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
  
  .status {
    margin-right: 0.5rem;
  }
  
  .status.모집중 {
    color: green;
  }
  
  .status.모집완료 {
    color: red;
  }
  
  .team-name {
    font-size: 1rem;
    color: #444;
    margin-bottom: 0.5rem;
  }
  
  .post-info {
    font-size: 0.9rem;
    color: #777;
    display: flex;
    justify-content: space-between;
  }
  </style>
  