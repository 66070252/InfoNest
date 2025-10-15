<template>
  <div>
    <NavigationBar />
    <div class="create-post-container">
      <h1>Create New Post</h1>
      <form @submit.prevent="submitPost">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" v-model="form.title" required />
        </div>
        
        <div class="form-group">
          <label for="image">Image (Optional)</label>
          <input type="file" id="image" @change="handleFileChange" accept="image/*" />
          <div v-if="imagePreview" class="image-preview">
            <img :src="imagePreview" alt="Image preview"/>
          </div>
        </div>

        <div class="form-group">
          <label for="info">Info</label>
          <textarea id="info" v-model="form.info" rows="10" required></textarea>
        </div>
        <div class="button-wrapper">
          <SubmitButton :disabled="isUploading">
            {{ isUploading ? 'Uploading Image...' : 'Publish Post' }}
          </SubmitButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import NavigationBar from '../components/NavigationBar.vue';
import SubmitButton from '../components/SubmitButton.vue';

const form = ref({
  title: '',
  info: '',
});
const selectedFile = ref(null);
const imagePreview = ref(null);
const isUploading = ref(false);

const router = useRouter();
const authStore = useAuthStore();

// ฟังก์ชันนี้จะทำงานเมื่อผู้ใช้เลือกไฟล์
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    // สร้าง URL ชั่วคราวจากไฟล์ที่เลือกเพื่อใช้แสดงตัวอย่าง
    imagePreview.value = URL.createObjectURL(file);
  } else {
    selectedFile.value = null;
    imagePreview.value = null;
  }
};

// ฟังก์ชันหลักตอนกด Submit
const submitPost = async () => {
  if (!authStore.token) return alert('You must be logged in.');

  isUploading.value = true;
  let imageUrl = null; // เตรียมตัวแปรสำหรับเก็บ URL รูปภาพ

  try {
    // ---- ขั้นตอนที่ 1: อัปโหลดรูปภาพไปที่ Backend ก่อน (ถ้ามี) ----
    if (selectedFile.value) {
      const formData = new FormData();
      formData.append('image', selectedFile.value);

      const uploadRes = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        },
        body: formData
      });

      if (!uploadRes.ok) throw new Error('Image upload failed');
      const uploadResult = await uploadRes.json();
      imageUrl = uploadResult.imageUrl; // เก็บ URL ที่ได้จาก Backend
    }

    // ---- ขั้นตอนที่ 2: บันทึกข้อมูลโพสต์ (พร้อม URL รูปภาพ) ----
    const postData = {
      title: form.value.title,
      info: form.value.info,
      imageUrl: imageUrl // ใส่ URL ที่ได้ (หรือ null ถ้าไม่ได้อัปโหลดรูป)
    };

    const postRes = await fetch('http://localhost:3000/api/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(postData)
    });

    if (!postRes.ok) throw new Error('Failed to create post');
    
    alert('Post created successfully!');
    router.push('/'); // กลับไปหน้าแรก

  } catch (error) {
    console.error('Error during post creation:', error);
    alert(error.message || 'An error occurred.');
  } finally {
    isUploading.value = false; // คืนค่าปุ่มให้กดได้เหมือนเดิม
  }
};
</script>

<style scoped>
/* (Style เดิมจาก CreatePost.vue ก่อนหน้า สามารถนำมาใช้ได้เลย) */
.create-post-container {
  max-width: 800px;
  margin: 120px auto 40px;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
input[type="text"], textarea, input[type="file"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}
.button-wrapper {
  text-align: center;
  margin-top: 30px;
}
.image-preview {
  margin-top: 15px;
  max-width: 300px;
  border: 1px dashed #ccc;
  padding: 5px;
}
.image-preview img {
  width: 100%;
  height: auto;
  display: block;
}
</style>