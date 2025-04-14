<template>
    <div class="highlight-container">
      <h2 class="hot-title">🔥 지금 가장 <span>HoT</span>한 멘토와!</h2>
      <div class="highlight-row">
        <img src="@/assets/icon-basic-user.png" alt="female" class="memoji" />
        <p class="subtext">
          실제 멘티들의 <span class="bold-orange">솔직한 평가</span>와
          <span class="bold-green">생생한 리뷰</span>를 보고 신청해보세요!
        </p>
        <img src="@/assets/icon-basic-user.png" alt="male" class="memoji" />
      </div>
      <div class="stars">⭐️⭐️⭐️⭐️⭐️</div>
    </div>
  </template>
  
  <style scoped>
  .highlight-container {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .hot-title {
    font-size: 24px;
    font-weight: 900;
    color: red;
    margin-bottom: 16px;
  }
  
  .hot-title span {
    font-size: 24px;
    font-weight: 900;
  }
  
  .highlight-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  .memoji {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
  
  .subtext {
    font-size: 14px;
    color: #555;
    max-width: 480px;
    line-height: 1.6;
  }
  
  .bold-orange {
    color: orange;
    font-weight: bold;
  }
  
  .bold-green {
    color: green;
    font-weight: bold;
  }
  
  .stars {
    font-size: 24px;
    color: gold;
    margin-top: 16px;
  }
  </style>
  