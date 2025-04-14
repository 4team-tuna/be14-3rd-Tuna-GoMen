<template>
    <div class="box">
      <h3>팀</h3>
      <ul>
        <li v-for="team in teams" :key="team.id">
          {{ team.name }} <span>({{ team.memberCount }})</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  defineProps({
    teams: Array
  })
  </script>
  
  <style scoped>
  .box {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 12px;
    min-height: 150px;
  }
  h3 {
    margin-bottom: 10px;
  }
  li {
    margin-bottom: 6px;
  }
  span {
    color: #888;
  }
  </style>
  