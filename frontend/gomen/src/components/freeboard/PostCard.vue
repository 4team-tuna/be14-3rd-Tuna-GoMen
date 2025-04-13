<<<<<<< HEAD
<!-- PostCard.vue -->
<template>
    <section class="post-card">
      <div class="post-header">
        <span class="tag">{{ post.tag }}</span>
        <h3 class="post-title">{{ post.title }}</h3>
        <div class="post-meta">
          <span class="writer">{{ post.writer }}</span>
          <span class="date">{{ post.date }}</span>
          <span class="views">조회수 {{ post.views }}</span>
          <span class="report" @click="reportPost">🚨 신고</span>
        </div>
      </div>
  
      <p class="post-content" v-html="post.content" />
  
      <div class="post-actions">
        <span class="likes">❤️ {{ post.likes }}</span>
        <span class="bookmark">🔖</span>
      </div>
    </section>
  </template>
  
  <script setup>
  defineProps({ post: Object })
  
  const reportPost = () => {
    alert('이 게시글을 신고하시겠습니까?')
  }
  </script>
  
  <style scoped>
  /* 기존 스타일 유지 */
  .post-meta {
  font-size: 13px;
  color: #888;
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  gap: 10px; /* span 사이 간격 주기 */
}

/* 제거 필요 */
.post-meta span + span {
  margin-left: 10px;
}

  .report {
    cursor: pointer;
    color: red;
    font-weight: bold;
  }

  .post-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
=======
<template>
  <section class="post-card">
    <div class="post-header">
      <span class="tag">{{ post.category }}</span>
      <h3 class="post-title">{{ post.title }}</h3>
      <div class="post-meta">
  <div class="meta-left">
    <span class="writer">{{ post.author }}</span>
    <span class="date">{{ post.date }}</span>
    <span class="views">조회수 {{ post.views }}</span>
  </div>
  <span class="report" @click="reportPost">🚨 신고</span>
</div>

    </div>

    <!-- p 태그를 수정했습니다. -->
    <p class="post-content" v-html="post.content"></p>

    <div class="post-actions">
      <span class="likes" @click="toggleLike">
  {{ liked ? '❤️' : '🤍' }} {{ likeCount }}
</span>

<span class="bookmark" @click="toggleBookmark">
  <img :src="bookmarkImage" alt="북마크" class="bookmark-icon" />
</span>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ post: Object })

const reportPost = () => {
  alert('이 게시글을 신고하시겠습니까?')
}

const liked = ref(false)
const likeCount = ref(props.post.likes)

const toggleLike = () => {
  liked.value = !liked.value
  likeCount.value += liked.value ? 1 : -1
}

// 북마크 관련
const bookmarked = ref(false)
const toggleBookmark = () => {
  bookmarked.value = !bookmarked.value
}

// 이미지 경로는 실제 네 경로에 맞게 조정해줘야 함!
const bookmarkImage = computed(() =>
  bookmarked.value
    ? new URL('@/assets/bookmark-filled.png', import.meta.url).href
    : new URL('@/assets/bookmark-empty.png', import.meta.url).href
)

</script>

<style scoped>

.tag {
  margin-bottom: 4px; /* 필요에 따라 조정 */
}

.post-title {
  margin-top: 0;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #888;
}

.bookmark-icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s;
}

.bookmark-icon:hover {
  transform: scale(1.1);
}


.likes {
  font-size: 26px;
  cursor: pointer;    /* 클릭 가능 표시로 바뀜 */
  user-select: none;  /* 텍스트 선택 안 되게 */
  display: flex;
  align-items: center;
  gap: 6px;
}


.meta-left {
  display: flex;
  gap: 10px; /* 요소 간 적당한 간격 */
}

.post-title {
  font-size:30px;
}

.post-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 50px 70px;
>>>>>>> e62e6a571f743ea81c63f81b7de9c54042424247
  background-color: #fff;
}

.post-header {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
  gap: 8px;
}

.post-meta {
  font-size: 13px;
  color: #888;
  display: flex;
  justify-content: space-between;
}
=======
  gap: 4px; /* 원래 8px → 4px로 줄임 */
}

>>>>>>> e62e6a571f743ea81c63f81b7de9c54042424247

.post-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  color: #e74c3c;
  font-size: 14px;
}

<<<<<<< HEAD
  </style>
=======
.report {
  cursor: pointer;
  color: red;
  font-weight: bold;
}
</style>

>>>>>>> e62e6a571f743ea81c63f81b7de9c54042424247
  