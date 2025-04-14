<template>
  <section class="comments" v-if="comments.length">
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <div class="comment-header">
        <strong>{{ comment.writer }}</strong>
        <!-- 신고 버튼을 댓글 작성자 본인의 댓글에 대해선 표시하지 않음 -->
        <div class="comment-actions">
          <!-- 신고 버튼은 작성자가 아닌 경우에만 표시 -->
          <span v-if="comment.writer !== nickname" class="report" @click="reportComment(comment.id)">🚨 신고</span>
          <!-- 수정/삭제 버튼은 작성자 본인만 보임 -->
          <span v-if="comment.writer === nickname" class="edit-delete" @click="editComment(comment)">수정</span>
          <span v-if="comment.writer === nickname" class="edit-delete" @click="deleteComment(comment.id)">삭제</span>
        </div>
      </div>
      <p>{{ comment.content }}</p>
      <span class="comment-date">{{ comment.date }}</span>

      <button class="reply-btn" @click="toggleReply(comment.id)">
        {{ replyTargetId === comment.id ? '답글 취소' : '답글 달기' }}
      </button>

      <!-- 대댓글 작성 -->
      <div v-if="replyTargetId === comment.id" class="reply-form">
        <textarea v-model="replyText" rows="2" placeholder="답글을 입력하세요." />
        <button @click="submitReply(comment.id)">등록</button>
      </div>

      <!-- 대댓글 리스트 -->
      <div v-if="comment.replies?.length" class="replies">
        <div class="reply" v-for="reply in comment.replies" :key="reply.id">
          <strong>{{ reply.writer }}</strong>
          <p>{{ reply.content }}</p>
          <span class="comment-date">{{ reply.date }}</span>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref } from 'vue'

const props = defineProps({
  comments: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['add-reply'])

const nickname = ref(JSON.parse(localStorage.getItem('user'))?.nickname)

const replyTargetId = ref(null)
const replyText = ref('')

const toggleReply = (commentId) => {
  replyTargetId.value = replyTargetId.value === commentId ? null : commentId
  replyText.value = ''
}

const submitReply = (commentId) => {
  if (!replyText.value.trim()) return

  const reply = {
    id: Date.now(),
    writer: '익명',
    content: replyText.value,
    date: new Date().toLocaleString(),
  }

  emit('add-reply', { commentId, reply })

  replyText.value = ''
  replyTargetId.value = null
}

const reportComment = (id) => {
  alert(`댓글 (ID: ${id})을 신고하시겠습니까?`)
}

const editComment = (comment) => {
  const newContent = prompt('수정할 내용을 입력하세요', comment.content)
  if (newContent) {
    comment.content = newContent
    // 여기서 서버에 댓글 수정 요청을 보낼 수 있습니다.
    // 예: axios.put('/comments/{commentId}', { content: newContent })
  }
}

const deleteComment = (commentId) => {
  if (confirm('정말로 삭제하시겠습니까?')) {
    // 여기서 서버에 댓글 삭제 요청을 보낼 수 있습니다.
    // 예: axios.delete('/comments/{commentId}')
    const index = comments.value.findIndex(comment => comment.id === commentId)
    if (index !== -1) {
      comments.value.splice(index, 1)  // 로컬 상태에서 삭제
    }
  }
}
</script>


<style scoped>
.comments {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 24px;
}

.comment {
  border-top: 1px solid #eee;
  padding-top: 12px;
  font-size: 14px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  position: relative;  /* 위치 조정 */
}

.comment-actions {
  display: flex;
  gap: 12px;  /* 버튼 사이의 간격 */
  position: absolute;
  right: 0;  /* 맨 오른쪽에 정렬 */
}

.report {
  font-size: 12px;
  cursor: pointer;
  color: red;
  font-weight: bold;
}

.edit-delete {
  font-size: 12px;
  cursor: pointer;
  color: #888; /* 회색 글자 */
}

.edit-delete:hover {
  color: #333; /* 호버 시 진한 회색으로 변경 */
}

.reply-btn {
  font-size: 12px;
  color: #4f46e5;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px; 
  margin-top: 6px;
  padding: 0;
}

.reply-form {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reply-form textarea {
  padding: 10px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
}

.reply-form button {
  align-self: flex-end;
  padding: 6px 12px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.replies {
  margin-top: 10px;
  padding-left: 16px;
  border-left: 2px solid #eee;
}

.reply {
  margin-top: 6px;
  font-size: 13px;
}

.comment-date {
  font-size: 12px;
  color: #aaa;
}

.comment-list {
  margin-bottom: 0;
  padding-bottom: 0;
}
</style>