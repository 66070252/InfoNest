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
    </form>
  </div>
</template>
<script setup>
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import SubmitButton from "../components/SubmitButton.vue"

  const form = ref({
    emailOrUsername: "",
    password: "",
  })

  const router = useRouter() // เรียกใช้ Vue Router


  const LoginUser = async () => {

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        emailOrUsername: form.value.emailOrUsername,
        password: form.value.password,
        credentials: "include"
        }),
        })

        const data = await res.json()
        console.log("Response:", data)

        if (res.ok) {
          alert("Login successful!")
           localStorage.setItem("jwtToken", data.token)
          router.push("/")

        } else {
          alert(data.message || "Error occurred")
        }
      } catch (err) {
        console.error(err)
        alert("Failed to connect to server")
      }

      
    }


</script>

<style>
  h1 {
    text-align: center;
    color: white;
    margin-top: 20px;
  }
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

  body {
    background-color: #0E418F; /* ฟ้า */
  }


</style>