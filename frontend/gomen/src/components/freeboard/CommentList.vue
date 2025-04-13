<<<<<<< HEAD
<!-- CommentList.vue -->
<template>
  <section class="comments" v-if="comments && comments.length">
    <div class="comment" v-for="comment in comments" :key="comment.id">
=======
<template>
  <section class="comments" v-if="comments.length">
    <div v-for="comment in comments" :key="comment.id" class="comment">
>>>>>>> e62e6a571f743ea81c63f81b7de9c54042424247
      <div class="comment-header">
        <strong>{{ comment.writer }}</strong>
        <span class="report" @click="reportComment(comment.id)">🚨 신고</span>
      </div>
      <p>{{ comment.content }}</p>
      <span class="comment-date">{{ comment.date }}</span>
<<<<<<< HEAD
=======

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
>>>>>>> e62e6a571f743ea81c63f81b7de9c54042424247
    </div>
  </section>
</template>

<<<<<<< HEAD
  
<script setup>
const props = defineProps({
  comments: {
    type: Array,
    default: () => [], // <-- 기본값 설정!
  },
})
=======
<script setup>
import { ref } from 'vue'

const props = defineProps({
  comments: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['add-reply'])

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
>>>>>>> e62e6a571f743ea81c63f81b7de9c54042424247

const reportComment = (id) => {
  alert(`댓글 (ID: ${id})을 신고하시겠습니까?`)
}
</script>

<<<<<<< HEAD
  
  <style scoped>
=======
<style scoped>
>>>>>>> e62e6a571f743ea81c63f81b7de9c54042424247
.comments {
  display: flex;
  flex-direction: column;
  gap: 16px;
<<<<<<< HEAD
=======
  margin: 0 24px; /* 상단 마진 제거 */
>>>>>>> e62e6a571f743ea81c63f81b7de9c54042424247
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
<<<<<<< HEAD
}

  .report {
    font-size: 12px;
    cursor: pointer;
    color: red;
    font-weight: bold;
  }
  </style>
  
=======
  display: inline-block;
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

.comment-list {
  margin-bottom: 0;
  padding-bottom: 0;
}

</style>
>>>>>>> e62e6a571f743ea81c63f81b7de9c54042424247
