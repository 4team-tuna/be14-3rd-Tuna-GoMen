<template>
  <div class="team-card">
    <h3>팀원</h3>
    <div v-if="filteredTeam.length">
      <ul class="member-list">
        <li v-for="member in filteredTeam" :key="member.id">
          <span class="nickname">{{ member.nickname }}</span>
          <span class="leftover">질문 {{ member.leftover_questions }}회 남음</span>
        </li>
      </ul>
    </div>
    <div v-else class="no-team">
      <p>같은 팀원이 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  teamMembers: Array,
  isTeam: Boolean
})

const user = JSON.parse(localStorage.getItem('user'))

const filteredTeam = computed(() => {
  return props.teamMembers.filter(member => member.id !== user.id)
})
</script>

<style scoped>
.team-card {
  flex: 1;
  padding: 20px;
  border: 2px solid #a8a8ff;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.team-card-title {
  font-weight: bold;
  font-size: 16px;
  color: #222;
  margin-bottom: 8px;
}

.team-member {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #444;
  border-bottom: 1px solid #eee;
  padding: 6px 0;
}

.team-member:last-child {
  border-bottom: none;
}
</style>
