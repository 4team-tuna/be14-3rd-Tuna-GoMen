<template>
  <div class="textarea-container">
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="내용을 입력하세요"
      class="review-textarea"
    ></textarea>
    <p class="hint">멘토링 후 리뷰는 멘토에게 큰 힘이 됩니다</p>
  </div>
</template>

<script setup>
const modelValue = defineModel(); // v-model 연동용
</script>

<style scoped>
.textarea-container {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.review-textarea {
  width: 100%;
  height: 200px;
  border: none;
  resize: none;
  background-color: transparent;
  font-size: 18px;
  color: #333;
  outline: none;
}

.review-textarea::placeholder {
  color: #bbb;
  font-size: 20px;
}

.hint {
  margin-top: 10px;
  color: #aaa;
  font-size: 14px;
}
</style>
