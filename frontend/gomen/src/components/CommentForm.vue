<template>
  <div class="comment-form">
    <!-- 댓글 목록 먼저 표시 -->
    <div class="comment-list" v-if="comments.length">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-header">
          <strong>{{ comment.writer }}</strong>
          <span class="report" @click="reportComment(comment.id)">🚨 신고</span>
        </div>
        <p>{{ comment.content }}</p>
        <div class="comment-footer">
          <span class="comment-date">{{ comment.date }}</span>
          <span class="reply-link">답글 달기</span>
        </div>
      </div>
    </div>

    <!-- 댓글 입력창 -->
    <textarea
      v-model="commentText"
      placeholder="댓글을 남겨보세요."
      rows="3"
    />
    <button @click="submitComment">등록</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const commentText = ref('')
const comments = ref([])

const submitComment = () => {
  if (!commentText.value.trim()) return

  const newComment = {
    id: Date.now(),
    writer: '익명',
    content: commentText.value,
    date: new Date().toLocaleString(),
  }

  comments.value.push(newComment) // 작성순서 유지 (오래된 댓글이 위로)
  commentText.value = ''
}

const reportComment = (id) => {
  alert(`댓글 (ID: ${id})을 신고하시겠습니까?`)
}
</script>

<style scoped>
.comment-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
}

.comment-form textarea {
  padding: 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  margin-top: 20px;
}

.comment-form button {
  margin-top: 10px;
  padding: 10px 16px;
  align-self: flex-end;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #3730a3;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.comment-footer {
  margin-top: 4px;
  font-size: 12px;
  color: #aaa;
}

.comment-date {
  margin-right: 12px;
}

.reply-link {
  color: #4f46e5;
  font-weight: 500;
  cursor: pointer;
}

.reply-link:hover {
  text-decoration: underline;
}

.report {
  font-size: 12px;
  cursor: pointer;
  color: red;
  font-weight: bold;
}
</style>




  