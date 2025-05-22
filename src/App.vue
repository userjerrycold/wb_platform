<template>
  <router-view></router-view>
</template>

<script setup>
// App level setup if needed

// 禁用滑动导航功能
import { onMounted, onUnmounted } from 'vue';

// 禁用触摸滑动导航（左滑后退，右滑前进）
const disableBrowserSwipeNavigation = (event) => {
  // 确保事件不是来自表单元素，因为那些元素可能需要滑动功能
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
    return;
  }
  
  // 允许表格区域内的滑动
  const tableContainer = event.target.closest('.overflow-x-auto');
  if (tableContainer) {
    return;
  }
  
  // 如果是水平滑动，则阻止默认行为（导航）
  if (Math.abs(event.touches[0].clientX) > Math.abs(event.touches[0].clientY)) {
    event.preventDefault();
  }
};

onMounted(() => {
  // 添加触摸事件监听器，必须设置passive为false以允许preventDefault生效
  document.addEventListener('touchstart', disableBrowserSwipeNavigation, { passive: false });
});

onUnmounted(() => {
  // 移除事件监听器
  document.removeEventListener('touchstart', disableBrowserSwipeNavigation);
});
</script>

<style>
/* 全局禁用滑动反弹效果 */
html, body {
  position: relative;
  overflow-x: hidden;
  overscroll-behavior: none;
}
</style>