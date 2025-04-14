<template>
    <div class="box">
      <h3>개인</h3>
      <ul>
        <li v-for="mentee in mentees" :key="mentee.id">
          {{ mentee.nickname }} <span>({{ mentee.leftover_questions }})</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  defineProps({
    mentees: Array
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
  ul {
    padding-left: 0;
    list-style: none;
  }
  li {
    margin-bottom: 6px;
  }
  span {
    color: #888;
  }
  </style>
  