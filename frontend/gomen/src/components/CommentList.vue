<template>
  <section class="comments" v-if="comments && comments.length">
    <div class="comment" v-for="comment in comments" :key="comment.id">
      <div class="comment-header">
        <strong>{{ comment.writer }}</strong>
        <span class="report" @click="reportComment(comment.id)">🚨 신고</span>
      </div>
      <p>{{ comment.content }}</p>
      <span class="comment-date">{{ comment.date }}</span>

      <!-- 답글 달기 버튼 -->
      <button class="reply-btn" @click="toggleReply(comment.id)">
        {{ replyTargetId === comment.id ? '답글 취소' : '답글 달기' }}
      </button>

      <!-- 답글 입력창 -->
      <div v-if="replyTargetId === comment.id" class="reply-form">
        <textarea v-model="replyText" rows="2" placeholder="답글을 입력하세요." />
        <button @click="submitReply(comment.id)">등록</button>
      </div>

      <!-- 대댓글 목록 -->
      <div v-if="comment.replies && comment.replies.length" class="replies">
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

const replyTargetId = ref(null)
const replyText = ref('')

const toggleReply = (commentId) => {
  replyTargetId.value = replyTargetId.value === commentId ? null : commentId
  replyText.value = ''
}

const submitReply = (commentId) => {
  const targetComment = props.comments.find((c) => c.id === commentId)
  if (!replyText.value.trim()) return

  const newReply = {
    id: Date.now(),
    writer: '익명',
    content: replyText.value,
    date: new Date().toLocaleString(),
  }

  if (!targetComment.replies) {
    targetComment.replies = []
  }
  targetComment.replies.push(newReply)

  replyText.value = ''
  replyTargetId.value = null
}

const reportComment = (id) => {
  alert(`댓글 (ID: ${id})을 신고하시겠습니까?`)
}
</script>

<style scoped>
.comments {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 24px;
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
}

.comment-date {
  font-size: 12px;
  color: #aaa;
  margin-top: 4px;
  display: inline-block;
  margin-right: 12px; /* 날짜 오른쪽 여백 추가 */
}

.report {
  font-size: 12px;
  cursor: pointer;
  color: red;
  font-weight: bold;
}

.reply-btn {
  font-size: 12px;
  color: #4f46e5;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 6px;
  padding: 0;
}

.reply-form {
  margin-top: 10px; /* 댓글과 입력창 사이 간격 */
  display: flex;
  flex-direction: column;
  gap: 8px; /* textarea와 버튼 사이 간격 */
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
</style>

  