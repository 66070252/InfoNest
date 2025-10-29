<template>
  <div>
    <NavigationBar />
    <div class="archive-container">
      <h1>My Liked Posts</h1>
      <div v-if="isLoading" class="loading">Loading...</div>
      <div v-else-if="likedPosts.length > 0" class="info-container">
        <InfoFrame 
          v-for="info in likedPosts"
          :key="info._id"
          :imgSrc="info.imageUrl ? `http://localhost:3000${info.imageUrl}` : null"
          :title="info.title"
          :author="info.author"
          :date="info.date"
          :category="info.category"
          :likes="info.likes"
          :dislikes="info.dislikes"
          :to="{ name: 'ArticlePage', params: { id: info._id }}"/>
      </div>
      <div v-else class="no-posts">
        <p>You haven't liked any posts yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import NavigationBar from '../components/NavigationBar.vue';
import InfoFrame from '../components/InfoFrame.vue';

const likedPosts = ref([]);
const isLoading = ref(true);
const authStore = useAuthStore();

onMounted(async () => {
  if (!authStore.token) {
    isLoading.value = false;
    return;
  }
  try {
    const res = await fetch('http://localhost:3000/api/like/mine', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      // Fetch user data for each post's author
      const userFetchPromises = data.map(info => {
        return fetch(`http://localhost:3000/api/user/${info.author}`)
          .then(res => res.json())
          .then(userData => {
            info.author = userData.username;
            info.date = new Date(info.date).toDateString();
            return info;
          });
      });

      // Wait for all user data to be fetched
      likedPosts.value = await Promise.all(userFetchPromises);
    } else {
      console.error('Failed to fetch liked posts');
    }
  } catch (error) {
    console.error('API Error:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.archive-container {
  max-width: 1200px;
  margin: 100px auto;
  padding: 20px;
}
.info-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.loading, .no-posts {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2em;
  color: #666;
}
</style>