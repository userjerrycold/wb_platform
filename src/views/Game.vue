<template>
  <div class="min-h-screen relative">
    <AuroraBackground class="fixed inset-0 -z-10 w-full h-full" />
    
    <!-- 主要内容区域 -->
    <main class="relative pt-20 px-4">
      <div class="max-w-7xl mx-auto py-8">
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-3 text-gray-800 dark:text-gray-200 font-serif">我的游戏世界</h1>
        <p class="text-lg md:text-xl font-medium text-center mb-8 text-gray-700 dark:text-gray-300 font-serif">记录游戏历程，分享游戏体验</p>

        <!-- 主要内容布局：左侧导航 + 右侧内容 -->
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 左侧游戏导航 -->
          <div class="md:w-1/4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 font-serif border-b border-gray-200 dark:border-gray-700 pb-2">我的游戏库</h2>
            <div class="space-y-2">
              <div v-for="(game, index) in games" :key="index"
                   @click="selectGame(index)"
                   class="flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300"
                   :class="selectedGameIndex === index ? 
                     'bg-indigo-100 dark:bg-indigo-900/40 border-l-4 border-indigo-500' : 
                     'hover:bg-gray-100 dark:hover:bg-gray-700/60 border-l-4 border-transparent'">
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-medium text-gray-800 dark:text-gray-200">{{ game.name }}</span>
                    <span :class="`px-2 py-0.5 rounded-full text-xs ${getStatusClass(game.status)}`">
                      {{ game.status }}
                    </span>
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ game.account.server }} | {{ game.account.character }} | {{ game.account.level }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 简单统计 -->
            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">游戏统计</h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">正在玩</span>
                  <span class="font-medium text-indigo-600 dark:text-indigo-400">{{ games.filter(g => g.status === '在玩').length }} 款</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">已搁置</span>
                  <span class="font-medium text-gray-600 dark:text-gray-400">{{ games.filter(g => g.status === '已搁置').length }} 款</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">间歇性游玩</span>
                  <span class="font-medium text-amber-600 dark:text-amber-400">{{ games.filter(g => g.status === '间歇性游玩').length }} 款</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧游戏详情内容 -->
          <div class="md:w-3/4">
            <ClientOnly>
              <div v-if="selectedGame" class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <!-- 游戏头部区域 -->
                <div class="relative p-6 border-b border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 class="text-2xl font-bold text-gray-800 dark:text-white font-serif">{{ selectedGame.name }}</h2>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {{ selectedGame.account.server }} | {{ selectedGame.account.character }} ({{ selectedGame.account.class }})
                      </p>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span :class="`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(selectedGame.status)}`">
                        {{ selectedGame.status }}
                      </span>
                      <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                        Lv.{{ selectedGame.account.level.replace('级', '') }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 选项卡导航 -->
                <div class="px-6 pt-4 border-b border-gray-200 dark:border-gray-700">
                  <nav class="flex space-x-6">
                    <button 
                      v-for="tab in tabs" 
                      :key="tab.id"
                      @click="activeTab = tab.id"
                      class="py-2 px-1 border-b-2 font-medium text-sm relative pb-3"
                      :class="activeTab === tab.id ? 
                        'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 
                        'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'"
                    >
                      <span>{{ tab.name }}</span>
                      <!-- 活动指示器 -->
                      <span v-if="activeTab === tab.id" class="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"></span>
                    </button>
                  </nav>
                </div>

                <!-- 内容区域 -->
                <div class="p-6">
                  <!-- 账号信息 -->
                  <div v-if="activeTab === 'account'">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <!-- 账号卡片 -->
                      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                        <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                          </svg>
                          账号信息
                        </h3>
                        <div class="space-y-3">
                          <div class="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <span class="text-gray-600 dark:text-gray-400">服务器</span>
                            <span class="text-gray-800 dark:text-white font-medium">{{ selectedGame.account.server }}</span>
                          </div>
                          <div class="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <span class="text-gray-600 dark:text-gray-400">角色名</span>
                            <span class="text-gray-800 dark:text-white font-medium">{{ selectedGame.account.character }}</span>
                          </div>
                          <div class="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <span class="text-gray-600 dark:text-gray-400">等级</span>
                            <span class="text-gray-800 dark:text-white font-medium">{{ selectedGame.account.level }}</span>
                          </div>
                          <div class="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <span class="text-gray-600 dark:text-gray-400">职业/种族</span>
                            <span class="text-gray-800 dark:text-white font-medium">{{ selectedGame.account.class }}</span>
                          </div>
                        </div>
                      </div>

                      <!-- 游戏好友卡片 -->
                      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                        <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          游戏好友
                        </h3>
                        <div class="space-y-2">
                          <div v-for="(friend, index) in selectedGame.account.friends" :key="index" 
                               class="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-700">
                            <div class="flex items-center">
                              <div class="w-2 h-2 rounded-full mr-3" :class="friend.online ? 'bg-green-500' : 'bg-gray-400'"></div>
                              <div>
                                <div class="text-gray-800 dark:text-white font-medium">{{ friend.name }}</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">{{ friend.class }}</div>
                              </div>
                            </div>
                            <span class="px-2 py-1 text-xs rounded-full" :class="friend.online ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'">
                              {{ friend.online ? '在线' : '离线' }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 游戏攻略 -->
                  <div v-if="activeTab === 'guides'" class="space-y-5">
                    <div v-for="(guide, index) in selectedGame.guides" :key="index"
                         class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 transition-all hover:shadow-md">
                      <div class="flex items-start justify-between">
                        <div>
                          <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">{{ guide.title }}</h3>
                          <p class="text-gray-600 dark:text-gray-400 mb-3">{{ guide.description }}</p>
                          <div class="flex items-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span class="text-gray-500 dark:text-gray-400">{{ guide.date }}</span>
                          </div>
                        </div>
                        <button class="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm transition-colors">
                          查看详情
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- 游戏进度 -->
                  <div v-if="activeTab === 'progress'" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                    <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                      </svg>
                      游戏进度
                    </h3>
                    <div class="space-y-5">
                      <div v-for="(progress, index) in selectedGame.progress" :key="index" class="space-y-2">
                        <div class="flex items-center justify-between mb-1">
                          <span class="text-gray-700 dark:text-gray-300 font-medium">{{ progress.name }}</span>
                          <div class="flex items-center">
                            <span class="text-gray-700 dark:text-gray-300 font-medium">{{ progress.value }}%</span>
                            <span :class="`ml-2 px-2 py-0.5 rounded-full text-xs ${getProgressClass(progress.value)}`">
                              {{ getProgressText(progress.value) }}
                            </span>
                          </div>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                          <div :class="`h-2.5 rounded-full ${getProgressBarClass(progress.value)}`" :style="`width: ${progress.value}%`"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 游戏新闻 -->
                  <div v-if="activeTab === 'news'" class="space-y-6">
                    <div v-for="(news, index) in selectedGame.news" :key="index"
                         class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md">
                      <div class="border-l-4 border-indigo-500 p-5">
                        <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">{{ news.title }}</h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">{{ news.summary }}</p>
                        <div class="flex items-center justify-between">
                          <div class="flex items-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span class="text-gray-500 dark:text-gray-400">{{ news.date }}</span>
                          </div>
                          <button class="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm transition-colors">
                            阅读全文
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AuroraBackground from '@/components/AuroraBackground.vue'
import CardContainer from '@/components/ui/card-3d/CardContainer.vue'
import CardBody from '@/components/ui/card-3d/CardBody.vue'
import CardItem from '@/components/ui/card-3d/CardItem.vue'

// 标签页
const tabs = [
  { id: 'account', name: '账号信息' },
  { id: 'guides', name: '游戏攻略' },
  { id: 'progress', name: '游戏进度' },
  { id: 'news', name: '游戏新闻' },
]

const activeTab = ref('account')

// 游戏数据
const games = ref([
  {
    name: '热血暗黑传奇',
    status: '在玩',
    account: {
      server: '烈火赤炎',
      character: '战神一刀',
      level: '145级',
      class: '战士',
      friends: [
        { name: '风云剑客', class: '道士', online: true },
        { name: '幽冥法师', class: '法师', online: false },
        { name: '天下无双', class: '战士', online: true },
      ]
    },
    guides: [
      { 
        title: '高级装备获取攻略', 
        description: '详细介绍赤月套装、祖玛套装等高级装备的获取方式和打宝地点。', 
        date: '2023-10-15' 
      },
      { 
        title: '新手练级路线', 
        description: '1-100级最快练级路线图，各阶段适合的刷怪地点。', 
        date: '2023-08-20' 
      },
      { 
        title: 'BOSS打法指南', 
        description: '各大BOSS的刷新时间、位置以及打法技巧。', 
        date: '2023-12-05' 
      }
    ],
    progress: [
      { name: '主线任务', value: 85 },
      { name: '装备收集', value: 70 },
      { name: '地图探索', value: 90 },
      { name: '成就完成', value: 65 }
    ],
    news: [
      { 
        title: '新版本"龙城决战"即将上线', 
        summary: '全新资料片将于下月推出，带来全新地图、职业平衡性调整和龙城战场玩法。', 
        date: '2024-05-15' 
      },
      { 
        title: '周年庆典活动详情公布', 
        summary: '游戏三周年庆典将提供丰厚奖励，包括限定称号、坐骑和稀有装备。', 
        date: '2024-04-28' 
      },
      { 
        title: '五一活动预告', 
        summary: '五一期间将开启双倍经验和爆率活动，并有神秘礼盒赠送。', 
        date: '2024-04-20' 
      }
    ]
  },
  {
    name: '幻兽帕鲁',
    status: '在玩',
    account: {
      server: '梦幻星球',
      character: '驯兽大师',
      level: '32级',
      class: '驯兽师',
      friends: [
        { name: '帕鲁收集者', class: '驯兽师', online: true },
        { name: '星辰', class: '探险家', online: false },
        { name: '夜影', class: '驯兽师', online: false },
      ]
    },
    guides: [
      { 
        title: '稀有帕鲁捕获指南', 
        description: '详解各种稀有帕鲁的分布地点、出现时间和捕获技巧。', 
        date: '2024-02-10' 
      },
      { 
        title: '最强帕鲁搭配', 
        description: '不同场景下的帕鲁最佳组合推荐及配合打法。', 
        date: '2024-01-25' 
      },
      { 
        title: '基地建设指南', 
        description: '高效资源利用和基地布局规划，提升生产效率。', 
        date: '2024-03-05' 
      }
    ],
    progress: [
      { name: '图鉴收集', value: 78 },
      { name: '主线任务', value: 65 },
      { name: '区域探索', value: 82 },
      { name: '稀有帕鲁', value: 45 }
    ],
    news: [
      { 
        title: '"深海探秘"DLC即将发布', 
        summary: '全新水下地图及30种海洋帕鲁将在下个月登场，玩家可以开启潜水探险。', 
        date: '2024-05-18' 
      },
      { 
        title: '多人联机模式优化更新', 
        summary: '最新补丁将修复多人联机模式的延迟问题，并增加新的社交功能。', 
        date: '2024-05-02' 
      },
      { 
        title: '春季限定帕鲁活动', 
        summary: '春季限定的花属性帕鲁将在特定地点短期出现，捕获机会稀少。', 
        date: '2024-04-10' 
      }
    ]
  },
  {
    name: '暗黑2重置版',
    status: '间歇性游玩',
    account: {
      server: '亚服',
      character: '冰火法师',
      level: '85级',
      class: '法师',
      friends: [
        { name: '圣骑士之光', class: '圣骑士', online: false },
        { name: '死神收割者', class: '死灵法师', online: true },
        { name: '亚马逊女王', class: '亚马逊', online: false },
      ]
    },
    guides: [
      { 
        title: '法师单人HC地狱攻略', 
        description: '针对法师单人HC地狱难度通关的全面指南，包含技能配点和装备选择。', 
        date: '2023-08-15' 
      },
      { 
        title: '符文之语配方大全', 
        description: '所有符文之语的组合配方及适用职业分析。', 
        date: '2023-09-20' 
      },
      { 
        title: '高效刷图路线', 
        description: '各职业最适合的刷怪和打宝路线图，提高游戏效率。', 
        date: '2023-11-12' 
      }
    ],
    progress: [
      { name: '普通难度', value: 100 },
      { name: '噩梦难度', value: 100 },
      { name: '地狱难度', value: 75 },
      { name: '符文收集', value: 40 }
    ],
    news: [
      { 
        title: '2.6补丁平衡性调整预览', 
        summary: '即将到来的2.6补丁将对多个职业进行平衡调整，尤其是增强德鲁伊和刺客的技能表现。', 
        date: '2024-05-10' 
      },
      { 
        title: '新赛季"地狱审判"公布', 
        summary: '新赛季将引入全新的地狱审判机制，玩家可挑战更高难度获取专属奖励。', 
        date: '2024-04-25' 
      },
      { 
        title: '经典怀旧服开启计划', 
        summary: '暴雪计划推出经典版本服务器，让玩家体验原汁原味的暗黑体验。', 
        date: '2024-04-01' 
      }
    ]
  },
  {
    name: '问道',
    status: '已搁置',
    account: {
      server: '逍遥天下',
      character: '云端逍遥子',
      level: '109级',
      class: '方寸山',
      friends: [
        { name: '蓬莱仙子', class: '蓬莱', online: false },
        { name: '万法天尊', class: '天宫', online: false },
        { name: '布衣剑客', class: '大唐', online: false },
      ]
    },
    guides: [
      { 
        title: '方寸山PK技巧', 
        description: '方寸山的PK连招、卡位技巧及对战各门派的应对策略。', 
        date: '2023-06-18' 
      },
      { 
        title: '高效赚钱指南', 
        description: '游戏内各种赚钱方式对比及推荐，从日常任务到商人经营。', 
        date: '2023-07-22' 
      },
      { 
        title: '宝宝培养攻略', 
        description: '从捕捉到培养，全方位的宝宝养成指南。', 
        date: '2023-08-30' 
      }
    ],
    progress: [
      { name: '主线任务', value: 95 },
      { name: '装备收集', value: 80 },
      { name: '宝宝培养', value: 70 },
      { name: '技能修炼', value: 85 }
    ],
    news: [
      { 
        title: '"仙魔大战"新资料片预告', 
        summary: '全新资料片将重塑仙魔对立格局，引入阵营战争系统和全新地图。', 
        date: '2024-03-28' 
      },
      { 
        title: '端午节活动即将开启', 
        summary: '端午节期间将有龙舟竞赛、收集活动和限定坐骑。', 
        date: '2024-03-15' 
      },
      { 
        title: '新门派"星宿派"即将登场', 
        summary: '全新门派星宿派将于下月上线，带来独特毒系技能和全新游戏体验。', 
        date: '2024-02-28' 
      }
    ]
  },
  {
    name: 'DNF',
    status: '已搁置',
    account: {
      server: '广东一区',
      character: '红眼狂战',
      level: '110级',
      class: '鬼泣',
      friends: [
        { name: '大地之光', class: '奶爸', online: false },
        { name: '机械之心', class: '机械师', online: false },
        { name: '影舞者', class: '影舞者', online: false },
      ]
    },
    guides: [
      { 
        title: '鬼泣毕业装备搭配', 
        description: '详解鬼泣各个毕业阶段的最佳装备搭配和毕业路线。', 
        date: '2023-05-10' 
      },
      { 
        title: '团本机制详解', 
        description: '最新团队副本的机制解析和职业分工。', 
        date: '2023-06-15' 
      },
      { 
        title: '搬砖最高效率路线', 
        description: '当前版本最高效率的搬砖地图和方式推荐。', 
        date: '2023-07-20' 
      }
    ],
    progress: [
      { name: '主线剧情', value: 100 },
      { name: '装备收集', value: 60 },
      { name: '副本攻略', value: 75 },
      { name: '深渊探索', value: 80 }
    ],
    news: [
      { 
        title: '110级春季职业平衡性调整', 
        summary: '新一轮职业平衡性调整将对鬼剑士和魔法师系进行加强，格斗家系进行削弱。', 
        date: '2024-04-20' 
      },
      { 
        title: '复活节活动福利详情', 
        summary: '复活节期间登录游戏可获得丰厚奖励，包括稀有称号和时装。', 
        date: '2024-04-05' 
      },
      { 
        title: '新副本"次元裂缝"开放', 
        summary: '全新高难度副本开放，挑战成功可获得独特光环和武器。', 
        date: '2024-03-15' 
      }
    ]
  }
])

const selectedGameIndex = ref(0)
const selectedGame = computed(() => games.value[selectedGameIndex.value])

// 选择游戏
function selectGame(index) {
  selectedGameIndex.value = index
  activeTab.value = 'account' // 切换游戏时重置为账号信息标签
}

// 获取状态样式类
function getStatusClass(status) {
  switch(status) {
    case '在玩':
      return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
    case '已搁置':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    case '间歇性游玩':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

// 获取进度条样式类
function getProgressBarClass(value) {
  if (value >= 90) return 'bg-green-500';
  if (value >= 70) return 'bg-blue-500';
  if (value >= 40) return 'bg-amber-500';
  return 'bg-red-500';
}

// 获取进度文本
function getProgressText(value) {
  if (value >= 90) return '完成';
  if (value >= 70) return '进行中';
  if (value >= 40) return '起步';
  return '开始';
}

// 获取进度提示样式
function getProgressClass(value) {
  if (value >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
  if (value >= 70) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
  if (value >= 40) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
  return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
}
</script> 