<template>
  <div class="comment-form">
    <!-- 댓글 목록 먼저 표시 -->
    <div class="comment-list" v-if="comments.length">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-header">
          <strong>{{ comment.writer }}</strong>
          <div class="comment-actions">
            <!-- 신고 버튼: 자신이 작성한 댓글에는 안 보이도록 -->
            <span v-if="comment.writer !== nickname" class="report" @click="reportComment(comment.id)">🚨 신고</span>
            <!-- 수정 버튼: 본인의 댓글에만 보이도록 -->
            <span v-if="comment.writer === nickname" class="edit-delete" @click="editComment(comment)">수정</span>
            <!-- 삭제 버튼: 본인의 댓글에만 보이도록 -->
            <span v-if="comment.writer === nickname" class="edit-delete" @click="deleteComment(comment.id)">삭제</span>
          </div>
        </div>
        <p>{{ comment.content }}</p>
        <div class="comment-footer">
          <span class="comment-date">{{ comment.date }}</span>
          <span class="reply-link">답글 달기</span>
        </div>
      </div>
    </div>

    <!-- 댓글 입력창 -->
    <textarea
      v-model="commentText"
      placeholder="댓글을 남겨보세요."
      rows="3"
    />
    <button @click="submitComment">등록</button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const postId = route.params.id  // 예: /post/1 에서 "1" 가져옴

const commentText = ref('')
const comments = ref([])
const user = JSON.parse(localStorage.getItem('user')) // 로컬스토리지에서 객체로 가져오기
const nickname = ref('')
nickname.value = user ? user.nickname : ''

// 댓글 제출
const submitComment = async () => {
  if (!commentText.value.trim()) return

  const newComment = {
    id: Date.now(),
    writer: nickname.value,
    content: commentText.value,
    date: new Date().toLocaleString(),
  }

  // 게시글 데이터 불러오기
  const res = await axios.get(`http://localhost:3001/allposts/${postId}`)
  const post = res.data

  // 기존 댓글 배열에 새 댓글 추가
  const updatedComments = [...post.comments, newComment]

  // 게시글 전체 업데이트
  await axios.put(`http://localhost:3001/allposts/${postId}`, {
    ...post,
    comments: updatedComments
  })

  // 로컬 상태 업데이트
  comments.value.push(newComment)
  commentText.value = ''
}

// 댓글 신고
const reportComment = (id) => {
  alert(`댓글 (ID: ${id})을 신고하시겠습니까?`)
}

// 댓글 수정
const editComment = (comment) => {
  alert(`댓글(ID: ${comment.id})을 수정하겠습니다.`)
}

// 댓글 삭제
const deleteComment = (id) => {
  alert(`댓글(ID: ${id})을 삭제하겠습니다.`)
}
</script>

<style scoped>
.comment-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
}

.comment-form textarea {
  padding: 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  margin-top: 20px;
}

.comment-form button {
  margin-top: 10px;
  padding: 10px 16px;
  align-self: flex-end;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #3730a3;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment {
  border-top: 1px solid #eee;
  padding-top: 12px;
  font-size: 14px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
}

.comment-footer {
  margin-top: 4px;
  font-size: 12px;
  color: #aaa;
}

.comment-date {
  margin-right: 12px;
}

.reply-link {
  color: #4f46e5;
  font-weight: 500;
  cursor: pointer;
}

.reply-link:hover {
  text-decoration: underline;
}

.report {
  font-size: 12px;
  cursor: pointer;
  color: red;
  font-weight: bold;
}

.comment-actions {
  display: flex;
  gap: 8px;
}

.edit-delete {
  font-size: 12px;
  color: #808080;  /* 회색 글씨로 변경 */
  cursor: pointer;
}

.edit-delete:hover {
  color: #000000;  /* hover 시 검정색으로 변경 */
  /* 밑줄 제거 */
  text-decoration: none;
}
</style>






  