<template>
  <h1>Info_Nest</h1>
  <div>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Username</label>
        <input type="username" id="username" v-model="form.username" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <div>
        <label for="c_password">Confirm Password</label>
        <input type="password" id="c_password" v-model="form.c_password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>
<script>
  import { ref } from "vue"

  export default {
  name: "RegisterPage",
  setup() {
    const form = ref({
      username: "",
      email: "",
      password: "",
      c_password: "",
    })

    const registerUser = async () => {
      if (form.value.password !== form.value.c_password) {
        alert("Passwords do not match!")
        return
      }

      try {
        const res = await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.value.username,
            email: form.value.email,
            password: form.value.password,
          }),
        })

        const data = await res.json()
        console.log("Response:", data)

        if (res.ok) {
          alert("Registration successful!")
        } else {
          alert(data.message || "Error occurred")
        }
      } catch (err) {
        console.error(err)
        alert("Failed to connect to server")
      }
    }

    return { form, registerUser }
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
</style>