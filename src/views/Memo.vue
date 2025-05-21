<template>
  <div class="min-h-screen relative">
    <AuroraBackground class="fixed inset-0 -z-10 w-full h-full" />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <!-- 页面标题 -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-primary-600 dark:text-primary-400 font-serif">备忘录</h1>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          共 {{ memos.length }} 条备忘录
        </div>
      </div>

      <!-- 工具栏 -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <!-- 搜索框 -->
        <div class="relative flex-1">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索备忘录..."
            class="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <!-- 筛选按钮 -->
        <button class="inline-flex items-center px-4 py-2.5 border border-blue-100 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-all duration-200">
          <span>筛选</span>
          <svg class="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- 新建按钮 -->
        <button
          @click="openNewMemoModal"
          class="inline-flex items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          新建备忘录
        </button>
      </div>

      <!-- 标签筛选 -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          v-for="tag in tags"
          :key="tag.id"
          @click="toggleTag(tag)"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
            selectedTags.includes(tag.id)
              ? 'bg-blue-500 text-white shadow-sm hover:bg-blue-600'
              : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
          ]"
        >
          {{ tag.name }}
        </button>
      </div>

      <!-- 备忘录列表 -->
      <div class="space-y-4">
        <TransitionGroup
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            v-for="memo in filteredMemos"
            :key="memo.id"
            :class="[
              'bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100',
              {
                'border-l-4 border-l-red-500': memo.status === '紧急',
                'border-l-4 border-l-green-500': memo.status === '已完成',
                'border-l-4 border-l-gray-400': memo.status === '已归档'
              }
            ]"
          >
            <div class="p-6">
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-lg font-semibold text-gray-900">{{ memo.title }}</h3>
                <span :class="[
                  'px-2.5 py-1 rounded-full text-xs font-medium',
                  getStatusClass(memo.status)
                ]">
                  {{ memo.status }}
                </span>
              </div>
              <div class="text-sm text-gray-500 mb-3">
                {{ formatDate(memo.createdAt) }}
              </div>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ memo.content }}</p>
              <div class="flex justify-between items-center">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in memo.tags"
                    :key="tag"
                    class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs"
                  >
                    {{ tag }}
                  </span>
                </div>
                <div class="flex items-center space-x-3">
                  <button
                    @click="editMemo(memo)"
                    class="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  >
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteMemo(memo)"
                    class="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- 空状态 -->
        <div v-if="filteredMemos.length === 0" class="text-center py-12">
          <div class="text-5xl mb-4 opacity-50">📝</div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">暂无备忘录</h3>
          <p class="text-gray-500 dark:text-gray-400">点击"新建备忘录"按钮开始记录</p>
        </div>
      </div>
    </div>

    <!-- 新建/编辑备忘录模态框 -->
    <TransitionRoot appear :show="isModalOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 mb-4">
                  {{ editingMemo ? '编辑备忘录' : '新建备忘录' }}
                </DialogTitle>

                <!-- 状态选择器 -->
                <div class="flex gap-2 mb-4">
                  <button
                    v-for="status in ['普通', '紧急', '已完成', '已归档']"
                    :key="status"
                    @click="memoForm.status = status"
                    :class="[
                      'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
                      memoForm.status === status
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                    ]"
                  >
                    {{ status }}
                  </button>
                </div>

                <form @submit.prevent="saveMemo" class="space-y-4">
                  <div>
                    <input
                      type="text"
                      v-model="memoForm.title"
                      placeholder="备忘录标题"
                      class="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <textarea
                      v-model="memoForm.content"
                      rows="6"
                      placeholder="写下你的内容..."
                      class="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="tag in tags"
                        :key="tag.id"
                        type="button"
                        @click="toggleMemoTag(tag)"
                        :class="[
                          'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                          memoForm.tags.includes(tag.name)
                            ? 'bg-blue-500 text-white shadow-sm hover:bg-blue-600'
                            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                        ]"
                      >
                        {{ tag.name }}
                      </button>
                    </div>
                  </div>

                  <div class="flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="closeModal"
                      class="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      保存
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import AuroraBackground from '@/components/AuroraBackground.vue'


