<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-card">
      <h2 class="modal-title">경력 추가</h2>

      <div class="form-group">
        <label for="company">회사명</label>
        <input id="company" v-model="company" type="text" placeholder="회사 이름을 입력하세요" />
      </div>

      <div class="form-group">
        <label>재직 기간</label>
        <div class="date-row">
          <div class="date-group">
            <label>시작 년도</label>
            <select v-model="startYear">
              <option v-for="year in years" :key="'start' + year" :value="year">{{ year }}</option>
            </select>
          </div>
          <div class="date-group">
            <label>시작 월</label>
            <select v-model="startMonth">
              <option v-for="month in months" :key="'start' + month" :value="month">{{ month }}</option>
            </select>
          </div>
          <div class="date-group">
            <label>종료 년도</label>
            <select v-model="endYear">
              <option v-for="year in years" :key="'end' + year" :value="year">{{ year }}</option>
            </select>
          </div>
          <div class="date-group">
            <label>종료 월</label>
            <select v-model="endMonth">
              <option v-for="month in months" :key="'end' + month" :value="month">{{ month }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="position">직무</label>
        <input id="position" v-model="position" type="text" placeholder="직무를 입력하세요" />
      </div>

      <div class="modal-actions">
        <button class="btn apply" @click="apply">적용</button>
        <button class="btn cancel" @click="close">취소</button>
      </div>
    </div>
  </div>
</template>
  



<script setup>
  import { ref } from 'vue'
  const emit = defineEmits(['close', 'apply'])
  
  const company = ref('')
  const position = ref('')
  const startYear = ref('')
  const startMonth = ref('')
  const endYear = ref('')
  const endMonth = ref('')
  
  const years = Array.from({ length: 100 }, (_, i) => String(1950 + i))
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
  
  function apply() {
    if(!company.value || !position.value || !startYear.value || !startMonth.value || !endYear.value || !endMonth.value){
      alert('모든 항목을 입력해주세요!')
      return
    }
    const careerText = `${company.value} (${startYear.value}.${startMonth.value} ~ ${endYear.value}.${endMonth.value}) - ${position.value}`
    emit('apply', careerText)
    emit('close')
  }
  
  function close() {
    emit('close')
  }
</script>





<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0; /* top: 0, right: 0, bottom: 0, left: 0 한 번에 설정 */
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center; /* 가운데 딱 맞게 정렬 */
  z-index: 1000;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.modal-card {
  background: #ffffff;
  width: 100%;
  max-width: 540px;
  padding: 35px 32px;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
}

.modal-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 15px;
}

input,
select {
  width: 95%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: 0.2s;
}

input:focus,
select:focus {
  border-color: #888;
}

.date-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.date-group {
  flex: 1 1 45%;
  min-width: 120px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 10px 18px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.apply {
  background-color: #111;
  color: #fff;
}

.cancel {
  background-color: #f0f0f0;
  color: #333;
}

.apply:hover {
  background-color: #333;
}

.cancel:hover {
  background-color: #e0e0e0;
}

@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
}
</style>