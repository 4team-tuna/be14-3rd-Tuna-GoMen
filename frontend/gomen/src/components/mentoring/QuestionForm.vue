<template>
    <div class="question-form">
      <h3 class="form-title">질문 작성</h3>
  
      <input
        v-model="title"
        class="title-input"
        placeholder="질문 제목을 입력하세요"
      />
  
      <textarea
        v-model="detail"
        placeholder="질문 상세 내용을 입력하세요"
      ></textarea>
  
      <button
        :disabled="isSubmitDisabled"
        @click="submitQuestion"
      >
        작성하기
      </button>
      <p v-if="props.leftoverQuestions <= 0" class="warning">
        ⚠ 질문 가능 횟수를 모두 사용했습니다. 연장이 필요합니다.
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
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
    mentoringMemberId: {
      type: String,
      required: true
    },
    leftoverQuestions: {
      type: Number,
      required: true
    }
  })
  
  const emit = defineEmits(['submitted'])
  
  const title = ref('')
  const detail = ref('')
  
  // 버튼 비활성화 조건
  const isSubmitDisabled = computed(() =>
    !title.value.trim() || !detail.value.trim() || props.leftoverQuestions <= 0
  )
  
  const submitQuestion = async () => {
    if (props.leftoverQuestions <= 0) {
      alert('질문 가능 횟수를 모두 사용했습니다. 연장이 필요합니다.')
      return
    }
  
    await api.post('/questions', {
      mentoring_space_id: props.mentoringSpaceId,
      member_id: props.memberId,
      question_content: title.value,
      question_detail: detail.value,
      question_created_time: new Date().toISOString(),
      is_deleted: 'N'
    })
  
    await api.patch(`/mentoringMembers/${props.mentoringMemberId}`, {
      leftover_questions: props.leftoverQuestions - 1
    })
  
    title.value = ''
    detail.value = ''
    emit('submitted')
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
  .title-input {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-bottom: 12px;
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
  .warning {
    margin-top: 10px;
    font-size: 13px;
    color: red;
  }
  </style>
  