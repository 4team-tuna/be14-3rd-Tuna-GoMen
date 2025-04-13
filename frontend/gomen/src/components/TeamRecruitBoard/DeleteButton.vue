<template>
    <button class="delete-button" @click="handleDelete">
      삭제
    </button>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { defineProps } from 'vue'
  
  const router = useRouter()
  const props = defineProps({
    postId: {
      type: Number,
      required: true
    }
  })
  
  const handleDelete = async () => {
    const confirmed = confirm('정말 삭제하시겠습니까?')
    if (!confirmed) return
  
    try {
      const res = await fetch(`http://localhost:3001/teamRecruitPosts/${props.postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isDeleted: 'Y' })
      })
  
      if (!res.ok) throw new Error('삭제 실패')
  
      alert('삭제되었습니다!')
      router.push('/board/team-recruit') // 또는 router.back()
    } catch (error) {
      alert('삭제에 실패했습니다.')
      console.error(error)
    }
  }
  </script>
  
  
  <style scoped>
  .delete-button {
    padding: 0.6rem 1.2rem;
    background-color: #ef4444;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .delete-button:hover {
    background-color: #dc2626;
  }
  </style>
  