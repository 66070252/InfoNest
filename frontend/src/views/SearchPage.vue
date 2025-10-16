<template>
  <div>
    <NavigationBar />
    <div class="search-results-container">
      <h1>Search Results for: "{{ searchTerm }}"</h1>
      <div v-if="isLoading" class="loading">Searching...</div>
      <div v-else-if="results.length > 0" class="info-container">
        <InfoFrame 
          v-for="info in results"
          :key="info._id"
          :imgSrc="info.imageUrl ? `http://localhost:3000${info.imageUrl}` : null"
          :title="info.title" 
          :to="{ name: 'ArticlePage', params: { id: info._id }}"/>
      </div>
      <div v-else class="no-results">
        <p>No posts found matching your search term.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import NavigationBar from '../components/NavigationBar.vue';
import InfoFrame from '../components/InfoFrame.vue';

const route = useRoute();
const results = ref([]);
const isLoading = ref(true);
const searchTerm = ref(route.query.q || '');

const fetchResults = async (query) => {
  if (!query) return;
  isLoading.value = true;
  try {
    const res = await fetch(`http://localhost:3000/api/info/search?q=${encodeURIComponent(query)}`);
    if (res.ok) {
      results.value = await res.json();
    }
  } catch (error) {
    console.error("Search failed:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchResults(searchTerm.value);
});

watch(() => route.query.q, (newQuery) => {
  searchTerm.value = newQuery;
  fetchResults(newQuery);
});
</script>

<style scoped>
.search-results-container { max-width: 100%; margin: 100px auto; padding: 20px; }
.info-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.loading, .no-results { text-align: center; margin-top: 50px; font-size: 1.2em; color: #666; }
</style>