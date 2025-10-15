<template>
  <div>
    <NavigationBar />
    <div class="edit-post-container">
      <h1>Edit Post</h1>
      <form @submit.prevent="submitUpdate">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" v-model="form.title" required />
        </div>

        <div class="form-group">
          <label for="image">Change Image (Optional)</label>
          <input type="file" id="image" @change="handleFileChange" accept="image/*" />
          <div v-if="imagePreview" class="image-preview">
            <p>New Image Preview:</p>
            <img :src="imagePreview" />
          </div>
          <div v-else-if="form.imageUrl" class="image-preview">
            <p>Current Image:</p>
            <img :src="`http://localhost:3000${form.imageUrl}`" />
          </div>
        </div>

        <div class="form-group">
          <label for="info">Info</label>
          <textarea id="info" v-model="form.info" rows="10" required></textarea>
        </div>
        <div class="button-wrapper">
          <SubmitButton :disabled="isSubmitting">
            {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
          </SubmitButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import NavigationBar from '../components/NavigationBar.vue';
import SubmitButton from '../components/SubmitButton.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const postId = route.params.id;

const form = ref({
  title: '',
  info: '',
  imageUrl: null,
});
const selectedFile = ref(null);
const imagePreview = ref(null);
const isSubmitting = ref(false);

// 1. ดึงข้อมูลโพสต์เดิมมาใส่ในฟอร์ม
onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/info/${postId}`);
    const data = await res.json();
    form.value.title = data.title;
    form.value.info = data.info;
    form.value.imageUrl = data.imageUrl;
  } catch (error) {
    console.error('Failed to fetch post data:', error);
    alert('Could not load post data.');
    router.push('/');
  }
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

// 2. ฟังก์ชันสำหรับส่งข้อมูลที่แก้ไขแล้ว
const submitUpdate = async () => {
  isSubmitting.value = true;
  let updatedImageUrl = form.value.imageUrl;

  try {
    // ถ้ามีการเลือกไฟล์ใหม่ ให้อัปโหลดก่อน
    if (selectedFile.value) {
      const formData = new FormData();
      formData.append('image', selectedFile.value);
      const uploadRes = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authStore.token}` },
        body: formData
      });
      const uploadResult = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadResult.message || 'Image upload failed');
      updatedImageUrl = uploadResult.imageUrl;
    }

    // เตรียมข้อมูลที่จะส่งไปอัปเดต
    const updateData = {
      title: form.value.title,
      info: form.value.info,
      imageUrl: updatedImageUrl
    };

    // ส่ง PUT request ไปที่ Backend
    const postRes = await fetch(`http://localhost:3000/api/info/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(updateData)
    });

    if (!postRes.ok) throw new Error('Failed to update post');

    alert('Post updated successfully!');
    router.push({ name: 'ArticlePage', params: { id: postId } }); // กลับไปหน้าโพสต์เดิม

  } catch (error) {
    alert(error.message || 'An error occurred.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.edit-post-container { max-width: 800px; margin: 120px auto 40px; padding: 40px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.form-group { margin-bottom: 20px; }
label { display: block; margin-bottom: 8px; font-weight: bold; }
input[type="text"], textarea, input[type="file"] { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-size: 16px; }
.button-wrapper { text-align: center; margin-top: 30px; }
.image-preview { margin-top: 15px; max-width: 300px; border: 1px dashed #ccc; padding: 5px; }
.image-preview img { width: 100%; height: auto; display: block; }
</style>