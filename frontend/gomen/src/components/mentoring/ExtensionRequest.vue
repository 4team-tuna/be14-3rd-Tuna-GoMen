<template>
  <div class="request-box">
    <p class="request-text">
      <strong>{{ requesterName }}</strong> 님이 멘토링 연장을 요청했습니다.
    </p>
    <div class="btn-group">
      <button class="accept-btn" @click="$emit('accept')">수락하기</button>
      <button class="reject-btn" @click="$emit('reject')">거절하기</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  requesterName: String
})
</script>

<style scoped>
.request-box {
  border: 2px solid #a8a8ff;
  background-color: #f7f7ff;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.request-text {
  margin-bottom: 16px;
  font-size: 16px;
  color: #333;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.accept-btn {
  background-color: #6c63ff;
  color: white;
  font-weight: 600;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.reject-btn {
  background-color: white;
  color: #ff4d4f;
  font-weight: 600;
  padding: 10px 18px;
  border: 2px solid #ff4d4f;
  border-radius: 8px;
  cursor: pointer;
}
</style>