// 标签数据
const tags = ref([
  { id: 1, name: '工作' },
  { id: 2, name: '生活' },
  { id: 3, name: '学习' },
  { id: 4, name: '个人' },
  { id: 5, name: '家庭' },
])

// 备忘录数据
const memos = ref([
  {
    id: 1,
    title: '项目会议纪要',
    content: '讨论了Q3产品路线图，需要在下周三前完成原型设计并与团队分享。UI设计稿需要在本周五前提交给开发团队...',
    status: '紧急',
    tags: ['工作', '项目A'],
    createdAt: '2024-03-20',
    dueDate: '2024-03-25',
  },
  {
    id: 2,
    title: '周末购物清单',
    content: '1. 有机蔬菜 2. 橄榄油 3. 全麦面包 4. 鸡蛋 5. 牛奶 6. 鸡肉 7. 水果（苹果、香蕉）...',
    status: '普通',
    tags: ['生活', '购物'],
    createdAt: '2024-03-19',
    dueDate: '2024-03-23',
  },
  {
    id: 3,
    title: '阅读《设计心理学》笔记',
    content: '第一章重点：好的设计应该以人为本，考虑用户的实际需求和使用场景。设计师需要站在用户的角度思考问题...',
    status: '已完成',
    tags: ['学习', '阅读'],
    createdAt: '2024-03-18',
    dueDate: '2024-03-20',
  },
])

// 状态管理
const searchQuery = ref('')
const selectedTags = ref([])
const isModalOpen = ref(false)
const editingMemo = ref(null)
const memoForm = ref({
  title: '',
  content: '',
  status: '普通',
  tags: [],
  dueDate: '',
})

// 计算属性：过滤后的备忘录列表
const filteredMemos = computed(() => {
  return memos.value.filter(memo => {
    const matchesSearch = memo.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         memo.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesTags = selectedTags.value.length === 0 ||
                       memo.tags.some(tag => selectedTags.value.includes(tags.value.find(t => t.name === tag)?.id))
    return matchesSearch && matchesTags
  })
})

// 方法
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag.id)
  if (index === -1) {
    selectedTags.value.push(tag.id)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

const openNewMemoModal = () => {
  editingMemo.value = null
  memoForm.value = {
    title: '',
    content: '',
    status: '普通',
    tags: [],
    dueDate: '',
  }
  isModalOpen.value = true
}

const editMemo = (memo) => {
  editingMemo.value = memo
  memoForm.value = {
    title: memo.title,
    content: memo.content,
    status: memo.status,
    tags: [...memo.tags],
    dueDate: memo.dueDate,
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingMemo.value = null
}

const saveMemo = () => {
  if (editingMemo.value) {
    // 更新现有备忘录
    const index = memos.value.findIndex(m => m.id === editingMemo.value.id)
    memos.value[index] = {
      ...editingMemo.value,
      ...memoForm.value,
    }
  } else {
    // 创建新备忘录
    memos.value.push({
      id: Date.now(),
      ...memoForm.value,
      createdAt: new Date().toISOString().split('T')[0],
    })
  }
  closeModal()
}

const deleteMemo = (memo) => {
  if (confirm('确定要删除这条备忘录吗？')) {
    const index = memos.value.findIndex(m => m.id === memo.id)
    memos.value.splice(index, 1)
  }
}

const toggleMemoTag = (tag) => {
  const index = memoForm.value.tags.indexOf(tag.name)
  if (index === -1) {
    memoForm.value.tags.push(tag.name)
  } else {
    memoForm.value.tags.splice(index, 1)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status) => {
  switch (status) {
    case '紧急':
      return 'bg-red-50 text-red-600'
    case '已完成':
      return 'bg-green-50 text-green-600'
    case '已归档':
      return 'bg-gray-50 text-gray-600'
    default:
      return 'bg-blue-50 text-blue-600'
  }
}
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 确保背景组件在最底层 */
:root {
  --aurora-z-index: -10;
}

.fixed {
  z-index: var(--aurora-z-index);
}

/* 添加按钮悬停效果 */
button {
  position: relative;
  overflow: hidden;
}

button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

button:hover::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}
</style> 