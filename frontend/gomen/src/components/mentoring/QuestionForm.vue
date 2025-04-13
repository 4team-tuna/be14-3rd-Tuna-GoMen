<template>
    <div class="question-form">
      <h3 class="form-title">질문 작성</h3>
      <textarea
        v-model="content"
        placeholder="멘토에게 궁금한 내용을 입력하세요"
      ></textarea>
  
      <button :disabled="!content.trim()" @click="submitQuestion">
        작성하기
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import api from '@/api'
  
  const props = defineProps({
    mentoringSpaceId: {
      type: String,
      required: true
    },
    memberId: {
      type: [String, Number],
      required: true
    },
    leftoverQuestions: {
        type: Number,
        required: true
    }
  })
  
  const emit = defineEmits(['submitted'])
  
  const content = ref('')
  
  const submitQuestion = async () => {
    if (!content.value.trim()) return

    await api.post('/questions', {
        mentoring_space_id: props.mentoringSpaceId,
        member_id: props.memberId,
        question_content: content.value,
        question_created_time: new Date().toISOString(),
        is_deleted: 'N'
    })

    await api.patch(`/mentoringMembers/${props.memberId}`, {
        leftover_questions: props.leftoverQuestions - 1
    })

    content.value = ''
    emit('submitted') // 작성 후 새로고침용 콜백
    }
  </script>
  
  <style scoped>
  .question-form {
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
    background-color: #fff;
  }
  .form-title {
    font-size: 18px;
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
  