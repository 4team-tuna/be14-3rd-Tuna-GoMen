<template>
  <section class="post-card">
    <div class="post-header">
      <span class="tag">{{ post.category }}</span>
      <h3 class="post-title">
        <span v-if="post.is_blinded === 'Y'">🚫 블라인드 처리된 게시글</span>
        <span v-else>{{ post.title }}</span>
      </h3>
      <div class="post-meta">
        <div class="meta-left">
          <span class="writer">{{ post.author }}</span>
          <span class="date">{{ post.date }}</span>
          <span class="views">조회수 {{ post.views }}</span>
        </div>
        <span class="report" @click="reportPost">🚨 신고</span>
      </div>
    </div>

        <!-- 블라인드 게시글은 경고 메시지만 표시 -->
    <div v-if="post.is_blinded === 'Y'" class="blinded-message">
      ⚠️ 블라인드 처리된 게시글입니다.
    </div>
    <p v-else class="post-content" v-html="post.content"></p>


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
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({ post: Object })
const myId = localStorage.getItem('userId')

// ✅ 신고 페이지로 이동만 처리
const reportPost = () => {
  router.push({
    path: '/report',
    query: {
      postId: props.post.id,
      targetUserId: props.post.author,
      type: 'post'
    }
  })
}

// 좋아요 기능
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
    const res = await axios.get(`${endpoint}?postId=${props.post.id}&userId=${myId}`)
    if (res.data.length > 0) {
      await axios.delete(`${endpoint}/${res.data[0].id}`)
    }
  }

  await fetchLikesCount()
}

// 좋아요 수
const likesCount = ref(0)
const fetchLikesCount = async () => {
  try {
    const response = await axios.get('http://localhost:3001/likes', {
      params: { postId: props.post.id }
    })
    likesCount.value = response.data.length
  } catch (error) {
    console.error('❌ 좋아요 수 불러오기 실패:', error)
  }
}

// 북마크
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
  margin-bottom: 4px;
}
.post-title {
  margin-top: 0;
  font-size: 30px;
}
.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #888;
}
.meta-left {
  display: flex;
  gap: 10px;
}
.post-content {
  margin: 16px 0;
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
  gap: 4px;
}
.post-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  color: #e74c3c;
  font-size: 14px;
}
.likes {
  font-size: 26px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 6px;
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
.report {
  cursor: pointer;
  color: red;
  font-weight: bold;
}
</style>
