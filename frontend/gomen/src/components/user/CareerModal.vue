<template>
    <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h3>경력 추가</h3>

      <label>회사명</label>
      <input v-model="company" placeholder="회사 이름" />

      <label>재직기간</label>
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

      <label>직무</label>
      <input v-model="position" placeholder="직무" />

      <div class="modal-actions">
        <button @click="apply">적용</button>
        <button @click="close">취소</button>
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
    width: 600px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .modal-content h3 {
    margin-top: 0;
    margin-bottom: 15px;
  }
  
  .modal-content input,
  .modal-content select {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .modal-content label {
    font-size: 17px;
  }
  
  .period-select {
    display: flex;
    gap: 6px;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .modal-actions {
    text-align: right;
    margin-top: 10px;
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

  .date-row {
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
  flex-wrap: nowrap; /* 줄바꿈 방지 */
  justify-content: space-between;
}

.date-group {
  display: flex;
  flex-direction: column;
  min-width: 120px; /* 각 select가 줄 안에서 유지되도록 */
}

.date-group label {
  margin-bottom: 4px;
  font-size: 12px;
}

.date-group select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
  </style>
  