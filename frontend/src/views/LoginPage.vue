<template>
  <h1 class="app-title">Info_Nest</h1>
  <div>
    <form @submit.prevent="LoginUser">
      <div>
        <label for="emailOrUsername">Email or Username</label>
        <input id="email-or-username" v-model="form.emailOrUsername" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <div class="button-wrapper">
        <SubmitButton>Sign In</SubmitButton>
      </div>
      <div class="acct-or-not">
        <span class="sign-up-q">Don't you have an account? </span>
        <span><router-link to="/register" class="sign-up-link">Register</router-link></span>
      </div>
    </form>
  </div>
</template>
<script setup>
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import { useAuthStore } from "../stores/authStore" // << Import
  import SubmitButton from "../components/SubmitButton.vue"

  const form = ref({ emailOrUsername: "", password: "" })
  const router = useRouter()
  const authStore = useAuthStore() 

  const LoginUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.value),
      })
      const data = await res.json()
      if (res.ok) {
        authStore.setUserAndToken(data.user, data.token) 
        alert("Login successful!")
        router.push("/")
      } else {
        alert(data.message || "Login failed")
      }
    } catch (err) {
      alert("Failed to connect to server")
    }
  }
</script>

<style>

  form {
    background-color: white;
    max-width: 400px;
    margin: 40px auto;
    padding: 50px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  form div {
  margin-bottom: 15px; /* เว้นบรรทัดแต่ละช่อง */
  }

  .acct-or-not {
    display: block;
    margin-top: 40px;
    color: white;
    text-align: center;
  }

  label {
    display: block;       /* บังคับให้อยู่บรรทัดบน */
    margin-bottom: 5px;   /* เว้นระยะกับ input */
    font-weight: bold;    /* ทำให้ชัดเจนขึ้น */
    color: #333;
    text-align: left;     /* ชิดซ้าย */
  }

  input {
    width: 100%;          /* ยืดเต็มฟอร์ม */
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .sign-up-q { 
    font-size: 16px;             /* ขนาดตัวอักษรเหมือนกัน */
    color: black;                 /* สีเหมือนกัน */
    text-decoration: none;       /* ป้องกัน underline */
  }

  .sign-up-link {
    color: #FFD700;
    font-size: 16px;           
    text-decoration: none;     
    margin: 0;                  /* ลบ margin จาก .nav-bar a */
    padding: 0;                 /* ลบ padding จาก .nav-bar a */
  }

  .sign-up-link:hover,
  .sign-up-link.router-link-exact-active {
    text-decoration: underline;  /* หรือใส่ effect hover ตามต้องการ */
  }


</style>