<template>
  <div class="min-h-screen relative">
    <div class="fixed inset-0 -z-10 w-full h-full bg-pink-50/30">
      <SnowfallBg 
        color="#FFB6C1"
        :quantity="150"
        :speed="1.5"
        :maxRadius="4"
        :minRadius="1"
        class="w-full h-full"
      />
    </div>
    
    <!-- Navigation Bar -->
    <nav class="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <span class="text-xl font-bold text-black dark:text-white font-serif">弯宝笔记</span>
          </div>
          
          <!-- Mobile menu button -->
          <div class="flex items-center md:hidden">
            <button
              @click="isMenuOpen = !isMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none"
            >
              <span class="sr-only">打开主菜单</span>
              <svg
                class="h-6 w-6"
                :class="{ 'hidden': isMenuOpen, 'block': !isMenuOpen }"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                class="h-6 w-6"
                :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Desktop menu -->
          <div class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-serif">备忘录</a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-serif">孕期记录</a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-serif">坦克薯条</a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-serif">回忆篇</a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-serif">工具箱</a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-serif">菜谱</a>
          </div>
        </div>

        <!-- Mobile menu -->
        <div
          class="md:hidden"
          :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
        >
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-serif">备忘录</a>
            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-serif">孕期记录</a>
            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-serif">坦克薯条</a>
            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-serif">回忆篇</a>
            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-serif">工具箱</a>
            <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-serif">菜谱</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="relative pt-20 px-4">
      <div class="max-w-7xl mx-auto py-8">
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200 font-serif">回忆篇</h1>
        
        <!-- Timeline -->
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          
          <!-- Timeline items -->
          <div class="space-y-12">
            <div v-for="(memory, index) in memories" :key="index" class="relative">
              <!-- Timeline dot -->
              <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-pink-500 dark:bg-pink-400"></div>
              
              <!-- Memory content -->
              <div :class="['relative', index % 2 === 0 ? 'ml-auto pl-8 pr-4' : 'mr-auto pr-8 pl-4', 'w-5/6']">
                <div class="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{{ memory.date }}</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">{{ memory.description }}</p>
                  
                  <!-- Photo gallery -->
                  <ExpandableGallery
                    :images="memory.images"
                    class="rounded-lg overflow-hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SnowfallBg from '@/components/SnowfallBg.vue'
import ExpandableGallery from '@/components/ui/ExpandableGallery.vue'

const isMenuOpen = ref(false)

// 示例数据，实际使用时可以从API或本地文件获取
const memories = ref([
  {
    date: '2024-03-20',
    description: '美好的春日时光',
    images: [
      '/images/memories/2024-03-20-1.jpg',
      '/images/memories/2024-03-20-2.jpg',
      '/images/memories/2024-03-20-3.jpg'
    ]
  },
  {
    date: '2024-03-15',
    description: '周末的欢乐时光',
    images: [
      '/images/memories/2024-03-15-1.jpg',
      '/images/memories/2024-03-15-2.jpg'
    ]
  },
  {
    date: '2024-03-10',
    description: '特别的日子',
    images: [
      '/images/memories/2024-03-10-1.jpg',
      '/images/memories/2024-03-10-2.jpg',
      '/images/memories/2024-03-10-3.jpg',
      '/images/memories/2024-03-10-4.jpg'
    ]
  }
])
</script>

<style scoped>
/* 添加时间线动画效果 */
.timeline-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.timeline-item.visible {
  opacity: 1;
  transform: translateY(0);
}
</style> 