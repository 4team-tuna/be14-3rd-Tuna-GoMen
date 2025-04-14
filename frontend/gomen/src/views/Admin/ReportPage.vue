<template>
  <div>
    <main>
      <button class="floating-back" @click="goBack">관리자 HOME</button>
      <h2>신고관리</h2>
      <table>
        <thead>
          <tr>
            <th>신고ID</th>
            <th>회원ID</th>
            <th>게시글ID</th>
            <th>댓글ID</th>
            <th>신고자ID</th>
            <th>처리여부</th>
            <th>벌점사유</th>
            <th>벌점처리</th>
            <th>블라인드처리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in reports" :key="report.id">
            <td>{{ report.id }}</td>
            <td>{{ report.targetUserId ?? 'null' }}</td>
            <td>{{ report.postId ?? 'null' }}</td>
            <td>{{ report.commentId ?? 'null' }}</td>
            <td>{{ report.reporterId }}</td>
            <td>{{ report.status }}</td>
            <td>{{ report.category ?? '-' }}</td>
            <td class="category-select-cell">
              <select v-model="selectedCategories[report.id]" class="category-select">
                <option disabled value="">선택</option>
                <option value="불건전 게시글">🚫 불건전 게시글</option>
                <option value="광고,홍보">📢 광고/홍보</option>
                <option value="불법 게시글">⚠️ 불법 게시글</option>
                <option value="욕설,비방">💢 욕설/비방</option>
              </select>
              <button class="btn" @click="handleProcess(report.id)">처리</button>
            </td>
            <td><button class="btn" @click="handleBlind(report.id)">처리</button></td>
          </tr>
        </tbody>
      </table>
      <p class="note">※ 블라인드 처리는 게시글 또는 댓글 ID에 대한 것입니다.</p>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const router = useRouter()
const goBack = () => {
  window.history.length > 1 ? router.back() : router.push('/admin')
}

const reports = ref([])
const selectedCategories = ref({})
const categoryScoreMap = {
  '불건전 게시글': 50,
  '광고,홍보': 20,
  '불법 게시글': 100,
  '욕설,비방': 70
}

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/reports')
  reports.value = res.data
})

const handleProcess = async (reportId) => {
  const selectedCategory = selectedCategories.value[reportId]
  if (!selectedCategory) {
    alert('위반 사유를 선택해주세요.')
    return
  }

  const score = categoryScoreMap[selectedCategory]
  const report = reports.value.find(r => r.id === reportId)
  if (!report || !report.targetUserId) {
    alert('회원 정보가 없습니다.')
    return
  }

  try {
    // 신고 처리 상태 및 사유 업데이트
    await axios.patch(`http://localhost:3001/reports/${reportId}`, {
      status: 'Y',
      category: selectedCategory
    })

    // 유저 정보 조회 - id, loginId, nickname 중 하나 일치
    const usersRes = await axios.get(`http://localhost:3001/users`)
    const targetUser = usersRes.data.find(u =>
      u.id === report.targetUserId ||
      u.loginId === report.targetUserId ||
      u.nickname === report.targetUserId
    )

    if (!targetUser) {
      alert('해당 유저 정보를 찾을 수 없습니다.')
      return
    }

    const currentScore = targetUser.violationScore || 0
    const updatedScore = currentScore + score

    // 벌점 누적 및 탈퇴 처리
    await axios.patch(`http://localhost:3001/users/${targetUser.id}`, {
      violationScore: updatedScore,
      ...(updatedScore >= 100 && { isQuitted: 'Y' }) // 👈 누적 벌점 100 이상이면 탈퇴 처리
    })

    const target = reports.value.find(r => r.id === reportId)
    if (target) {
      target.status = 'Y'
      target.category = selectedCategory
    }

    let msg = `처리 완료! ${score}점 벌점이 부과되었습니다.`
    if (updatedScore >= 100) {
      msg += '\n⚠️ 누적 벌점 100점 초과로 해당 회원은 탈퇴 처리되었습니다.'
    }
    alert(msg)

  } catch (error) {
    console.error('처리 실패:', error)
    alert('처리 중 오류가 발생했습니다.')
  }
}


const handleBlind = async (reportId) => {
  try {
    const report = reports.value.find(r => r.id === reportId)
    if (!report) return
    await axios.patch(`http://localhost:3001/reports/${reportId}`, { is_blinded: 'Y' })
    report.is_blinded = 'Y'

    if (report.postId) {
      await axios.patch(`http://localhost:3001/allposts/${report.postId}`, {
        is_blinded: 'Y'
      })
    }

    alert('블라인드 처리되었습니다.')
  } catch (error) {
    console.error('블라인드 처리 실패:', error)
    alert('블라인드 처리 중 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
h2 {
  margin: 40px 0 20px;
  text-align: center;
  font-size: 28px;
  color: #444;
}
table {
  width: 90%;
  margin: 0 auto;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
th, td {
  padding: 14px 16px;
  text-align: center;
}
th {
  background-color: #7c72f0;
  color: #fff;
  font-weight: 600;
}
td {
  background-color: #f9f9f9;
  color: #333;
}
tr:nth-child(even) td {
  background-color: #f1f1fb;
}
.btn {
  background-color: #e0dbf9;
  color: #4b3e92;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn:hover {
  background-color: #5d5fef;
}
.note {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #777;
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

.category-select-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.category-select {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 13px;
  cursor: pointer;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 160px;
  text-align: center;
}

.category-select:hover {
  border-color: #7c72f0;
  box-shadow: 0 0 0 2px rgba(124, 114, 240, 0.2);
}

.category-select:focus {
  outline: none;
  border-color: #5d5fef;
  box-shadow: 0 0 0 2px rgba(93, 95, 239, 0.25);
}
</style>
