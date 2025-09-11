<template>
    <div class="info-frame">
        <img v-if="imgSrc" :src="imgSrc" alt="Info Image" class="info-image" />
        <div v-else class="info-image graybox"></div>
        <div class="info-title">
            {{ title }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'InfoFrame',
  props: {
    imgSrc: {
      type: String,
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.info-frame {
    border: none;
    box-shadow: 0 4px 24px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
    width: 380px;
    margin: 60px;
    border-radius: 18px;
    background: #fff;
    transition: box-shadow 0.2s;
}
.info-frame:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.16), 0 3px 12px rgba(0,0,0,0.12);
}

.info-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 18px;
    background: #f5f5f5;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);}

.graybox {
    width: 100%;
    height: 220px;
    border-radius: 12px;
    background: linear-gradient(135deg, #e0e0e0 60%, #f5f5f5 100%);
    margin-bottom: 18px;
}

.info-title {
    font-size: 1.35em;
    margin-bottom: 4px;
    text-align: left;
    color: #22223b;
    letter-spacing: 0.5px;
    margin: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>