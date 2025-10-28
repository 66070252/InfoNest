<template>
  <router-link :to="to" class="info-frame">
    <img v-if="imgSrc" :src="imgSrc" alt="Info Image" class="info-image" />
    <div v-else class="info-image graybox"></div>
    <div class="info-title">
      {{ title }}
    </div>

    <div class="info-metadata">
      <div class="info-likes-dislikes">
        <span class="likes">👍 {{ likes }}</span>
        <span class="dislikes">👎 {{ dislikes }}</span>
      </div>

      <div class="author-date">
        <div class="info-author">{{ author }}</div>
        <div class="info-date">{{ date }}</div>
      </div>
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
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0, 
    required: true
  },
  dislikes: {
    type: Number,
    default: 0,
    required: true
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
  font-size: 1.1em;
  margin-bottom: 4px;
  text-align: left;
  color: #22223b;
  letter-spacing: 0.5px;
  margin: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.info-metadata {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  gap: 12px;
}

.info-likes-dislikes {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 0.95em;
  color: #555;
}

.author-date {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.95em;
  color: #555;
}

.info-author {
  font-weight: 600;
}

.info-date {
  font-size: 0.9em;
  color: #777;
}
</style>
