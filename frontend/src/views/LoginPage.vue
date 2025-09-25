<template>
  <h1>Info_Nest</h1>
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
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>
<script>
  import { ref } from "vue"

  export default {
  name: "LoginPage",
  setup() {
    const form = ref({
      emailOrUsername: "",
      password: "",
    })

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
          }),
        })

        const data = await res.json()
        console.log("Response:", data)

        if (res.ok) {
          alert("Login successful!")
        } else {
          alert(data.message || "Error occurred")
        }
      } catch (err) {
        console.error(err)
        alert("Failed to connect to server")
      }
    }

    return { form, LoginUser }
  },
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
    padding: 20px;
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

</style>