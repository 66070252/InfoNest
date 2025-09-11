<template>
  <div class="nav-bar">
    <span class="app-name">Info_Nest</span>
    <div class="buttons">
      <router-link to="/no">Delete</router-link>
      <router-link to="/no">Create</router-link>
      <router-link to="/no">Archive</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavigationBar'
}
</script>
<style>
.nav-bar {
  background-color: #0E418F;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Arial, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

}
.buttons {
  margin: 0 auto; 
}

.app-name {
  font-weight: 700;
  font-size: 42px;
  color: #fff;
  letter-spacing: 1px;
  font-family: 'KoHo', KoHo;
  position: absolute;
  left: 20px;
}

.nav-bar a {
  color: #fff;
  text-decoration: none;
  margin: 0 12px;
  font-size: 18px;
  transition: color 0.2s;
  padding: 6px 10px;
  border-radius: 4px;
}

.nav-bar a:hover,
.nav-bar a.router-link-exact-active {
  background: rgba(255,255,255,0.15);
  color: #FFD700;
}

body {
  margin: 0;
  padding-top: 60px; /* Prevent content under nav */
}
</style>