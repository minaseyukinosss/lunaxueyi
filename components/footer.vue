<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img class="logo" src="@/assets/images/logo-white.png" />
      </div>
      <div class="footer-info">
        <div class="company-name">ユニブルー合同会社</div>
        <div class="footer-links">
          <NuxtLink to="/profile" class="footer-link">会社情報</NuxtLink>
          <NuxtLink to="/business" class="footer-link">事業内容</NuxtLink>
          <NuxtLink to="/news" class="footer-link">ニュース</NuxtLink>
          <NuxtLink to="/adoption" class="footer-link">採用情報</NuxtLink>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2023 <a href="https://yuniburu.com/">ユニブルー合同会社</a></p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
  background: #000;
  color: #999;
  font-size: 14px;
  width: 100%;

  .footer-content {
    padding: 30px 0;
    display: flex;
    width: 1280px;
    max-width: 100%;
    margin: 0 auto;

    .footer-logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 94px;
      min-width: 300px;
      box-sizing: border-box; // 高度和宽度应用于元素的所有部分: 内容、内边距和边框

      .logo {
        width: 200px;
        height: inherit !important;
      }
    }

    .footer-info {
      display: flex;
      flex-direction: column;
      color: #fff;
      margin-left: 60px;
      line-height: 24px;
      .company-name {
        font-size: 16px;
        margin-bottom: 28px;
      }
      .footer-links {
        display: flex;
        flex-direction: row;
        margin-bottom: 50px;
        .footer-link {
          display: flex;
          font-size: 14px;
          padding: 0.5rem 0;
          margin-right: 4rem;
          color: #fff;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    @media screen and (max-width: 992px) {
      flex-direction: column;

      .footer-info {
        align-items: center;
        justify-content: cneter;
        margin-left: 0;
        .company-name {
          margin-bottom: 20px;
        }
        .footer-links {
          flex-direction: column;
          margin-bottom: 0;
          .footer-link {
            justify-content: center;
            margin-right: 0;
          }
        }
      }

    }
  }

  .footer-bottom {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    border-top: 1px solid rgba($color: #fff, $alpha: 0.2);

    p {
      font-size: 13px;

      a {
        color: #aaa;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
