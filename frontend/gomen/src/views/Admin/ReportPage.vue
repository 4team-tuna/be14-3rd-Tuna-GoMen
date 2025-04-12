<template>
    <div>
      <main>
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
              <td><button class="btn" @click="handleProcess(report.id)">처리</button></td>
              <td><button class="btn" @click="handleBlind(report.id)">처리</button></td>

            </tr>
          </tbody>
        </table>
        <p class="note">※ 블라인드 처리는 게시글 또는 댓글 ID에 대한 것입니다.</p>
      </main>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const reports = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/reports')
  reports.value = res.data
})

// 처리여부 PATCH
const handleProcess = async (reportId) => {
  try {
    await axios.patch(`http://localhost:3001/reports/${reportId}`, {
      status: 'Y'
    })
    const target = reports.value.find(r => r.id === reportId)
    if (target) target.status = 'Y'
    alert('처리 완료되었습니다.')
  } catch (error) {
    console.error('처리 실패:', error)
    alert('처리 중 오류가 발생했습니다.')
  }
}

// 블라인드 여부 PATCH
const handleBlind = async (reportId) => {
  try {
    await axios.patch(`http://localhost:3001/reports/${reportId}`, {
      is_blinded: 'Y'
    })
    const target = reports.value.find(r => r.id === reportId)
    if (target) target.is_blinded = 'Y'
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
    background-color: #e0dbf9; /* iris-100 */
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
  </style>
  