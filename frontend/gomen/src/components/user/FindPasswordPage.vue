<template>
    <div class="findpw-wrapper">
      <div class="findpw-box">
        <div class="findpw-logo">
          <img src="@/assets/gomen-logo.png" alt="GoMen Logo" class="logo" style="height: 150px"/>
        </div>
  
        <div class="findpw-title">비밀번호 찾기</div>
  
        <input type="text" placeholder="이름" class="findpw-input" />
        <input type="text" placeholder="생년월일(8자리)" class="findpw-input" />
        <input type="text" placeholder="로그인ID" class="findpw-input" />
        <input type="text" placeholder="이메일" class="findpw-input" />
  
        <div class="findpw-phone-group">
          <input type="text" placeholder="휴대전화번호 (대한민국 +82)" class="findpw-input" />
          <button class="findpw-small-button">인증번호 받기</button>
        </div>
  
        <input type="text" placeholder="인증번호 6자리 숫자 입력" class="findpw-input" />
  
        <button class="findpw-button">비밀번호 찾기</button>
        <button class="findpw-back-button">뒤로 가기</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .findpw-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #dcdcdc;
  }
  
  .findpw-box {
    background: white;
    border-radius: 16px;
    padding: 32px;
    width: 370px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .findpw-logo {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  
  .findpw-title {
    font-size: 14px;
    color: #666;
    text-align: left;
    margin-bottom: 12px;
  }
  
  .findpw-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-bottom: 12px;
    font-size: 14px;
    box-sizing: border-box;
  }
  
  .findpw-phone-group {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }
  
  .findpw-small-button {
    padding: 8px 12px;
    font-size: 13px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    white-space: nowrap;
  }
  
  .findpw-button {
    width: 100%;
    padding: 12px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: bold;
    margin: 12px 0;
    font-size: 15px;
    cursor: pointer;
  }
  
  .findpw-back-button {
    font-size: 13px;
    color: #333;
    background-color: transparent;
    border: 1px solid #aaa;
    padding: 6px 12px;
    border-radius: 20px;
    cursor: pointer;
  }
  </style>
  