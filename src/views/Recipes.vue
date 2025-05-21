<template>
  <div class="min-h-screen relative">
    <AuroraBackground class="fixed inset-0 -z-10 w-full h-full" />
    
    <!-- 主要内容区域 -->
    <main class="relative pt-20 px-4">
      <div class="max-w-7xl mx-auto py-8">
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-3 text-gray-800 dark:text-gray-200 font-serif">美食菜谱</h1>
        <p class="text-lg md:text-xl font-medium text-center mb-8 text-gray-700 dark:text-gray-300 font-serif">精选美食菜谱，让烹饪更简单</p>

        <!-- 主要内容布局：左侧导航 + 右侧内容 -->
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 左侧分类导航 -->
          <div class="md:w-1/4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 font-serif border-b border-gray-200 dark:border-gray-700 pb-2">菜系分类</h2>
            
            <!-- 分类列表 -->
            <div class="space-y-2">
              <div v-for="category in categories" :key="category.id"
                   @click="selectedCategory = category.id"
                   class="flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300"
                   :class="selectedCategory === category.id ? 
                     'bg-red-100 dark:bg-red-900/40 border-l-4 border-red-500' : 
                     'hover:bg-gray-100 dark:hover:bg-gray-700/60 border-l-4 border-transparent'">
                <div class="flex items-center space-x-3">
                  <span class="text-xl">{{ category.icon }}</span>
                  <span class="font-medium text-gray-800 dark:text-gray-200">{{ category.name }}</span>
                </div>
              </div>
            </div>

            <!-- 功能按钮 -->
            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
              <button
                @click="toggleOrderRecords"
                class="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-between"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>点单记录</span>
                </div>
                <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                  {{ orderRecords.length }}
                </span>
              </button>
              
              <button
                @click="showRandomMatch = true"
                class="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span>随机匹配</span>
              </button>
            </div>

            <!-- 菜系统计 -->
            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">菜系统计</h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">中餐</span>
                  <span class="font-medium text-red-600 dark:text-red-400">{{ recipes.filter(r => r.category === 'chinese').length }} 道</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">西餐</span>
                  <span class="font-medium text-blue-600 dark:text-blue-400">{{ recipes.filter(r => r.category === 'western').length }} 道</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">甜点</span>
                  <span class="font-medium text-pink-600 dark:text-pink-400">{{ recipes.filter(r => r.category === 'dessert').length }} 道</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">小吃</span>
                  <span class="font-medium text-amber-600 dark:text-amber-400">{{ recipes.filter(r => r.category === 'snack').length }} 道</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧内容区域 -->
          <div class="md:w-3/4">
            <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- 头部区域 -->
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white font-serif">{{ categories.find(c => c.id === selectedCategory)?.name || '全部菜谱' }}</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      当前展示 {{ filteredRecipes.length }} 道菜品
                    </p>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <span>{{ categories.find(c => c.id === selectedCategory)?.icon }}</span>
                      <span>{{ categories.find(c => c.id === selectedCategory)?.name }}</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- 菜品列表 -->
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <div
                    v-for="recipe in filteredRecipes"
                    :key="recipe.id"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    <img :src="recipe.image" :alt="recipe.name" class="w-full h-48 object-cover">
                    <div class="p-4">
                      <div class="flex justify-between items-start mb-2">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ recipe.name }}</h3>
                        <span class="px-2 py-0.5 rounded-full text-xs" 
                              :class="getCategoryClass(recipe.category)">
                          {{ getCategoryName(recipe.category) }}
                        </span>
                      </div>
                      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{{ recipe.description }}</p>
                      <div class="flex justify-between items-center">
                        <button
                          @click="showRecipeDetails(recipe)"
                          class="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200 flex items-center space-x-1"
                        >
                          <span>👩‍🍳</span>
                          <span>详细做法</span>
                        </button>
                        <button
                          @click="addToMenu(recipe)"
                          class="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center space-x-1"
                        >
                          <span>➕</span>
                          <span>加入菜单</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 详细做法弹窗 -->
    <div
      v-if="selectedRecipe"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="selectedRecipe = null"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ selectedRecipe.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ selectedRecipe.description }}</p>
          </div>
          <button
            @click="selectedRecipe = null"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="space-y-6">
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
              <span class="mr-2">📷</span>
              <span>菜品图片</span>
            </h4>
            <img :src="selectedRecipe.image" :alt="selectedRecipe.name" class="w-full rounded-lg">
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
              <span class="mr-2">🥕</span>
              <span>食材</span>
            </h4>
            <ul class="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li v-for="ingredient in selectedRecipe.ingredients" :key="ingredient">
                {{ ingredient }}
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
              <span class="mr-2">👨‍🍳</span>
              <span>做法步骤</span>
            </h4>
            <ol class="list-decimal list-inside text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li v-for="step in selectedRecipe.steps" :key="step">
                {{ step }}
              </li>
            </ol>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
              <span class="mr-2">💪</span>
              <span>营养介绍</span>
            </h4>
            <div class="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <p>{{ selectedRecipe.nutrition }}</p>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
              <span class="mr-2">⚠️</span>
              <span>注意事项</span>
            </h4>
            <ul class="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li v-for="precaution in selectedRecipe.precautions" :key="precaution">
                {{ precaution }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 随机匹配弹窗 -->
    <div
      v-if="showRandomMatch"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showRandomMatch = false"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">随机匹配</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">为您推荐一道美食</p>
          </div>
          <button
            @click="showRandomMatch = false"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ randomRecipe ? randomRecipe.name : '正在匹配...' }}
          </div>
          <button
            @click="generateRandomRecipe"
            class="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200"
          >
            换一个
          </button>
        </div>
      </div>
    </div>

    <!-- 点单记录弹窗 -->
    <div
      v-if="showOrderRecords"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="toggleOrderRecords"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">点单记录</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">查看所有菜品的点单历史</p>
          </div>
          <button
            @click="toggleOrderRecords"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div
            v-for="record in orderRecords"
            :key="record.id"
            class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <span class="text-lg font-medium text-gray-900 dark:text-white">{{ record.dishName }}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ record.time }}</span>
              </div>
              <button
                @click="removeOrderRecord(record.id)"
                class="text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 单个菜品历史点单弹窗 -->
    <div
      v-if="showDishHistoryModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showDishHistoryModal = false"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ selectedDish?.name }} 点单历史</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">查看该菜品的点单记录</p>
          </div>
          <button
            @click="showDishHistoryModal = false"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div
            v-for="record in dishHistoryRecords"
            :key="record.id"
            class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ record.time }}</span>
              <button
                @click="removeDishHistoryRecord(record.id)"
                class="text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AuroraBackground from '@/components/AuroraBackground.vue'

