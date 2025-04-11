<template>
    <!-- 모달 창 -->
    <div v-if="showModal" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <h3>쪽지 보내기</h3>
  
        <label>받는 사람 (loginId)</label>
        <input v-model="messageTo" placeholder="닉네임 또는 ID 입력" />
  
        <label>내용</label>
        <textarea v-model="messageContent" rows="5" placeholder="보낼 내용을 입력하세요."></textarea>
  
        <div class="modal-actions">
          <button @click="send">보내기</button>
          <button @click="close">취소</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    showModal: Boolean,
    receiverId: Number
  })
  
  const emits = defineEmits(['close', 'send'])
  
  const messageTo = ref('')
  const messageContent = ref('')
  
  function close() {
    emits('close')
    messageTo.value = ''
    messageContent.value = ''
  }
  
  async function send() {
  if (!messageTo.value || !messageContent.value) {
    alert('모든 항목을 입력해주세요!')
    return
  }

  try {
    // 입력된 loginId 기준으로 사용자 정보 조회
    const userRes = await axios.get(`http://localhost:3001/users?loginId=${messageTo.value}`)
    const user = userRes.data[0] // loginId는 고유하다고 가정

    if (!user) {
      alert('해당 로그인 ID를 가진 사용자를 찾을 수 없습니다.')
      return
    }

    // const token = localStorage.getItem('token')
    // const senderId = 9 // 현재 로그인한 사용자 ID

    // 실제 쪽지 전송 요청은 여기선 안 보냄
    // 대신 메시지 내용을 emit으로 상위 컴포넌트로 전달
    emits('send', {
      receiverId: user.id,
      content: messageContent.value
    })

    alert('쪽지 전송 완료!')
    close()
  } catch (error) {
    console.error('쪽지 전송 실패:', error)
    alert('전송 중 오류 발생')
  }
}

  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 25px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .modal-content h3 {
    margin-top: 0;
    margin-bottom: 15px;
  }
  
  .modal-content input,
  .modal-content textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .modal-actions {
    text-align: right;
  }
  
  .modal-actions button {
    margin-left: 10px;
    padding: 8px 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #000;
    color: white;
  }
  </style>
  