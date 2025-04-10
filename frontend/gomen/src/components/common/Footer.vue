<template>
    <footer class="footer">
      <div class="footer-left">
        Copyright © 2025 GOMEN All Rights Reserved.
      </div>
      <div class="footer-right">
        <div class="social-icons">
          <img src="@/assets/icon-instagram.png" alt="Instagram" />
          <img src="@/assets/icon-facebook.png" alt="Facebook" />
          <img src="@/assets/icon-twitter.png" alt="Twitter" />
        </div>
        <span>contact: GomenManager@gmail.com</span>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    border-top: 1px solid #ddd;
    font-size: 12px;
    color: #777;
  }
  
  .footer-left {
  text-align: left;
}

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}
  
  .social-icons {
    display: flex;
    gap: 12px;
  }
  
  .social-icons img {
    width: 18px;
    height: auto;
    object-fit: contain;
    opacity: 0.8;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }
  
  .social-icons img:hover {
    opacity: 1;
  }
  </style>
  