<template>
  <div>
    <main>
      <h2>칭호관리</h2>

      <!-- 칭호 추가 입력창 -->
      <div class="add-form" v-if="showForm">
        <input v-model="newTitle.name" placeholder="칭호명" />
        <input v-model="newTitle.condition" placeholder="달성 조건" />
        <button class="btn-add confirm" @click="addTitle">추가</button>
        <button class="btn-add cancel" @click="showForm = false">취소</button>
      </div>

      <div class="title-box">
        <div class="row header">
          <div class="label">칭호명</div>
          <div class="condition">달성 조건</div>
          <button class="btn-add" @click="showForm = true">추가하기</button>
        </div>

        <div class="row" v-for="(title, index) in titles" :key="title.id">
          <span @click="remove(index)">➖</span>
          <div class="label">{{ title.name }}</div>
          <div class="condition">{{ title.condition }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const titles = ref([])
const showForm = ref(false)
const newTitle = ref({ name: '', condition: '' })

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/titles')
  titles.value = res.data
})

const addTitle = async () => {
  if (!newTitle.value.name || !newTitle.value.condition) {
    alert('모든 항목을 입력해주세요.')
    return
  }

  try {
    const res = await axios.post('http://localhost:3001/titles', newTitle.value)
    titles.value.push(res.data) // 화면 반영
    newTitle.value = { name: '', condition: '' }
    showForm.value = false
    alert('칭호가 추가되었습니다.')
  } catch (error) {
    console.error('추가 실패:', error)
    alert('추가 중 오류가 발생했습니다.')
  }
}

const remove = async (index) => {
  const title = titles.value[index]
  if (confirm(`'${title.name}' 칭호를 삭제하시겠습니까?`)) {
    await axios.delete(`http://localhost:3001/titles/${title.id}`)
    titles.value.splice(index, 1)
  }
}
</script>

<style scoped>
h2 {
  margin-top: 40px;
  text-align: center;
}

.add-form {
  width: 90%;
  margin: 0 auto 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.add-form input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 200px;
}

.btn-add {
  background-color: #b8b3f5;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
}

.btn-add.confirm {
  background-color: #7c72f0;
}

.btn-add.cancel {
  background-color: #aaa;
}

.title-box {
  border: 3px solid #458aff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.row span {
  width: 40px;
  font-size: 20px;
  color: #aaa;
  margin-right: 10px;
  cursor: pointer;
}

.label {
  width: 150px;
  font-weight: bold;
}

.condition {
  flex: 1;
}

.row.header {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
</style>
