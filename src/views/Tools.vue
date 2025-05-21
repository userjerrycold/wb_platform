<template>
  <div class="min-h-screen relative">
    <AuroraBackground class="fixed inset-0 -z-10 w-full h-full" />
    
    <!-- 主要内容区域 -->
    <main class="relative pt-20 px-4">
      <div class="max-w-7xl mx-auto py-8">
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-3 text-gray-800 dark:text-gray-200 font-serif">工具箱</h1>
        <p class="text-lg md:text-xl font-medium text-center mb-8 text-gray-700 dark:text-gray-300 font-serif">一站式管理您的工作任务与生活计划，让每一天都井井有条</p>

        <!-- 主要内容布局：左侧导航 + 右侧内容 -->
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 左侧工具列表 -->
          <div class="md:w-1/4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 font-serif border-b border-gray-200 dark:border-gray-700 pb-2">工具列表</h2>
            
            <div class="space-y-2">
              <div
                v-for="tool in tools"
                :key="tool.id"
                @click="selectedTool = tool.id"
                class="flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300"
                :class="selectedTool === tool.id ? 
                  'bg-blue-100 dark:bg-blue-900/40 border-l-4 border-blue-500' : 
                  'hover:bg-gray-100 dark:hover:bg-gray-700/60 border-l-4 border-transparent'"
              >
                <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="tool.iconBg">
                  <component :is="tool.icon" class="w-5 h-5" :class="tool.iconColor" />
                </div>
                <span class="ml-3 font-medium text-gray-800 dark:text-gray-200">{{ tool.name }}</span>
              </div>
            </div>

            <!-- 工具统计 -->
            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">工具统计</h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">开发工具</span>
                  <span class="font-medium text-blue-600 dark:text-blue-400">4 个</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">文本工具</span>
                  <span class="font-medium text-green-600 dark:text-green-400">2 个</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">管理工具</span>
                  <span class="font-medium text-purple-600 dark:text-purple-400">2 个</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">自定义工具</span>
                  <span class="font-medium text-gray-600 dark:text-gray-400">1 个</span>
                </div>
              </div>
            </div>
            
            <!-- 最近使用 -->
            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">最近使用</h3>
              <div class="space-y-2">
                <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <span class="text-sm text-gray-600 dark:text-gray-300">JSON格式化</span>
                  <span class="text-xs text-gray-500">2小时前</span>
                </div>
                <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <span class="text-sm text-gray-600 dark:text-gray-300">MD5加密</span>
                  <span class="text-xs text-gray-500">昨天</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧工具内容 -->
          <div class="md:w-3/4">
            <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- 工具头部区域 -->
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center" 
                         :class="tools.find(t => t.id === selectedTool)?.iconBg">
                      <component 
                        :is="tools.find(t => t.id === selectedTool)?.icon" 
                        class="w-6 h-6" 
                        :class="tools.find(t => t.id === selectedTool)?.iconColor" 
                      />
                    </div>
                    <div>
                      <h2 class="text-2xl font-bold text-gray-800 dark:text-white font-serif">
                        {{ tools.find(t => t.id === selectedTool)?.name }}
                      </h2>
                      <p v-if="selectedTool === 'mock'" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        快速生成模拟数据
                      </p>
                      <p v-else-if="selectedTool === 'docs'" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        项目文档集中管理
                      </p>
                      <p v-else-if="selectedTool === 'json'" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        格式化和转换工具
                      </p>
                      <p v-else-if="selectedTool === 'git'" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Git命令生成器
                      </p>
                      <p v-else-if="selectedTool === 'md5'" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        MD5加密和解密
                      </p>
                      <p v-else-if="selectedTool === 'diff'" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        文本差异对比工具
                      </p>
                      <p v-else-if="selectedTool === 'api'" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        API文档生成器
                      </p>
                      <p v-else-if="selectedTool === 'favorites'" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        常用工具收藏
                      </p>
                      <p v-else-if="selectedTool === 'new'" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        创建自定义工具
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 工具内容区域 -->
              <div class="p-6">
                <!-- MOCK工具 -->
                <div v-if="selectedTool === 'mock'" class="space-y-4">
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div class="space-y-4">
                      <div class="flex items-center space-x-4">
                        <select class="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2">
                          <option>选择数据类型</option>
                          <option>用户信息</option>
                          <option>商品数据</option>
                          <option>订单信息</option>
                        </select>
                        <button class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600">
                          生成数据
                        </button>
                      </div>
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <pre class="text-sm text-gray-700 dark:text-gray-300 overflow-auto">// 生成的模拟数据将显示在这里</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 文档管理 -->
                <div v-if="selectedTool === 'docs'" class="space-y-4">
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">最近文档</h4>
                        <div class="space-y-2">
                          <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            <span class="text-sm text-gray-600 dark:text-gray-300">项目需求文档</span>
                            <span class="text-xs text-gray-500">2小时前</span>
                          </div>
                          <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            <span class="text-sm text-gray-600 dark:text-gray-300">API文档</span>
                            <span class="text-xs text-gray-500">昨天</span>
                          </div>
                        </div>
                      </div>
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">文档分类</h4>
                        <div class="space-y-2">
                          <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            <span class="text-sm text-gray-600 dark:text-gray-300">技术文档</span>
                            <span class="text-xs text-gray-500">12篇</span>
                          </div>
                          <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            <span class="text-sm text-gray-600 dark:text-gray-300">产品文档</span>
                            <span class="text-xs text-gray-500">8篇</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- JSON/XML工具 -->
                <div v-if="selectedTool === 'json'" class="space-y-4">
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div class="space-y-4">
                      <div class="flex items-center space-x-4">
                        <select class="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2">
                          <option>JSON</option>
                          <option>XML</option>
                        </select>
                        <button class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600">
                          格式化
                        </button>
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                          <textarea
                            class="w-full h-64 bg-transparent border-0 focus:ring-0 text-sm text-gray-700 dark:text-gray-300"
                            placeholder="输入JSON或XML..."
                          ></textarea>
                        </div>
                        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                          <pre class="w-full h-64 text-sm text-gray-700 dark:text-gray-300 overflow-auto">// 格式化后的内容将显示在这里</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- GIT辅助工具 -->
                <div v-if="selectedTool === 'git'" class="space-y-4">
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">常用操作</h4>
                        <div class="space-y-2">
                          <button class="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            初始化仓库
                          </button>
                          <button class="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            提交更改
                          </button>
                          <button class="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            创建分支
                          </button>
                        </div>
                      </div>
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">生成的命令</h4>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <code class="text-sm text-gray-700 dark:text-gray-300">git init</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- MD5工具 -->
                <div v-if="selectedTool === 'md5'" class="space-y-4">
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div class="space-y-4">
                      <div class="flex items-center space-x-4">
                        <input
                          type="text"
                          placeholder="输入要加密的文本"
                          class="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                        />
                        <button class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600">
                          加密
                        </button>
                      </div>
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <div class="text-sm text-gray-700 dark:text-gray-300">加密结果将显示在这里</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 文本比较工具 -->
                <div v-if="selectedTool === 'diff'" class="space-y-4">
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <textarea
                          class="w-full h-64 bg-transparent border-0 focus:ring-0 text-sm text-gray-700 dark:text-gray-300"
                          placeholder="输入原始文本..."
                        ></textarea>
                      </div>
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <textarea
                          class="w-full h-64 bg-transparent border-0 focus:ring-0 text-sm text-gray-700 dark:text-gray-300"
                          placeholder="输入比较文本..."
                        ></textarea>
                      </div>
                    </div>
                    <div class="mt-4">
                      <button class="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600">
                        比较差异
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 接口文档工具 -->
                <div v-if="selectedTool === 'api'" class="space-y-4">
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div class="space-y-4">
                      <div class="flex items-center space-x-4">
                        <input
                          type="text"
                          placeholder="输入接口URL"
                          class="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                        />
                        <button class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600">
                          生成文档
                        </button>
                      </div>
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <div class="text-sm text-gray-700 dark:text-gray-300">接口文档将显示在这里</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 收藏列表 -->
                <div v-if="selectedTool === 'favorites'" class="space-y-4">
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">最近使用</h4>
                        <div class="space-y-2">
                          <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            <span class="text-sm text-gray-600 dark:text-gray-300">JSON格式化</span>
                            <span class="text-xs text-gray-500">2小时前</span>
                          </div>
                          <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            <span class="text-sm text-gray-600 dark:text-gray-300">MD5加密</span>
                            <span class="text-xs text-gray-500">昨天</span>
                          </div>
                        </div>
                      </div>
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">收藏夹</h4>
                        <div class="space-y-2">
                          <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            <span class="text-sm text-gray-600 dark:text-gray-300">Git命令生成器</span>
                            <button class="text-gray-400 hover:text-gray-600">
                              <StarIcon class="w-4 h-4" />
                            </button>
                          </div>
                          <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                            <span class="text-sm text-gray-600 dark:text-gray-300">接口文档工具</span>
                            <button class="text-gray-400 hover:text-gray-600">
                              <StarIcon class="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 新建工具 -->
                <div v-if="selectedTool === 'new'" class="space-y-4">
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div class="space-y-4">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">工具名称</label>
                          <input
                            type="text"
                            class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                            placeholder="输入工具名称"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">工具类型</label>
                          <select class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2">
                            <option>开发工具</option>
                            <option>效率工具</option>
                            <option>设计工具</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">工具描述</label>
                        <textarea
                          class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2"
                          rows="3"
                          placeholder="输入工具描述"
                        ></textarea>
                      </div>
                      <div class="flex justify-end">
                        <button class="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700">
                          创建工具
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AuroraBackground from '@/components/AuroraBackground.vue'