// 菜系分类
const categories = [
  { id: 'all', name: '全部', icon: '🍽️' },
  { id: 'chinese', name: '中餐', icon: '🥢' },
  { id: 'western', name: '西餐', icon: '🍴' },
  { id: 'dessert', name: '甜点', icon: '🍰' },
  { id: 'snack', name: '小吃', icon: '🍢' }
]

// 示例菜谱数据
const recipes = [
  {
    id: 1,
    name: '红烧排骨',
    description: '经典家常菜，肉质鲜嫩，口感丰富',
    category: 'chinese',
    image: 'https://via.placeholder.com/400x300?text=红烧排骨',
    ingredients: [
      '排骨 500g',
      '生抽 2勺',
      '老抽 1勺',
      '料酒 1勺',
      '冰糖 适量',
      '葱姜蒜 适量'
    ],
    steps: [
      '排骨切块，焯水去血水',
      '锅中放油，爆香葱姜蒜',
      '放入排骨翻炒至变色',
      '加入调味料，大火烧开后转小火慢炖',
      '收汁后即可出锅'
    ],
    nutrition: '排骨富含优质蛋白质和钙质，有助于强健骨骼和肌肉。红烧排骨中的胶原蛋白对皮肤有很好的滋养作用，同时富含铁质，有助于预防贫血。',
    precautions: [
      '排骨需要充分焯水去除血水和杂质',
      '高血压患者应适量食用，注意控制盐分',
      '炖煮时间要足够，确保肉质酥烂',
      '建议搭配蔬菜一起食用，营养更均衡'
    ]
  },
  {
    id: 2,
    name: '意大利面',
    description: '简单易做的西式料理，营养美味',
    category: 'western',
    image: 'https://via.placeholder.com/400x300?text=意大利面',
    ingredients: [
      '意大利面 200g',
      '番茄酱 适量',
      '洋葱 1个',
      '蒜末 适量',
      '橄榄油 适量',
      '盐 适量'
    ],
    steps: [
      '锅中水烧开，放入意大利面',
      '另起锅，爆香蒜末和洋葱',
      '加入番茄酱翻炒',
      '面条煮熟后加入酱汁',
      '翻炒均匀即可'
    ],
    nutrition: '意大利面富含碳水化合物，是优质的能量来源。番茄酱中的番茄红素具有抗氧化作用，有助于预防心血管疾病。橄榄油富含不饱和脂肪酸，对心脏健康有益。',
    precautions: [
      '面条煮制时间要适中，保持弹性',
      '糖尿病患者应控制食用量',
      '建议选择全麦意大利面，营养价值更高',
      '可以加入蔬菜增加膳食纤维摄入'
    ]
  },
  {
    id: 3,
    name: '提拉米苏',
    description: '经典意大利甜点，口感醇厚，层次丰富',
    category: 'dessert',
    image: 'https://via.placeholder.com/400x300?text=提拉米苏',
    ingredients: [
      'Mascarpone奶酪 250g',
      '手指饼干 200g',
      '浓缩咖啡 100ml',
      '鸡蛋 3个',
      '细砂糖 60g',
      '可可粉 适量'
    ],
    steps: [
      '将蛋黄与糖打发至颜色变浅',
      '加入Mascarpone奶酪拌匀',
      '蛋白打发至硬性发泡，与奶酪糊拌匀',
      '将手指饼干浸入咖啡中，铺底',
      '倒入一半奶酪糊，再铺一层饼干',
      '倒入剩余奶酪糊，表面撒可可粉',
      '冷藏至少4小时'
    ],
    nutrition: '提拉米苏富含蛋白质和钙质，咖啡因有提神醒脑的功效。适量食用可以提供能量，但因为含有高糖和高脂，不宜过量。',
    precautions: [
      '孕妇和儿童应避免食用含酒精的版本',
      '糖尿病患者应减少食用量',
      '可选择低脂奶酪减少热量摄入',
      '储存时务必保持冷藏，避免变质'
    ]
  },
  {
    id: 4,
    name: '麻辣烫',
    description: '地道川式小吃，麻辣鲜香，一次满足多种食欲',
    category: 'snack',
    image: 'https://via.placeholder.com/400x300?text=麻辣烫',
    ingredients: [
      '牛肉丸 100g',
      '藕片 100g',
      '土豆片 100g',
      '豆腐皮 100g',
      '金针菇 100g',
      '油菜 100g',
      '辣椒油 适量',
      '花椒 适量',
      '各种调料 适量'
    ],
    steps: [
      '准备高汤，加入花椒、八角、桂皮等香料',
      '将食材洗净，切好备用',
      '汤煮沸后下入食材',
      '煮熟后捞出，加入调料即可'
    ],
    nutrition: '麻辣烫中的蔬菜提供多种维生素和矿物质，肉类提供优质蛋白质。可根据个人健康状况选择不同食材，做到营养均衡。',
    precautions: [
      '辣椒不耐受者可减少辣椒用量',
      '注意食材煮熟再食用，避免食物中毒',
      '高血压患者应减少盐分摄入',
      '可根据个人口味调整调料用量'
    ]
  }
]

