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
        :category="info.category"
        :likes="info.likes"
        :dislikes="info.dislikes"
      />
    </div>
  </div>
  <div class="articles-section">
    <h1>All Articles</h1>
    
    <div class="category-filters">
      <button 
        class="filter-btn"
        :class="{ active: selectedCategory === null }"
        @click="selectedCategory = null"
      >
        All
      </button>
      <button 
        v-for="category in categories"
        :key="category"
        class="filter-btn"
        :class="{ active: selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>
  </div>

  <div class="info-container">
    <InfoFrame 
    v-for="info in filteredInfoList"
    :key="info._id"
    :imgSrc="info.imageUrl ? `http://localhost:3000${info.imageUrl}` : null"
    :title="info.title"
    :author="info.author"
    :date="info.date"
    :to="{ name: 'ArticlePage', params: { id: info._id }}"
    :category="info.category"
    :likes="info.likes"
    :dislikes="info.dislikes"/>
  </div>
</template>


<script setup>
  import { ref, computed, onMounted } from 'vue'
  import InfoFrame from '../components/InfoFrame.vue'
  import NavigationBar from '../components/NavigationBar.vue'

  // ใช้ ref สำหรับ reactive data
  const infoList = ref([])
  const topInfos = ref([])
  const selectedCategory = ref(null)
  const categories = ref([])

  // Computed: filtered articles based on selected category
  const filteredInfoList = computed(() => {
    if (!selectedCategory.value) return infoList.value
    return infoList.value.filter(info => info.category === selectedCategory.value)
  })

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

      const sorted = [...processedData].sort((a, b) => (b.likes || 0) - (a.likes || 0))
      topInfos.value = sorted.slice(0, 3)

      // Extract unique categories from all articles
      categories.value = ["Technology & Computing",
                          "Science & Nature",
                          "Health & Lifestyle",
                          "Business & Finance",
                          "Arts & Entertainment",
                          "Society & Culture",
                          "Travel & Places",
                          "News & Current Events"].sort()

      // For the main list, show all items but avoid duplicating the top 3
      // const topIds = new Set(topInfos.value.map(i => i._id))
      infoList.value = processedData.sort((a, b) => new Date(a.date) - new Date(b.date))

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

.articles-section {
  text-align: center;
}

.category-filters {
  margin: 20px 0 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 20px;
  font-size: 0.95em;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #FF7F32;
  color: #FF7F32;
}

.filter-btn.active {
  background: #FF7F32;
  border-color: #FF7F32;
  color: white;
}

</style>