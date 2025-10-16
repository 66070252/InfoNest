<template>
  <router-link :to="to" class="info-frame">
    <img v-if="imgSrc" :src="imgSrc" alt="Info Image" class="info-image" />
    <div v-else class="info-image graybox"></div>
    <div class="info-title">
      {{ title }}
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  imgSrc: String,
  title: {
    type: String,
    required: true
  },
  to: {
    type: [String, Object],
    default: null
  }
})
</script>

<style>
.info-frame {
  display: block; /* ให้ router-link มีบล็อกขนาดเท่ากับกล่อง */
  border: none;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
  width: 380px;
  margin: 50px;
  border-radius: 18px;
  background: #fff;
  transition: box-shadow 0.2s;
  color: inherit; /* ให้ข้อความ inherit สี */
  text-decoration: none; /* เอา underline ออก */
}
.info-frame:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.16), 0 3px 12px rgba(0,0,0,0.12);
}

.info-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  background: #f5f5f5;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.graybox {
  width: 100%;
  height: 220px;
  border-radius: 12px;
  background: linear-gradient(135deg, #e0e0e0 60%, #f5f5f5 100%);
}

.info-title {
  font-size: 1em;
  margin-bottom: 4px;
  text-align: left;
  color: #22223b;
  letter-spacing: 0.5px;
  margin: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
