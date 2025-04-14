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
  {{ liked ? '❤️' : '🤍' }} {{ likesCount }}
</span>

<span class="bookmark" @click="toggleBookmark">
  <img :src="bookmarkImage" alt="북마크" class="bookmark-icon" />
</span>

    </div>
  </section>
</template>





<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({ post: Object })

const myId = localStorage.getItem('userId')

const reportPost = () => {
  alert('이 게시글을 신고하시겠습니까?')
}

  // 좋아요 관련
const liked = ref(false)
const likeCount = ref(props.post.likes)

const toggleLike = async () => {
  liked.value = !liked.value
  likeCount.value += liked.value ? 1 : -1

  const endpoint = 'http://localhost:3001/likes'
  const payload = { postId: props.post.id, userId: myId }

  if (liked.value) {
    await axios.post(endpoint, payload)
  } else {
    // 이미 있는 like를 찾아서 삭제
    const res = await axios.get(`${endpoint}?postId=${props.post.id}&userId=${myId}`)
    if (res.data.length > 0) {
      await axios.delete(`${endpoint}/${res.data[0].id}`)
    }
  }
  // ✅ 서버에서 최신 좋아요 수 가져오기
  await fetchLikesCount()
}

// 좋아요 갯수
const likesCount = ref(0)

const fetchLikesCount = async () => {
  try {
    const response = await axios.get('http://localhost:3001/likes', {
      params: {
        postId: props.post.id
      }
    })
    console.log('✅ likes 데이터:', response.data)
    likesCount.value = response.data.length
  } catch (error) {
    console.error('❌ 좋아요 수 불러오기 실패:', error)
  }
}

// 북마크 관련
const bookmarked = ref(false)
const toggleBookmark = async () => {
  bookmarked.value = !bookmarked.value

  const endpoint = 'http://localhost:3001/bookmark'
  const payload = { postId: props.post.id, userId: myId }

  if (bookmarked.value) {
    await axios.post(endpoint, payload)
  } else {
    const res = await axios.get(`${endpoint}?postId=${props.post.id}&userId=${myId}`)
    if (res.data.length > 0) {
      await axios.delete(`${endpoint}/${res.data[0].id}`)
    }
  }
}

const bookmarkImage = computed(() =>
  bookmarked.value
    ? new URL('@/assets/bookmark-filled.png', import.meta.url).href
    : new URL('@/assets/bookmark-empty.png', import.meta.url).href
)


  // 최초 조회 시에 좋아요/북마크 상태 로딩
  onMounted(async () => {
    const likeRes = await axios.get(`http://localhost:3001/likes?postId=${props.post.id}&userId=${myId}`)
    liked.value = likeRes.data.length > 0

    const bookmarkRes = await axios.get(`http://localhost:3001/bookmark?postId=${props.post.id}&userId=${myId}`)
    bookmarked.value = bookmarkRes.data.length > 0

    fetchLikesCount()
  })
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
  background-color: #fff;
}

.post-header {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px; /* 원래 8px → 4px로 줄임 */
}


.post-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  color: #e74c3c;
  font-size: 14px;
}

.report {
  cursor: pointer;
  color: red;
  font-weight: bold;
}
</style>

  