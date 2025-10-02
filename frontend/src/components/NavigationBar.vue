<template>
  <div class="nav-bar">
    <span class="app-name">Info_Nest</span>
    <span class="buttons">
      <router-link to="/no">Delete</router-link>
      <router-link to="/no">Create</router-link>
      <router-link to="/no">Archive</router-link>
    </span>
    <div class="is-login">
      <span class="sign-up-q">Did you have an account? </span>
      <span><router-link to="/login" class="sign-up-link">Login</router-link></span>
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

.is-login {
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px; /* เว้นระยะห่างระหว่างข้อความกับลิงก์ */
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

.sign-up-q { 
  font-size: 16px;             /* ขนาดตัวอักษรเหมือนกัน */
  color: #fff;                 /* สีเหมือนกัน */
  text-decoration: none;       /* ป้องกัน underline */
}

.nav-bar .sign-up-link {
  color: #FFD700;
  font-size: 16px;           
  text-decoration: none;     
  margin: 0;                  /* ลบ margin จาก .nav-bar a */
  padding: 0;                 /* ลบ padding จาก .nav-bar a */
}

.nav-bar .sign-up-link:hover,
.nav-bar .sign-up-link.router-link-exact-active {
  text-decoration: underline;  /* หรือใส่ effect hover ตามต้องการ */
}


body {
  margin: 0;
  padding-top: 60px; /* Prevent content under nav */
}
</style>