<template>
  <div>
    <NavigationBar />
    <div class="article-container" v-if="info">
      <h1>{{ info.title }}</h1>
      
      <img v-if="info.imageUrl" :src="`http://localhost:3000${info.imageUrl}`" alt="Post image" class="content-image" />

      <p class="article-content">{{ info.info }}</p>

      <div class="like-section">
        <button @click="handleLike('like')" class="like-button">👍 Like ({{ info.likes }})</button>
        <button @click="handleLike('dislike')" class="dislike-button">👎 Dislike ({{ info.dislikes }})</button>
      </div>
      <div class="actions" v-if="isOwner">
        <router-link :to="{ name: 'EditPostPage', params: { id: infoId } }" class="edit-button">Edit Post</router-link>
        <button @click="deletePost" class="delete-button">Delete Post</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import NavigationBar from '../components/NavigationBar.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const infoId = route.params.id

const info = ref(null)

const isOwner = computed(() => {
  return authStore.user && info.value && authStore.user.id === info.value.author
})

const deletePost = async () => {
  if (!confirm('Are you sure you want to delete this post?')) {
    return
  }
  try {
    const res = await fetch(`http://localhost:3000/api/info/${infoId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (res.ok) {
      alert('Post deleted successfully!')
      router.push('/')
    } else {
      const data = await res.json()
      alert(data.message || 'Failed to delete post.')
    }
  } catch (error) {
    console.error('Error deleting post:', error)
    alert('An error occurred.')
  }
}

const handleLike = async (status) => {
  if (!authStore.isLoggedIn) {
    alert('Please log in to like or dislike posts.')
    return
  }

  try {
    const res = await fetch('http://localhost:3000/api/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        infoId: infoId,
        status: status
      })
    })

    if (res.ok) {
      const result = await res.json()
      info.value = result.info 
    } else {
      const data = await res.json()
      alert(data.message || 'Action failed.')
    }
  } catch (error) {
    console.error('Error handling like:', error)
  }
}

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

<style scoped>
.article-container {
  max-width: 800px;
  margin: 100px auto;
  padding: 20px;
}
.article-content {
  white-space: pre-wrap;
  line-height: 1.6;
}
.edit-button {
  background-color: #1976d2; /* Blue */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin-right: 10px;
  transition: background-color 0.2s;
  display: inline-block;
}
.edit-button:hover {
  background-color: #1565c0;
}
.content-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  object-fit: cover;
}

.actions {
  text-align: right;
  margin-top: 40px;
}
.delete-button {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.delete-button:hover {
  background-color: #c62828;
}
.like-section {
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 20px;
  display: flex;
  gap: 15px;
}
.like-button, .dislike-button {
  border: 1px solid #ccc;
  background-color: white;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}
.like-button:hover {
  background-color: #e3f2fd;
  border-color: #90caf9;
}
.dislike-button:hover {
  background-color: #ffebee;
  border-color: #ef9a9a;
}
</style>