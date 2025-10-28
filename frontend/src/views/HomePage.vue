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
        :author="info.author"
        :date="info.date"
        :to="{ name: 'ArticlePage', params: { id: info._id }}"
        :likes="info.likes"
        :dislikes="info.dislikes"
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
      :author="info.author"
      :date="info.date"
      :to="{ name: 'ArticlePage', params: { id: info._id }}"
      :likes="info.likes"
      :dislikes="info.dislikes"/>
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
  onMounted(async () => {
    try {
      // 2. ดึงข้อมูลบทความทั้งหมด (รอให้เสร็จ)
      const res = await fetch('http://localhost:3000/api/info')
      const data = await res.json()

      // 3. สร้าง Array ของ "Promises" (คำสั่ง fetch ผู้ใช้)
      // เราใช้ .map() แทน .forEach() เพราะ .map() จะ return array ใหม่
      const userFetchPromises = data.map(info => {
        return fetch(`http://localhost:3000/api/user/${info.author}`)
          .then(res => res.json())
          .then(userData => {
            // แก้ไขค่า author ใน object โดยตรง
            info.author = userData.username
            info.date = new Date(info.date).toDateString() // แปลงวันที่เป็นรูปแบบที่อ่านง่าย
            return info // ส่ง info ที่แก้ไขแล้วกลับไป
          })
      })

      // 4. รอให้ "Promises" ทั้งหมด (การ fetch ผู้ใช้ทุกคน) ทำงานเสร็จ
      const processedData = await Promise.all(userFetchPromises)

      // 5. "processedData" ตอนนี้มี username ครบแล้ว
      // เราถึงค่อยมา sort และ filter ตรงนี้
      console.log(processedData) // ลองเช็คตรงนี้ครับ author จะเป็น username แล้ว

      // sort by likes descending and pick top 3
      const sorted = [...processedData].sort((a, b) => (b.likes || 0) - (a.likes || 0))
      topInfos.value = sorted.slice(0, 3)

      // For the main list, show all items but avoid duplicating the top 3
      const topIds = new Set(topInfos.value.map(i => i._id))
      infoList.value = processedData.filter(i => !topIds.has(i._id))

    } catch (err) {
      // (แก้ไข console.errord เป็น console.error)
      console.error('API error:', err)
    }
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