<template>
    <div>
      <main>
        <button class="floating-back" @click="goBack">관리자 HOME</button>
        <h2>멘토 요청 내역</h2>
        <div class="request-box">
          <div
            class="row"
            v-for="(request, index) in requests"
            :key="index"
          >
            <div class="nickname">{{ request.nickname }}</div>
            <div v-if="request.done" class="done">처리 완료</div>
            <div v-else>
                <button class="btn accept" @click="confirmAction('수락', index)">수락</button>
                <button class="btn reject" @click="confirmAction('거절', index)">거절</button>

            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goBack = () => {
  window.history.length > 1 ? router.back() : router.push('/admin')
}
import { ref, onMounted } from 'vue'
import axios from 'axios'

const requests = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/mentorRequests')
  requests.value = res.data
})

const confirmAction = async (type, index) => {
  const confirmed = window.confirm(`멘토 요청을 ${type}하시겠습니까?`)
  if (!confirmed) return

  const target = requests.value[index]

  try {
    // 요청 상태 처리 완료
    await axios.patch(`http://localhost:3001/mentorRequests/${target.id}`, {
      done: true
    })
    target.done = true

    // 💡 '수락'일 경우 해당 유저의 isMentor 값도 업데이트
    if (type === '수락') {
      await axios.patch(`http://localhost:3001/users/${target.userId}`, {
        isMentor: 'Y'
      })
    }

    alert(`요청이 ${type} 처리되었습니다.`)
  } catch (error) {
    console.error(`${type} 처리 실패:`, error)
    alert('처리 중 오류가 발생했습니다.')
  }
}

</script>


  
  <style scoped>
  h2 {
  margin-top: 40px;
  text-align: center;
  font-size: 28px;
  color: #4b3e92;
}

.request-box {
  width: 360px;
  margin: 40px auto;
  background-color: #f8f7fc;
  border: 2px solid #d7d3f9;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.user-id {
  font-weight: bold;
  color: #333;
}

.done {
  background-color: #bcb9f3;
  color: white;
  font-weight: bold;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 14px;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  font-weight: bold;
  font-size: 14px;
  color: white;
  cursor: pointer;
  margin-left: 6px;
  transition: background-color 0.2s ease;
}

.accept {
  background-color: #a8a0f5; /* iris 계열 */
}

.accept:hover {
  background-color: #9087e6;
}

.reject {
  background-color: #e195d1;
}

.reject:hover {
  background-color: #d075bb;
}

.floating-back {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #7c72f0;
  color: white;
  padding: 12px 20px;
  border-radius: 30px;
  font-weight: bold;
  font-size: 14px;
  border: none;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 999;
  transition: background-color 0.3s, transform 0.2s;
}

.floating-back:hover {
  background-color: #5d5fef;
  transform: scale(1.05);
}

  </style>
  