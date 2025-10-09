<template>
  <div id="app" :class="[pageClass]">
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

  const route = useRoute()
  const pageClass = computed(() => route.name || '')
  console.log('Current route name:', route.name)
</script>

<style>

#app {
  height: 100vh;
  font-family: 'KoHo', KoHo;
}

.button-wrapper {
  text-align: center; /* จัดปุ่มให้อยู่กลาง */
  margin-top: 50px;   /* เว้นระยะบน */
}

h1.app-title { 
  text-align: center;
  font-size: 98px;
  font-weight: 700;
  color: white;
  margin: 20px;
}

#app.LoginPage, #app.RegisterPage {
  background-color: #0E418F; /* ฟ้า */
}

#app.HomePage {
  background-color: #FFFFFF; /* ขาว */
}

h1 {
    text-align: center;
    color: black;
    margin-top: 20px;
  }


</style>
