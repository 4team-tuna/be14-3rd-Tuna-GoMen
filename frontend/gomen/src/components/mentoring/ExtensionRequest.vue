<template>
  <div class="extension-request">
    <p class="message">
      <strong>{{ requester }}</strong>에서<br />
      멘토링 연장 요청이 도착했습니다.
    </p>
    <div class="button-group">
      <button class="accept-btn" @click="$emit('accept')">수락하기</button>
      <button class="reject-btn" @click="$emit('reject')">거절하기</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  requester: {
    type: String,
    required: true
  }
})
defineEmits(['accept', 'reject'])
</script>

<style scoped>
.extension-request {
  border: 2px solid #a8a8ff;
  background-color: #f9f9ff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.message {
  font-size: 16px;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.6;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.accept-btn,
.reject-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.accept-btn {
  background-color: #6c63ff;
  color: #fff;
  border: none;
}

.accept-btn:hover {
  background-color: #574de9;
}

.reject-btn {
  background-color: #fff;
  color: #ff4d4f;
  border: 1px solid #ff4d4f;
}

.reject-btn:hover {
  background-color: #ffecec;
}
</style>
