<template>
  <div class="question-preview">
    <div class="left">
      <p class="author">작성자: {{ question.writer_name }}</p>
      <p class="content">{{ question.question_content }}</p>
    </div>
    <div class="right">
      <p class="date">{{ formatDateTime(question.question_created_time) }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: {
    type: Object,
    required: true,
  }
})

const formatDateTime = (dateStr) => {
  const d = new Date(dateStr)
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()} ${d.getHours()}시 ${d.getMinutes()}분`
}
</script>

<style scoped>
.question-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px 20px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  transition: box-shadow 0.2s ease;
}
.question-preview:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.author {
  font-size: 14px;
  color: #444;
  font-weight: 500;
}

.content {
  font-size: 15px;
  color: #222;
}

.right {
  font-size: 14px;
  color: #999;
  white-space: nowrap;
}
</style>