// 工具图标组件
const MockIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>'
}

const DocsIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
}

const JsonIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>'
}

const GitIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>'
}

const Md5Icon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>'
}

const DiffIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>'
}

const ApiIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>'
}

const FavoritesIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>'
}

const NewIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>'
}

const StarIcon = {
  template: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>'
}

// 工具列表
const tools = [
  {
    id: 'mock',
    name: 'MOCK',
    icon: MockIcon,
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    iconColor: 'text-white'
  },
  {
    id: 'docs',
    name: '文档管理',
    icon: DocsIcon,
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    iconColor: 'text-white'
  },
  {
    id: 'json',
    name: 'JSON/XML',
    icon: JsonIcon,
    iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
    iconColor: 'text-white'
  },
  {
    id: 'git',
    name: 'GIT辅助',
    icon: GitIcon,
    iconBg: 'bg-gradient-to-br from-orange-500 to-red-500',
    iconColor: 'text-white'
  },
  {
    id: 'md5',
    name: 'MD5',
    icon: Md5Icon,
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-500',
    iconColor: 'text-white'
  },
  {
    id: 'diff',
    name: '文本比较',
    icon: DiffIcon,
    iconBg: 'bg-gradient-to-br from-pink-500 to-rose-500',
    iconColor: 'text-white'
  },
  {
    id: 'api',
    name: '接口文档',
    icon: ApiIcon,
    iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-500',
    iconColor: 'text-white'
  },
  {
    id: 'favorites',
    name: '收藏列表',
    icon: FavoritesIcon,
    iconBg: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    iconColor: 'text-white'
  },
  {
    id: 'new',
    name: '新建工具',
    icon: NewIcon,
    iconBg: 'bg-gradient-to-br from-gray-500 to-gray-600',
    iconColor: 'text-white'
  }
]

const selectedTool = ref('mock')
</script>

<style scoped>
/* 添加工具卡片悬停效果 */
.bg-white:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease-in-out;
}
</style> 