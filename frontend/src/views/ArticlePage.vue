<template>
  <div v-if="info">
    <h1>{{ info.title }}</h1>
    <img :src="info.image" alt="" />
    <p>{{ info.info }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const infoId = route.params.id

const info = ref(null)

onMounted(() => {
  fetch(`http://localhost:3000/api/info/${infoId}`)
    .then(res => res.json())
    .then(data => {
      info.value = data
    })
    .catch(err => {
      console.error('Failed to load info:', err)
    })
})
</script>

<style>
</style>
