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
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.04);
}
h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}
.member-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.member-list li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.member-list li:last-child {
  border-bottom: none;
}
.nickname {
  font-weight: 500;
}
.leftover {
  color: #888;
}
.no-team {
  font-size: 14px;
  color: #999;
}
</style>
