<template>
  <div class="expandable-gallery">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
        @click="openImage(index)"
      >
        <img
          :src="image"
          :alt="'Image ' + (index + 1)"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
    </div>

    <!-- Image viewer modal -->
    <div
      v-if="selectedImage !== null"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      @click="closeImage"
    >
      <div class="relative max-w-4xl w-full mx-4">
        <button
          class="absolute top-4 right-4 text-white hover:text-gray-300"
          @click.stop="closeImage"
        >
          <svg
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          :src="images[selectedImage]"
          class="max-h-[80vh] w-auto mx-auto rounded-lg"
          @click.stop
        />
        <div class="flex justify-between mt-4">
          <button
            class="text-white hover:text-gray-300"
            @click.stop="prevImage"
            :disabled="selectedImage === 0"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            class="text-white hover:text-gray-300"
            @click.stop="nextImage"
            :disabled="selectedImage === images.length - 1"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const selectedImage = ref(null)

const openImage = (index) => {
  selectedImage.value = index
}

const closeImage = () => {
  selectedImage.value = null
}

const prevImage = () => {
  if (selectedImage.value > 0) {
    selectedImage.value--
  }
}

const nextImage = () => {
  if (selectedImage.value < props.images.length - 1) {
    selectedImage.value++
  }
}

// 添加键盘事件监听
const handleKeyDown = (e) => {
  if (selectedImage.value !== null) {
    if (e.key === 'Escape') {
      closeImage()
    } else if (e.key === 'ArrowLeft') {
      prevImage()
    } else if (e.key === 'ArrowRight') {
      nextImage()
    }
  }
}

// 在组件挂载时添加事件监听
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

// 在组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.expandable-gallery {
  @apply w-full;
}

button:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style> 