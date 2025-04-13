<template>
    <div class="post-row" :class="{ deleted: post.isDeleted === 'Y' }" @click="handleClick">
      <div class="post-title">
        <span
          class="status"
          :class="{
            모집중: post.isActivated === 'Y' && post.isDeleted !== 'Y',
            모집완료: post.isActivated === 'N' && post.isDeleted !== 'Y',
            삭제됨: post.isDeleted === 'Y'
          }"
        >
          {{
            post.isDeleted === 'Y'
              ? '🗑️'
              : post.isActivated === 'Y'
              ? '🟢'
              : '🔴'
          }}
        </span>
        {{ post.title }}
      </div>
  
      <div class="team-name">{{ post.teamName }}</div>
  
      <div class="post-info">
        <span class="nickname">{{ post.nickname }}</span>
        <span class="created-at">{{ formatDate(post.createdAt) }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
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
        isActivated: 'Y', // 'Y' or 'N'
        isDeleted: 'N' // 'Y' or 'N'
      })
    }
  })
  
  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
  }
  
  const handleClick = () => {
    if (props.post.isDeleted === 'Y') {
      alert('삭제된 게시글입니다.')
      return
    }
    router.push(`/recruit/${props.post.id}`)
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
    color: inherit;
    transition: box-shadow 0.2s ease;
    cursor: pointer;
  }
  
  .post-row:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .post-row.deleted {
    background-color: #f3f4f6;
    color: #9ca3af;
  }
  
  .post-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
  
  .status {
    margin-right: 0.5rem;
    font-weight: bold;
  }
  
  .status.모집중 {
    color: green;
  }
  
  .status.모집완료 {
    color: red;
  }
  
  .status.삭제됨 {
    color: #9ca3af;
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
  