<!-- CommentList.vue -->
<template>
  <section class="comments" v-if="comments && comments.length">
    <div class="comment" v-for="comment in comments" :key="comment.id">
      <div class="comment-header">
        <strong>{{ comment.writer }}</strong>
        <span class="report" @click="reportComment(comment.id)">🚨 신고</span>
      </div>
      <p>{{ comment.content }}</p>
      <span class="comment-date">{{ comment.date }}</span>
    </div>
  </section>
</template>

  
<script setup>
const props = defineProps({
  comments: {
    type: Array,
    default: () => [], // <-- 기본값 설정!
  },
})

const reportComment = (id) => {
  alert(`댓글 (ID: ${id})을 신고하시겠습니까?`)
}
</script>

  
  <style scoped>
.comments {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 50px; /* 좌우 여백 추가 */
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
}

  .report {
    font-size: 12px;
    cursor: pointer;
    color: red;
    font-weight: bold;
  }
  </style>
  