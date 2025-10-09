<template>
  <NavigationBar />

  <div class="info-container">
    <InfoFrame 
        v-for="info in infoList"
        :key="info._id"
        :imgSrc="info.image" 
        :title="info.title" 
        :to="{ name: 'ArticlePage', params: { id: info._id }}"/>
  </div>
</template>


<script setup>
  import { ref, onMounted } from 'vue'
  import InfoFrame from '../components/InfoFrame.vue'
  import NavigationBar from '../components/NavigationBar.vue'

  // ใช้ ref สำหรับ reactive data
  const infoList = ref([])

  // ดึงข้อมูลเมื่อ component ถูก mount
  onMounted(() => {
    fetch('http://localhost:3000/api/info')
      .then(res => res.json())
      .then(data => {
        infoList.value = data
      })
      .catch(err => {
        console.error('API error:', err)
      })
})

</script>

<style>
.info-container {
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>