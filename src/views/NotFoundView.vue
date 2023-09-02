<!-- Not found View with Vuetify-->
<template>
  <div class="not-found">
    <div class="not-found__container">
      <h1 class="not-found__title">404</h1>
      <p class="not-found__description">Page not found</p>
      <router-link to="/">Go to Home</router-link>
    </div>
  </div>
</template>

<style lang="scss">
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  .not-found__container {
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    .not-found__title {
      text-align: center;
      margin-bottom: 20px;
    }
    .not-found__description {
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
</style>
