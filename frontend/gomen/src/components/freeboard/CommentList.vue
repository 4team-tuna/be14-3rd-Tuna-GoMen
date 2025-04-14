<template>
  <section class="comments" v-if="comments.length">
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <div class="comment-header">
        <strong>{{ comment.writer }}</strong>

        <!-- 수정 중이 아닐 때만 버튼들 보이게 -->
        <div class="comment-actions" v-if="editTargetId !== comment.id">
          <span
            v-if="comment.writer !== nickname"
            class="report"
            @click="reportComment(comment.id)"
            >🚨 신고</span
          >
          <span
            v-if="comment.writer === nickname"
            class="edit-delete"
            @click="startEdit(comment)"
            >수정</span
          >
          <span
            v-if="comment.writer === nickname"
            class="edit-delete"
            @click="emit('delete-comment', comment.id)"
            >삭제</span
          >
        </div>
      </div>

      <!-- 댓글 본문 또는 수정 폼 -->
      <div v-if="editTargetId === comment.id" class="edit-form">
        <textarea v-model="editText" rows="2" />
        <div class="edit-btns">
          <button class="save-btn" @click="submitEdit(comment.id)">저장</button>
          <button class="cancel-btn" @click="cancelEdit">취소</button>
        </div>
      </div>
      <p v-else>{{ comment.content }}</p>

      <!-- 날짜 -->
      <span class="comment-date" v-if="editTargetId !== comment.id">{{ comment.date }}</span>

      <!-- 답글 버튼 -->
      <button
        class="reply-btn"
        v-if="editTargetId !== comment.id"
        @click="toggleReply(comment.id)"
      >
        {{ replyTargetId === comment.id ? "답글 취소" : "답글 달기" }}
      </button>

      <!-- 대댓글 작성 -->
      <div v-if="replyTargetId === comment.id" class="reply-form">
        <textarea
          v-model="replyText"
          rows="2"
          placeholder="답글을 입력하세요."
        />
        <button @click="submitReply(comment.id)">등록</button>
      </div>

      <!-- 대댓글 리스트 -->
      <div v-if="comment.replies?.length" class="replies">
        <div class="reply" v-for="reply in comment.replies" :key="reply.id">
          <div class="reply-header">
            <strong>{{ reply.writer }}</strong>
            <button class="delete-reply-btn" @click="confirmDeleteReply(comment.id, reply.id)">✖</button>
          </div>
          <p class="reply-content">{{ reply.content }}</p>
          <span class="comment-date">{{ reply.date }}</span>
        </div>
      </div>
    </div>
  </section>
</template>



<script setup>
import { ref, defineEmits } from 'vue'

const props = defineProps({
  comments: Array,
})
const emit = defineEmits(['add-reply', 'edit-comment', 'delete-comment', 'delete-reply'])

const nickname = ref(JSON.parse(localStorage.getItem('user'))?.nickname)

const replyTargetId = ref(null)
const replyText = ref('')
const editTargetId = ref(null)
const editText = ref('')

const toggleReply = (commentId) => {
  replyTargetId.value = replyTargetId.value === commentId ? null : commentId
  replyText.value = ''
}

const submitReply = (commentId) => {
  if (!replyText.value.trim()) return
  const reply = {
    id: Date.now(),
    writer: nickname.value || '익명',
    content: replyText.value,
    date: new Date().toISOString(),
  }
  emit('add-reply', { commentId, reply })
  replyText.value = ''
  replyTargetId.value = null
}

const reportComment = (id) => {
  alert(`댓글 (ID: ${id})을 신고하시겠습니까?`)
}

const startEdit = (comment) => {
  editTargetId.value = comment.id
  editText.value = comment.content
}

const cancelEdit = () => {
  editTargetId.value = null
  editText.value = ''
}

const submitEdit = (id) => {
  if (!editText.value.trim()) return
  emit('edit-comment', { id, newContent: editText.value })
  cancelEdit()
}

const confirmDeleteReply = (commentId, replyId) => {
  const confirmed = window.confirm('정말 이 대댓글을 삭제하시겠습니까?')
  if (confirmed) {
    emit('delete-reply', { commentId, replyId })
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
  position: relative;
}

.comment-actions {
  display: flex;
  gap: 12px;
  position: absolute;
  right: 0;
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
  color: #888;
}
.edit-delete:hover {
  color: #333;
}

.comment-date {
  font-size: 12px;
  color: #aaa;
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

.edit-form {
  margin-top: 8px; /* 👈 위에 여백 추가 */
  display: flex;
  flex-direction: column;
  gap: 8px;
}


.reply-form textarea,
.edit-form textarea {
  padding: 10px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
  width: 100%;
}

.reply-form button,
.edit-btns button {
  align-self: flex-end;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
}

.edit-btns {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 8px;
}

.save-btn {
  background-color: #4f46e5;
  color: white;
  border: none;
}

.cancel-btn {
  background-color: #f3f4f6;
  color: #333;
  border: none;
}

.reply {
  background: #f3f4f6;
  padding: 10px 14px;
  border-radius: 8px;
  margin-top: 6px;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reply-content {
  margin: 4px 0;
  word-break: break-word;
}

.delete-reply-btn {
  background: none;
  border: none;
  color: #d11a2a;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
}

.delete-reply-btn:hover {
  color: #a10000;
}


</style>