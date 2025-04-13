<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <h3>프로필 사진 등록</h3>
      <input type="file" accept="image/*" @change="handleFileChange" />

      <div v-if="preview" class="preview-box">
        <img :src="preview" alt="미리보기" />
      </div>

      <div class="modal-actions">
        <button @click="emitImage" class="confirm">선택</button>
        <button @click="emit('close')" class="cancel">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['imageSelected', 'close'])

const preview = ref(null)
const base64Image = ref(null)

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    preview.value = reader.result
    base64Image.value = reader.result
  }
  reader.readAsDataURL(file)
}

const emitImage = () => {
  if (!base64Image.value) return alert('이미지를 선택해주세요.')
  emit('imageSelected', base64Image.value)
  emit('close') // 부모에서 모달 닫음
}
</script>

<style scoped>
.profile-pic-box {
  position: relative;
}

.profile-pic-placeholder {
  font-size: 24px;
  background: none;
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 50%;
  cursor: pointer;
}

/* 모달 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 320px;
  text-align: center;
}

.preview-box {
  margin: 20px 0;
}

.preview-box img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-actions .confirm {
  background-color: red;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.modal-actions .cancel {
  background-color: #eee;
  color: #333;
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>