<template>
  <NavigationBar />
  <div class="top-liked-container">
    <h1>Top Liked</h1>
    <div class="info-container">
      <InfoFrame
        v-for="info in topInfos"
        :key="info._id"
        :imgSrc="info.imageUrl ? `http://localhost:3000${info.imageUrl}` : null"
        :title="info.title"
        :to="{ name: 'ArticlePage', params: { id: info._id }}"
      />
    </div>
  </div>
  <h1>All Articles</h1>
  <div class="info-container">
    <InfoFrame 
      v-for="info in infoList"
      :key="info._id"
      :imgSrc="info.imageUrl ? `http://localhost:3000${info.imageUrl}` : null"
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
  const topInfos = ref([])

  // ดึงข้อมูลเมื่อ component ถูก mount
  onMounted(() => {
    fetch('http://localhost:3000/api/info')
      .then(res => res.json())
      .then(data => {
        // sort by likes descending and pick top 3
        const sorted = [...data].sort((a, b) => (b.likes || 0) - (a.likes || 0))
        topInfos.value = sorted.slice(0, 3)

        // For the main list, show all items but avoid duplicating the top 3
        const topIds = new Set(topInfos.value.map(i => i._id))
        infoList.value = data.filter(i => !topIds.has(i._id))
      })
      .catch(err => {
        console.error('API error:', err)
      })
})

</script>

<style>
.top-liked-container {
  margin: 150px 0px 100px 0px;
  text-align: center;
}
.info-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>