// 状态管理
const selectedCategory = ref('all')
const selectedRecipe = ref(null)
const showRandomMatch = ref(false)
const randomRecipe = ref(null)
const showOrderRecords = ref(false)
const showDishHistoryModal = ref(false)
const selectedDish = ref(null)
const orderRecords = ref([])
const dishHistoryRecords = ref([])

// 过滤菜谱
const filteredRecipes = computed(() => {
  if (selectedCategory.value === 'all') {
    return recipes
  }
  return recipes.filter(recipe => recipe.category === selectedCategory.value)
})

// 显示菜谱详情
const showRecipeDetails = (recipe) => {
  selectedRecipe.value = recipe
}

// 格式化时间
const formatDateTime = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 添加到菜单
const addToMenu = (recipe) => {
  const now = new Date()
  const time = formatDateTime(now)
  
  // 添加新的点单记录
  orderRecords.value.unshift({
    id: Date.now(),
    dishName: recipe.name,
    time: time
  })
  
  // 显示提示
  alert(`已将 ${recipe.name} 添加到菜单`)
}

// 显示单个菜品历史点单
const showDishHistory = (recipe) => {
  selectedDish.value = recipe
  dishHistoryRecords.value = orderRecords.value
    .filter(record => record.dishName === recipe.name)
    .sort((a, b) => new Date(b.time) - new Date(a.time))
  showDishHistoryModal.value = true
}

// 删除单个菜品历史记录
const removeDishHistoryRecord = (id) => {
  orderRecords.value = orderRecords.value.filter(record => record.id !== id)
  dishHistoryRecords.value = dishHistoryRecords.value.filter(record => record.id !== id)
}

// 切换点单记录显示
const toggleOrderRecords = () => {
  showOrderRecords.value = !showOrderRecords.value
}

// 删除点单记录
const removeOrderRecord = (id) => {
  orderRecords.value = orderRecords.value.filter(record => record.id !== id)
}

// 生成随机菜谱
const generateRandomRecipe = () => {
  const randomIndex = Math.floor(Math.random() * recipes.length)
  randomRecipe.value = recipes[randomIndex]
}

// 获取分类样式类
const getCategoryClass = (category) => {
  switch(category) {
    case 'chinese':
      return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
    case 'western':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
    case 'dessert':
      return 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300';
    case 'snack':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

// 获取分类名称
const getCategoryName = (categoryId) => {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : '其他'
}
</script>

<style scoped>
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style> 