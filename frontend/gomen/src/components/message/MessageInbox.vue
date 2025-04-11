<template>
  <div class="message-inbox">
    <div class="user-list">
      <h2 class="inbox-title">쪽지함</h2>
      <button @click="goHome">홈으로 돌아가기</button>
      <div
        v-for="userId in uniqueUsers"
        :key="userId"
        class="user-item"
        @click="selectUser(userId)"
        :class="{ active: selectedUser === userId }"
      >
      {{ getUserLabel(userId) }}
      </div>
    </div>
  
<div class="message-view">
  <template v-if="selectedUser">
    <div class="message-header">
      <strong>{{ getUserLabel(selectedUser) }}와의 대화</strong>
      <div class="message-actions">
        <button @click="openModal">쪽지 보내기</button>
        <button @click="refresh">새로고침</button>
      </div>
    </div>

    <div class="conversation">
  <div
    v-for="msg in conversation"
    :key="msg.id"
    :class="['conversation-message-wrapper', String(msg.senderId) === String(myId) ? 'sent' : 'received']"
  >
  <div :class="['conversation-message', String(msg.senderId) === String(myId) ? 'sent' : 'received']">
  <div class="label">
    {{ String(msg.senderId) === String(myId) ? '발신' : '수신' }}
  </div>
    <div class="login-id">
      {{ getUserLabel(msg.senderId) }}
      </div>
      <div class="content">{{ msg.content }}</div>
      <div class="timestamp">{{ formatDateTime(msg.createdAt) }}</div>
    </div>
  </div>
</div>

  </template>
  
  <template v-else>
    <p class="placeholder">대화를 선택하세요.</p>
  </template>
</div>
  
      <!-- 쪽지 모달 -->
      <MessageModal
        v-if="showModal"
        :receiverId="Number(selectedUser)"
        :showModal="showModal"
        @close="closeModal"
        @send="sendMessage"
      />
    </div>

  </template>
  
  <script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import MessageModal from './MessageModal.vue'
import {useRouter} from 'vue-router'

const router = useRouter();
const goHome = () => {
  router.push('/main');
}

const myLoginId = localStorage.getItem('loginId');
const myId = localStorage.getItem('userId');
const loginIdMap = ref({})

const selectedUser = ref(null)
const showModal = ref(false)

const sentMessages = ref([])
const receivedMessages = ref([])

async function preloadLoginIds(messages) {
  const userIds = new Set();
  messages.forEach(msg => {
    userIds.add(String(msg.senderId));
    userIds.add(String(msg.receiverId));
  });

  for (const id of userIds) {
    if (!loginIdMap.value[id]) {
      try {
        const numericId = Number(id);
        const res = await axios.get(`http://localhost:3001/users/${numericId}`);
        loginIdMap.value[id] = res.data.loginId;  // 여기 문자열 id로!
      } catch (err) {
        console.error(`ID ${id}의 로그인 ID 불러오기 실패`, err);
        loginIdMap.value[id] = 'unknown';
      }
    }
  }
}

const uniqueUsers = computed(() => {
  const sent = sentMessages.value.map(msg => String(msg.receiverId));
  const received = receivedMessages.value.map(msg => String(msg.senderId));
  const ids = [...new Set([...sent, ...received])].filter(id => id !== String(myId));
  return ids;
});

const conversation = computed(() => {
  if (!selectedUser.value) return [];
  const selected = String(selectedUser.value);
  return [
    ...sentMessages.value.filter(msg => String(msg.receiverId) === selected),
    ...receivedMessages.value.filter(msg => String(msg.senderId) === selected)
  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
});

function formatDateTime(isoString) {
  if (!isoString) return ''
  return isoString.replace('T', ' ').slice(0, 19)
}

function getUserLabel(userId) {
  return loginIdMap.value[String(userId)] || '알 수 없음';
}

function selectUser(userId) {
  selectedUser.value = userId
}

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function sendMessage(newMsg) {
  try {
    await axios.post('http://localhost:3001/messages', {
      senderId: myId,
      receiverId: newMsg.receiverId,
      content: newMsg.content,
      createdAt: new Date().toISOString()
    })
    closeModal()
    refresh()
  } catch (err) {
    console.error('쪽지 보내기 실패:', err)
  }
}

async function refresh() {
  try {
    const res = await axios.get('http://localhost:3001/messages')
    const messages = res.data

    sentMessages.value = messages.filter(msg => msg.senderId && String(msg.senderId) === String(myId))
    receivedMessages.value = messages.filter(msg => msg.receiverId && String(msg.receiverId) === String(myId))



    await preloadLoginIds(messages)
  } catch (err) {
    console.error('새로고침 실패:', err)
  }
}

onMounted(refresh)

</script>

  
  <style scoped>
  .message-inbox {
    display: flex;
    gap: 20px;
    height: 80vh;
  }
  
  .inbox-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: center;
  color: #333;
  }

  .user-list {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  width: 15%;
  overflow-y: auto;
  border-radius: 8px;
  }

  .user-item {
  padding: 10px 12px;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border: 1px solid #e0e0e0;
  font-size: 0.95rem;
  margin-bottom: 10px;
  cursor: pointer;
}

.user-item:hover {
  background-color: #f0f0f0;
}

.user-item.active {
  background-color: #e6f7ff;
  border-color: #1890ff;
  font-weight: bold;
  color: #1890ff;
}
  
  .message-view {
    flex: 1;
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  
  .message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .message-actions button {
    margin-left: 10px;
  }
  
  .conversation {
    flex-grow: 1;
    overflow-y: auto;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
  
  .conversation-message {
  padding: 8px 12px;
  margin-bottom: 10px;
  max-width: 70%;
  border-radius: 8px;
  word-break: break-word;
  background-color: #f1f1f1;
  position: relative;
}

.conversation-message.sent {
  align-self: flex-end;
  background-color: #daf1ff;
}

.conversation-message.received {
  align-self: flex-start;
  background-color: #f1f1f1;
}

.login-id {
  font-weight: bold;
  margin-bottom: 4px;
}

.timestamp {
  font-size: 0.75rem;
  color: #999;
  text-align: right;
  margin-top: 4px;
}

.label {
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 4px;
  color: white;
}

.sent .label {
  background-color: #ff4d4f; /* 빨간색 */
}

.received .label {
  background-color: #1890ff; /* 파란색 */
}
  
  .placeholder {
    color: #888;
  }
  </style>
  