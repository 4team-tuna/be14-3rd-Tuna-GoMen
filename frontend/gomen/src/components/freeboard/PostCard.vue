<template>
  <div v-if="post">
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

          <div class="meta-right" v-if="isAuthor">
            <button class="edit-btn" @click="editPost">수정</button>
            <button class="delete-btn" @click="deletePost">삭제</button>
          </div>

          <span class="report" @click="reportPost">🚨 신고</span>
        </div>
      </div>

      <div v-if="post.is_blinded === 'Y'" class="blinded-message">
        ⚠️ 블라인드 처리된 게시글입니다.
      </div>
      <p v-else class="post-content" v-html="post.content"></p>

      <div class="post-actions">
        <span class="likes" @click="toggleLike">
          {{ liked ? '❤️' : '🤍' }} {{ likeCount }}
        </span>

        <span class="bookmark" @click="toggleBookmark">
          <img :src="bookmarkImage" alt="북마크" class="bookmark-icon" />
        </span>
      </div>
    </section>
  </div>

  <div v-else>
    <p>게시글을 불러오는 중입니다...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const props = defineProps({
  post: Object,
  isAuthor: Boolean,
})

const post = computed(() => props.post)
const myId = localStorage.getItem('userId')
const router = useRouter()

const liked = ref(false)
const likeCount = ref(post.value?.likes || 0)
const bookmarked = ref(false)

const bookmarkImage = computed(() =>
  bookmarked.value
    ? new URL('@/assets/bookmark-filled.png', import.meta.url).href
    : new URL('@/assets/bookmark-empty.png', import.meta.url).href
)

const reportPost = () => {
  router.push({
    path: '/report',
    query: {
      postId: post.value.id,
      targetUserId: post.value.author,
      type: 'post'
    }
  })
}

const editPost = () => {
  router.push(`/boards/free/edit/${post.value.id}`)
}

const deletePost = async () => {
  if (!confirm('정말 삭제하시겠습니까?')) return
  try {
    await axios.delete(`http://localhost:3001/allposts/${post.value.id}`)
    alert('삭제되었습니다.')
    router.push('/boards/free')
  } catch (error) {
    console.error('삭제 실패:', error)
    alert('삭제 중 오류가 발생했습니다.')
  }
}

const toggleLike = async () => {
  liked.value = !liked.value
  likeCount.value += liked.value ? 1 : -1

  const endpoint = 'http://localhost:3001/likes'
  const payload = { postId: post.value.id, userId: myId }

  if (liked.value) {
    await axios.post(endpoint, payload)
  } else {
    const res = await axios.get(`${endpoint}?postId=${post.value.id}&userId=${myId}`)
    if (res.data.length > 0) {
      await axios.delete(`${endpoint}/${res.data[0].id}`)
    }
  }

  await fetchLikesCount()
}

const fetchLikesCount = async () => {
  try {
    const res = await axios.get('http://localhost:3001/likes', {
      params: { postId: post.value.id }
    })
    likeCount.value = res.data.length
  } catch (error) {
    console.error('❌ 좋아요 수 불러오기 실패:', error)
  }
}

const toggleBookmark = async () => {
  bookmarked.value = !bookmarked.value
  const endpoint = 'http://localhost:3001/bookmark'
  const payload = { postId: post.value.id, userId: myId }

  if (bookmarked.value) {
    await axios.post(endpoint, payload)
  } else {
    const res = await axios.get(`${endpoint}?postId=${post.value.id}&userId=${myId}`)
    if (res.data.length > 0) {
      await axios.delete(`${endpoint}/${res.data[0].id}`)
    }
  }
}

onMounted(async () => {
  const likeRes = await axios.get(`http://localhost:3001/likes?postId=${post.value.id}&userId=${myId}`)
  liked.value = likeRes.data.length > 0

  const bookmarkRes = await axios.get(`http://localhost:3001/bookmark?postId=${post.value.id}&userId=${myId}`)
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
/* 오른쪽 정렬 그룹 */
.meta-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 기존 edit-btn, delete-btn 제거 */
.edit-btn,
.delete-btn {
  all: unset;
  /* 버튼 스타일 초기화 */
  font-size: 14px;
  color: #888;
  cursor: pointer;
  margin-right: 10px;
  /* 간격 주기 */
}

.edit-btn:hover,
.delete-btn:hover {
  text-decoration: underline;
  color: #555;
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
  cursor: pointer;
  /* 클릭 가능 표시로 바뀜 */
  user-select: none;
  /* 텍스트 선택 안 되게 */
  display: flex;
  align-items: center;
  gap: 6px;
}


.meta-left {
  display: flex;
  gap: 10px;
  /* 요소 간 적당한 간격 */
}

.post-title {
  font-size: 30px;
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