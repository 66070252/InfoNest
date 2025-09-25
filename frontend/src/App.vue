<template>
  <div id="app" :class="[pageClass]">
    <router-view />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'


export default {
  setup() {
    const route = useRoute()
    const pageClass = computed(() => route.name || '')
    return { pageClass }
  }
}
</script>

<style>

#app {
  min-height: 100vh;
  font-family: 'KoHo', KoHo;
}

/* background ของแต่ละหน้า */
.LoginPage, .RegisterPage {
  color: #0E418F; /* ฟ้า */
}

.HomePage {
  background-color: #fff;   /* ขาว */
}
</style>
