<template>
  <div class="profile-container">
    <!-- 背景网格和装饰 -->
    <div class="background-grid"></div>
    <div class="background-decoration">
      <div class="tech-circle"></div>
      <div class="tech-lines"></div>
    </div>

    <!-- 主要内容区 -->
    <div class="profile-content">
      <!-- 左侧信息区 -->
      <div class="location-info">
        <div class="location-label">Location</div>
        <div class="location-value">翰法罗斯</div>
        <div class="social-links">
          <a v-for="(social, index) in socialLinks" 
             :key="index" 
             :href="social.url" 
             target="_blank"
             class="social-link">
            <i :class="social.icon"></i>
          </a>
        </div>
      </div>

      <!-- 中央展示区 -->
      <div class="central-display">
        <div class="profile-card">
          <div class="card-content">
            <img src="@/assets/images/home/home-portrait.png" alt="Luna雪苡" class="profile-image" />
            <div class="image-overlay"></div>
            <div class="tech-frame"></div>
            <div class="profile-info">
              <h2 class="profile-name">Luna雪苡</h2>
              <p class="profile-bio">追梦人 | 璀璨剧斯 | 泡泡</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧关键词区 -->
      <div class="keywords-section">
        <div class="keyword-item" v-for="(keyword, index) in keywords" :key="index">
          <div class="keyword-dot"></div>
          <div class="keyword-line"></div>
          <div class="keyword-content">
            <div class="keyword-icon">{{ keyword.icon }}</div>
            <div class="keyword-text">{{ keyword.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const keywords = ref([
  { icon: '🎵', text: '追梦' },
  { icon: '✨', text: '璀璨剧斯' },
  { icon: '💫', text: '泡泡' }
]);

const socialLinks = ref([
  { icon: 'fab fa-github', url: 'https://github.com/yourusername' },
  { icon: 'fab fa-twitter', url: 'https://twitter.com/yourusername' },
  { icon: 'fab fa-instagram', url: 'https://instagram.com/yourusername' },
  { icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/yourusername' }
]);
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.background-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
}

.background-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.tech-circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border: 1px solid rgba(187, 134, 252, 0.2);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rotate 20s linear infinite;
}

.tech-lines {
  position: absolute;
  inset: 0;
  opacity: 0.2;
}

.tech-lines::before,
.tech-lines::after {
  content: '';
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(187, 134, 252, 0.2), transparent);
  height: 1px;
  width: 100%;
  top: 50%;
}

.profile-content {
  width: 100%;
  max-width: 1200px;
  height: 80vh;
  display: grid;
  grid-template-columns: 200px 1fr 300px;
  gap: 40px;
  padding: 20px;
  position: relative;
  z-index: 1;
}

.location-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.location-label {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  font-family: 'Roboto Mono', monospace;
}

.location-value {
  font-size: 18px;
  color: #bb86fc;
  font-weight: 500;
}

.central-display {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  width: 400px;
  height: 600px;
  position: relative;
  perspective: 1000px;
}

.card-content {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(187, 134, 252, 0.2), rgba(98, 0, 238, 0.3));
  border-radius: 20px;
}

.tech-frame {
  position: absolute;
  inset: -10px;
  border: 1px solid rgba(187, 134, 252, 0.3);
  border-radius: 25px;
  pointer-events: none;
}

.keywords-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
}

.keyword-item {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  animation: fade-in 0.5s forwards;
}

.keyword-dot {
  width: 8px;
  height: 8px;
  background: #bb86fc;
  border-radius: 50%;
}

.keyword-line {
  flex-grow: 1;
  height: 1px;
  background: linear-gradient(90deg, #bb86fc, transparent);
}

.keyword-content {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(187, 134, 252, 0.1);
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid rgba(187, 134, 252, 0.2);
}

.keyword-icon {
  font-size: 18px;
}

.keyword-text {
  font-size: 14px;
  color: #fff;
}

.social-links {
  margin-top: 20px;
  display: flex;
  gap: 15px;
}

.social-link {
  color: #bb86fc;
  font-size: 20px;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.social-link:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.profile-info {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  text-align: center;
  padding: 20px;
  background: rgba(26, 26, 46, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 0 0 20px 20px;
}

.profile-name {
  font-size: 24px;
  margin: 0;
  color: #fff;
  font-weight: 600;
}

.profile-bio {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 10px 0 0;
}

@keyframes rotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .profile-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 20px;
    padding: 10px;
  }

  .profile-card {
    width: 300px;
    height: 450px;
  }

  .keywords-section {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .profile-card {
    width: 280px;
    height: 420px;
  }

  .profile-name {
    font-size: 20px;
  }

  .profile-bio {
    font-size: 14px;
  }
}
</style>
