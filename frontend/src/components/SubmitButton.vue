<template>
  <button
    type="submit" 
    class="custom-button" 
    @click="$emit('click')"
  >
    <slot></slot> <!-- ให้ใช้ text ภายในปุ่ม -->
  </button>
</template>

<script setup>
</script>

<style>
.custom-button {
  background-color: #FF7F32; /* สีปุ่ม */    
  color: white;          /* สีตัวอักษร */
  border: none;
  border-radius: 8px;        /* มุมมน */
  padding: 10px 20px;        /* ขนาดปุ่ม */
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.custom-button:hover {
  background-color: #e76c28; /* สีเมื่อ hover */
}

.custom-button:active {
  background-color: #cc5f20; /* สีเมื่อกด */
}
</style>