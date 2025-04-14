<template>
  <div v-if="post">
    <!-- post가 null이 아니면 게시글 내용을 렌더링 -->
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

          <div class="meta-right">
            <div v-if="isAuthor">
              <button class="edit-btn" @click="editPost"> 수정</button>
              <button class="delete-btn" @click="deletePost">삭제</button>
            </div>

            <span class="report" @click="reportPost">🚨 신고</span>
          </div>
        </div>
      </div>

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
  </div>

  <div v-else>
    <p>게시글을 불러오는 중입니다...</p>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// props를 defineProps로 정의
const props = defineProps({
  post: Object,
  isAuthor: Boolean,
})


// 이렇게 하면 더 깔끔하게 사용할 수 있어요
const post = computed(() => props.post)

const loading = ref(true)


console.log(props)

const router = useRouter()

const editPost = () => {
  router.push(`/boards/free/edit/${props.post.id}`)
}

const deletePost = async () => {
  if (!confirm('정말 삭제하시겠습니까?')) return
  try {
    await axios.delete(`http://localhost:3001/allposts/${props.post.id}`)
    alert('삭제되었습니다.')
    router.push('/boards/free')
  } catch (error) {
    console.error('삭제 실패:', error)
    alert('삭제 중 오류가 발생했습니다.')
  }
}

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
  margin-bottom: 4px;
  /* 필요에 따라 조정 */
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

/* 오른쪽 정렬 그룹 */
.meta-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 기존 edit-btn, delete-btn 제거 */
.edit-btn,
.delete-btn {
  all: unset; /* 버튼 스타일 초기화 */
  font-size: 14px;
  color: #888;
  cursor: pointer;
  margin-right: 10px; /* 간격 주기 */
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
  /* 원래 8px → 4px로 줄임 */
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