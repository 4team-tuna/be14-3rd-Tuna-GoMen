<template>
    <div class="answer-form">
      <h3 class="form-title">답변 작성</h3>
      <textarea
        v-model="content"
        placeholder="답변 내용을 입력하세요"
      ></textarea>
      <button :disabled="!content.trim()" @click="submitAnswer">
        작성하기
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import api from '@/api'
  
  const props = defineProps({
    questionId: {
      type: String,
      required: true
    }
  })
  
  const emit = defineEmits(['submitted'])
  
  const content = ref('')
  const mentor = JSON.parse(localStorage.getItem('user')) // 로그인 멘토
  
  const submitAnswer = async () => {
    if (!content.value.trim()) return
  
    await api.post('/answers', {
      question_id: props.questionId,
      user_id: mentor.id,
      answer_content: content.value,
      answer_created_time: new Date().toISOString(),
      is_deleted: 'N'
    })
  
    content.value = ''
    emit('submitted') // AnswerList 갱신용 이벤트
  }
  </script>
  
  <style scoped>
  .answer-form {
    margin-top: 24px;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
  }
  .form-title {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  textarea {
    width: 100%;
    height: 100px;
    resize: none;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-bottom: 12px;
  }
  button {
    background-color: #5865F2;
    color: white;
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  