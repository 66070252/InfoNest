<template>
  <div>
    <NavigationBar></NavigationBar>
    <div class="info-container">
      <InfoFrame v-for="info in infoList" :key="info.id" :imgSrc="info.image" :title="info.title">
      </InfoFrame>
    </div>
  </div>
</template>

<script>
import InfoFrame from '../InfoFrame.vue'
import NavigationBar from '../NavigationBar.vue'


export default {
  name: 'HomePage',
  components: { InfoFrame, NavigationBar },
  data() {
    return {
      infoList: []
    }
  },
  mounted() {
    fetch('http://localhost:3000/api/info')
      .then(res => res.json())
      .then(data => {
        this.infoList = data;
      })
      .catch(err => {
        console.error('API error:', err);
      });
  }
}
</script>

<style>
.info-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>