<template>
  <div class="min-h-screen relative">
    <AuroraBackground class="fixed inset-0 -z-10 w-full h-full" />
    
    <!-- 主要内容区域 -->
    <main class="relative pt-20 px-4">
      <div class="max-w-7xl mx-auto py-8">
       
        <!-- 主要内容布局：左侧导航 + 右侧内容 -->
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 左侧导航 -->
          <div class="md:w-1/4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 font-serif border-b border-gray-200 dark:border-gray-700 pb-2">暗黑破坏神2重制版</h2>
            <nav class="space-y-1">
              <button
                v-for="(item, index) in navItems" 
                :key="index"
                @click="activeSection = item.id"
                class="w-full flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 text-left"
                :class="activeSection === item.id ? 
                  'bg-indigo-100 dark:bg-indigo-900/40 border-l-4 border-indigo-500' : 
                  'hover:bg-gray-100 dark:hover:bg-gray-700/60 border-l-4 border-transparent'"
              >
                <span class="text-gray-800 dark:text-gray-200 font-medium">{{ item.name }}</span>
              </button>
            </nav>

            <!-- 游戏统计 -->
            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">游戏统计</h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">游戏时长</span>
                  <span class="font-medium text-indigo-600 dark:text-indigo-400">263 小时</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">角色数量</span>
                  <span class="font-medium text-indigo-600 dark:text-indigo-400">7 个</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">最高等级</span>
                  <span class="font-medium text-indigo-600 dark:text-indigo-400">92 级</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧内容区域 -->
          <div class="md:w-3/4">
            <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-6">

              <!-- 游戏资讯 -->
              <div v-if="activeSection === 'news'" class="space-y-6">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">游戏资讯</h3>
                <div v-for="(news, index) in gameNews" :key="index" 
                     class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:border-indigo-500/50">
                  <div class="p-5">
                    <h4 class="text-lg font-medium text-gray-800 dark:text-white mb-2">{{ news.title }}</h4>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">{{ news.summary }}</p>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span class="text-gray-500">{{ news.date }}</span>
                      </div>
                      <button class="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm transition-colors">
                        阅读全文
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 表格预览 -->
              <div v-if="activeSection === 'table'" class="space-y-6">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">表格预览</h3>
                
                <!-- 无数据状态/导入区域 -->
                <div v-if="!tableData.length" class="bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-dashed border-gray-300 dark:border-gray-600 p-8">
                  <div class="text-center space-y-4">
                    <div class="flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 class="text-lg font-medium text-gray-800 dark:text-white">导入Excel文件</h4>
                    <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      上传Excel文件以查看、编辑和分析您的数据。支持.xlsx和.xls格式。
                    </p>
                    <div class="pt-4">
                      <label class="cursor-pointer">
                        <input type="file" class="hidden" @change="handleFileUpload" accept=".xlsx, .xls" />
                        <span class="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 inline-flex items-center transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                          </svg>
                          选择文件
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <!-- 表格数据展示 -->
                <div v-else class="space-y-4">
                  <!-- 表格工具栏 -->
                  <div class="flex flex-wrap gap-3 justify-between items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-3">
                    <div class="flex flex-wrap gap-2">
                      <button @click="clearTable" class="px-3 py-1.5 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm border border-gray-300 dark:border-gray-600 transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        清空表格
                      </button>
                      <button @click="addRow" class="px-3 py-1.5 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm border border-gray-300 dark:border-gray-600 transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        添加行
                      </button>
                      <button @click="deleteSelectedRows" :disabled="selectedRows.length === 0" :class="selectedRows.length === 0 ? 'opacity-50 cursor-not-allowed' : ''" class="px-3 py-1.5 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm border border-gray-300 dark:border-gray-600 transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        删除选中行
                      </button>
                      <!-- 高级数据处理按钮 -->
                      <button 
                        @click="showDataProcessingPanel = !showDataProcessingPanel" 
                        class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm border border-indigo-300 dark:border-indigo-700 transition-colors flex items-center"
                        :class="{'bg-indigo-100 dark:bg-indigo-900/50': showDataProcessingPanel}"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        高级数据处理
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5 transition-transform" :class="{'rotate-180': showDataProcessingPanel}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <div class="flex items-center">
                      <!-- 显示表格文件名 -->
                      <div v-if="excelFileName" class="text-sm text-gray-600 dark:text-gray-400 mr-4">
                        文件: <span class="font-medium text-indigo-600 dark:text-indigo-400">{{ excelFileName }}</span>
                      </div>
                      <div class="flex flex-wrap gap-2">
                        <!-- 固定表头和列选项 -->
                        <div class="flex items-center mr-2">
                          <label class="inline-flex items-center cursor-pointer mr-4">
                            <input type="checkbox" v-model="fixedHeader" class="sr-only peer">
                            <div class="relative w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">固定表头</span>
                          </label>
                          <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="fixedFirstColumn" class="sr-only peer">
                            <div class="relative w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">固定首列</span>
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            v-model="searchQuery"
                            placeholder="搜索..."
                            class="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                        <div class="flex flex-wrap gap-2">
                          <button @click="exportToExcel" class="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
                            </svg>
                            导出Excel
                          </button>
                          <button @click="exportToTxt" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            导出TXT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 高级数据处理面板 - 可折叠 -->
                  <div v-if="showDataProcessingPanel" class="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800/50 p-4 shadow-md mb-3 animate-slideDown">
                    <div class="flex items-center justify-between mb-3">
                      <h4 class="font-bold text-indigo-800 dark:text-indigo-300 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        数据批量处理工具
                      </h4>
                      <span class="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-800/50 text-indigo-600 dark:text-indigo-300 rounded text-xs">批量计算</span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <!-- 列选择下拉框 -->
                      <div>
                        <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">选择处理列</label>
                        <select 
                          v-model="selectedColumn" 
                          class="w-full px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="">请选择列</option>
                          <option v-for="header in tableHeaders" :key="header" :value="header">
                            {{ header }}
                          </option>
                        </select>
                      </div>
                      
                      <!-- 操作类型选择 -->
                      <div>
                        <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">操作类型</label>
                        <div class="flex gap-2">
                          <button 
                            @click="operationType = 'multiply'"
                            :class="operationType === 'multiply' ? 'bg-indigo-100 dark:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'"
                            class="flex-1 px-2 py-1.5 text-sm rounded-md border transition-colors"
                          >
                            乘法
                          </button>
                          <button 
                            @click="operationType = 'divide'"
                            :class="operationType === 'divide' ? 'bg-indigo-100 dark:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'"
                            class="flex-1 px-2 py-1.5 text-sm rounded-md border transition-colors"
                          >
                            除法
                          </button>
                        </div>
                      </div>
                      
                      <!-- 倍数输入框 -->
                      <div>
                        <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {{ operationType === 'multiply' ? '乘以倍数' : '除以倍数' }}
                        </label>
                        <input 
                          v-model.number="operationValue" 
                          type="number" 
                          min="0.01" 
                          step="0.01" 
                          placeholder="输入倍数" 
                          class="w-full px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      
                      <!-- 操作按钮 -->
                      <div class="flex flex-col justify-end">
                        <button 
                          @click="applyColumnOperation" 
                          :disabled="!canApplyOperation"
                          :class="canApplyOperation ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'" 
                          class="w-full px-2 py-2 rounded-md text-sm transition-colors"
                        >
                          确定应用
                        </button>
                        <div v-if="operationMessage" :class="operationError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'" class="text-xs text-center mt-1">
                          {{ operationMessage }}
                        </div>
                      </div>
                    </div>
                    
                    <div class="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                      <p>注意: 此功能将对选定列的数值进行四舍五入处理，非数值单元格将被跳过。</p>
                    </div>
                  </div>

                  <!-- 表格容器 -->
                  <div class="grid grid-cols-12">
                    <!-- 主表格容器，使用grid布局确保正确占据空间 -->
                    <div class="col-span-12">
                      <!-- 表格 -->
                      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div class="overflow-x-auto max-h-[600px]" :class="{ 'table-fixed-header': fixedHeader, 'table-fixed-column': fixedFirstColumn }">
                          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 relative">
                            <thead :class="[
                              'bg-gray-50 dark:bg-gray-900/50', 
                              fixedHeader ? 'sticky top-0 z-10' : ''
                            ]">
                              <tr>
                                <th scope="col" :class="[
                                  'w-12 px-3 py-3 text-left', 
                                  fixedFirstColumn ? 'sticky left-0 z-20 bg-gray-50 dark:bg-gray-900/50 shadow-sm' : ''
                                ]">
                                  <div class="flex items-center">
                                    <input 
                                      type="checkbox" 
                                      :checked="selectedRows.length === tableData.length" 
                                      @change="toggleAllRows"
                                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                  </div>
                                </th>
                                <th
                                  v-for="(header, index) in tableHeaders"
                                  :key="index"
                                  scope="col"
                                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  <div class="flex items-center">
                                    {{ header }}
                                    <button @click="sortTable(header)" class="ml-1.5 text-gray-400">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                      </svg>
                                    </button>
                                  </div>
                                </th>
                                <th scope="col" class="relative w-20 px-4 py-3">
                                  <span class="sr-only">Actions</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              <tr v-for="(row, rowIndex) in paginatedTableData" :key="rowIndex" :class="{'bg-indigo-50 dark:bg-indigo-900/20': selectedRows.includes(getOriginalIndex(row))}">
                                <td :class="[
                                  'px-3 py-3 whitespace-nowrap',
                                  fixedFirstColumn ? 'sticky left-0 z-10 bg-white dark:bg-gray-800 shadow-sm' : '',
                                  selectedRows.includes(getOriginalIndex(row)) ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                                ]">
                                  <div class="flex items-center">
                                    <input 
                                      type="checkbox" 
                                      :checked="selectedRows.includes(getOriginalIndex(row))" 
                                      @change="toggleRowSelection(getOriginalIndex(row))"
                                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                  </div>
                                </td>
                                <td 
                                  v-for="(header, colIndex) in tableHeaders" 
                                  :key="colIndex" 
                                  class="px-4 py-3 whitespace-nowrap"
                                >
                                  <div v-if="editingCell.row === getOriginalIndex(row) && editingCell.col === header" class="flex">
                                    <input 
                                      v-model="tableData[getOriginalIndex(row)][header]" 
                                      @blur="finishEditing"
                                      @keyup.enter="finishEditing"
                                      ref="cellInput"
                                      class="w-full px-2 py-1 border border-indigo-500 dark:border-indigo-400 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                    />
                                  </div>
                                  <div 
                                    v-else
                                    @click="startEditing(getOriginalIndex(row), header)"
                                    class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded"
                                  >
                                    {{ row[header] }}
                                  </div>
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-right text-sm">
                                  <button @click="deleteRow(getOriginalIndex(row))" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 分页控件 -->
                  <div class="flex flex-wrap items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 gap-2">
                    <div class="text-sm text-gray-700 dark:text-gray-300">
                      显示 <span class="font-medium">{{ filteredTableData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0 }}</span> 到 
                      <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredTableData.length) }}</span> 条，
                      共 <span class="font-medium">{{ filteredTableData.length }}</span> 条
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                      <div class="flex items-center">
                        <label class="mr-2 text-sm text-gray-700 dark:text-gray-300">每页显示:</label>
                        <select 
                          v-model="itemsPerPage" 
                          class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option :value="100">100条</option>
                          <option :value="500">500条</option>
                          <option :value="1000">1000条</option>
                        </select>
                      </div>
                      <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-700 dark:text-gray-300">{{ currentPage }} / {{ totalPages }}</span>
                        <button 
                          @click="currentPage = 1"
                          :disabled="currentPage === 1"
                          :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
                          class="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                        >
                          首页
                        </button>
                        <button 
                          @click="currentPage = Math.max(1, currentPage - 1)"
                          :disabled="currentPage === 1"
                          :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
                          class="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                        >
                          上一页
                        </button>
                        <button 
                          @click="currentPage = Math.min(totalPages, currentPage + 1)"
                          :disabled="currentPage === totalPages || totalPages === 0"
                          :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages || totalPages === 0}"
                          class="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                        >
                          下一页
                        </button>
                        <button 
                          @click="currentPage = totalPages"
                          :disabled="currentPage === totalPages || totalPages === 0"
                          :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages || totalPages === 0}"
                          class="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                        >
                          尾页
                        </button>
                      </div>
                      <div class="flex items-center">
                        <input 
                          v-model.number="jumpToPage" 
                          type="number" 
                          min="1" 
                          :max="totalPages"
                          class="w-16 px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          @keyup.enter="handleJumpToPage"
                        />
                        <button 
                          @click="handleJumpToPage"
                          class="ml-2 px-2 py-1 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 rounded-md text-sm"
                        >
                          跳转
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 游戏攻略 -->
              <div v-if="activeSection === 'guides'" class="space-y-6">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">游戏攻略</h3>
                
                <!-- 头部操作栏 -->
                <div class="flex justify-between items-center mb-6">
                  <!-- 职业标签选择 -->
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="(classTab, index) in classTabs" 
                      :key="index"
                      @click="activeClassTab = classTab.id"
                      class="px-3 py-1.5 rounded-full text-sm transition-colors"
                      :class="activeClassTab === classTab.id ? 
                        'bg-indigo-100 text-indigo-800 border border-indigo-300 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-700' : 
                        'bg-gray-100 text-gray-700 border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-700'"
                    >
                      {{ classTab.name }}
                    </button>
                  </div>
                  
                  <!-- 添加按钮 -->
                  <button 
                    @click="openGuideEditModal()"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    添加攻略
                  </button>
                </div>
                
                <!-- 攻略列表 -->
                <div class="space-y-4">
                  <div v-for="(guide, index) in filteredGuides" :key="index" 
                       class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5 hover:border-indigo-500/50 transition-all">
                    <h4 class="text-lg font-medium text-gray-800 dark:text-white mb-2">{{ guide.title }}</h4>
                    <p class="text-gray-600 dark:text-gray-400 mb-3">{{ guide.description }}</p>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <span class="px-2 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-md text-xs">{{ guide.class }}</span>
                        <span class="ml-2 text-gray-500 text-sm">{{ guide.date }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <button @click="openGuideEditModal(guide, index)" class="p-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button @click="deleteGuide(index)" class="p-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-800/40 text-red-600 dark:text-red-400 rounded-lg text-sm transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <button class="px-4 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm transition-colors">
                          查看详情
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 游戏MOD -->
              <div v-if="activeSection === 'mods'" class="space-y-6">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">游戏MOD</h3>
                
                <!-- 添加按钮 -->
                <div class="flex justify-end mb-4">
                  <button 
                    @click="openModEditModal()"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    添加MOD
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="(mod, index) in mods" :key="index" 
                       class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-indigo-500/50 transition-all">
                    <div class="p-5">
                      <h4 class="text-lg font-medium text-gray-800 dark:text-white mb-2">{{ mod.name }}</h4>
                      <div class="flex items-center mb-2 text-xs">
                        <span class="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-md mr-2">{{ mod.version }}</span>
                        <span class="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-md">{{ mod.type }}</span>
                      </div>
                      <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">{{ mod.description }}</p>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center text-gray-500 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>{{ mod.downloads }}次下载</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <button @click="openModEditModal(mod, index)" class="p-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button @click="deleteMod(index)" class="p-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-800/40 text-red-600 dark:text-red-400 rounded-lg text-sm transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          <button class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs transition-colors">
                            下载MOD
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 游戏工具 -->
              <div v-if="activeSection === 'tools'" class="space-y-6">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">游戏工具</h3>
                
                <!-- 添加按钮 -->
                <div class="flex justify-end mb-4">
                  <button 
                    @click="openToolEditModal()"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    添加工具
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="(tool, index) in tools" :key="index" 
                       class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5 hover:border-indigo-500/50 transition-all">
                    <h4 class="text-lg font-medium text-gray-800 dark:text-white mb-2">{{ tool.name }}</h4>
                    <p class="text-gray-600 dark:text-gray-400 mb-3 text-sm">{{ tool.description }}</p>
                    <div class="flex flex-wrap gap-2 mb-3">
                      <span v-for="(tag, tagIndex) in tool.tags" :key="tagIndex" 
                            class="px-2 py-0.5 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-md text-xs">
                        {{ tag }}
                      </span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-gray-500 text-sm">最后更新: {{ tool.lastUpdate }}</span>
                      <div class="flex items-center gap-2">
                        <button @click="openToolEditModal(tool, index)" class="p-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button @click="deleteTool(index)" class="p-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-800/40 text-red-600 dark:text-red-400 rounded-lg text-sm transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <button class="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm transition-colors">
                          获取工具
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 游戏开发 -->
              <div v-if="activeSection === 'development'" class="space-y-6">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">游戏开发</h3>
                
                <!-- 添加按钮 -->
                <div class="flex justify-end mb-4">
                  <button 
                    @click="openDevNoteEditModal()"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    添加开发笔记
                  </button>
                </div>
                
                <!-- 时间线 -->
                <div class="relative">
                  <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200 dark:bg-indigo-800"></div>
                  <div class="space-y-8">
                    <div v-for="(devNote, index) in devNotes" :key="index" class="relative pl-12">
                      <!-- 时间点圆圈 -->
                      <div class="absolute left-0 top-2 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <span class="text-indigo-700 dark:text-indigo-300 text-xs font-medium">{{ devNote.day }}</span>
                      </div>
                      <!-- 内容卡片 -->
                      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5">
                        <div class="flex justify-between items-start mb-3">
                          <h4 class="text-lg font-medium text-gray-800 dark:text-white">{{ devNote.title }}</h4>
                          <div class="flex items-center gap-2">
                            <span class="text-gray-500 text-sm">{{ devNote.date }}</span>
                            <button @click="openDevNoteEditModal(devNote, index)" class="p-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button @click="deleteDevNote(index)" class="p-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-800/40 text-red-600 dark:text-red-400 rounded-lg text-sm transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">{{ devNote.content }}</p>
                        <div class="flex flex-wrap gap-2">
                          <span v-for="(tag, tagIndex) in devNote.tags" :key="tagIndex" 
                                class="px-2 py-0.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-md text-xs">
                            {{ tag }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 游戏进度 -->
              <div v-if="activeSection === 'progress'" class="space-y-6">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">游戏进度</h3>
                
                <!-- 角色信息卡片 -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5">
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <h4 class="text-lg font-medium text-gray-800 dark:text-white">冰火法师</h4>
                        <span class="text-gray-500 text-sm">92级 | 法师 | 战网亚服</span>
                      </div>
                      <span class="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-md text-sm">主力角色</span>
                    </div>
                    
                    <div class="space-y-4 mb-4">
                      <div>
                        <div class="flex justify-between text-sm mb-1">
                          <span class="text-gray-600 dark:text-gray-400">经验进度</span>
                          <span class="text-indigo-600 dark:text-indigo-400">92→93级: 76%</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div class="bg-indigo-500 h-2 rounded-full" style="width: 76%"></div>
                        </div>
                      </div>
                      
                      <div class="grid grid-cols-2 gap-3">
                        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          <h5 class="text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-1">核心装备</h5>
                          <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li class="flex items-center">
                              <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                              <span>塔拉夏的外衣</span>
                            </li>
                            <li class="flex items-center">
                              <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                              <span>死灵法师的召唤</span>
                            </li>
                            <li class="flex items-center">
                              <span class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                              <span>巫师之刃</span>
                            </li>
                          </ul>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          <h5 class="text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-1">技能配点</h5>
                          <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li class="flex items-center">
                              <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              <span>暴风雪: 20点</span>
                            </li>
                            <li class="flex items-center">
                              <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              <span>火墙: 20点</span>
                            </li>
                            <li class="flex items-center">
                              <span class="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                              <span>大师级能量盾: 15点</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex justify-between">
                      <span class="text-xs text-gray-500">最后游戏: 3天前</span>
                      <button class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs transition-colors">
                        查看详情
                      </button>
                    </div>
                  </div>
                  
                  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5">
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <h4 class="text-lg font-medium text-gray-800 dark:text-white">圣骑审判</h4>
                        <span class="text-gray-500 text-sm">85级 | 圣骑士 | 战网亚服</span>
                      </div>
                      <span class="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-md text-sm">副角色</span>
                    </div>
                    
                    <div class="space-y-4 mb-4">
                      <div>
                        <div class="flex justify-between text-sm mb-1">
                          <span class="text-gray-600 dark:text-gray-400">经验进度</span>
                          <span class="text-indigo-600 dark:text-indigo-400">85→86级: 42%</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div class="bg-indigo-500 h-2 rounded-full" style="width: 42%"></div>
                        </div>
                      </div>
                      
                      <div class="grid grid-cols-2 gap-3">
                        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          <h5 class="text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-1">核心装备</h5>
                          <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li class="flex items-center">
                              <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                              <span>恒金之拳</span>
                            </li>
                            <li class="flex items-center">
                              <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              <span>神恩之锤</span>
                            </li>
                            <li class="flex items-center">
                              <span class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                              <span>光明之眼</span>
                            </li>
                          </ul>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                          <h5 class="text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-1">技能配点</h5>
                          <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <li class="flex items-center">
                              <span class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                              <span>神圣冲击: 20点</span>
                            </li>
                            <li class="flex items-center">
                              <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              <span>祝福之锤: 15点</span>
                            </li>
                            <li class="flex items-center">
                              <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                              <span>审判光环: 20点</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex justify-between">
                      <span class="text-xs text-gray-500">最后游戏: 1周前</span>
                      <button class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs transition-colors">
                        查看详情
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- 游戏成就进度 -->
                <div class="mt-6">
                  <h4 class="text-lg font-medium text-gray-800 dark:text-white mb-4">游戏成就进度</h4>
                  <div class="space-y-4">
                    <div v-for="(achievement, index) in achievements" :key="index">
                      <div class="flex justify-between text-sm mb-1">
                        <span class="text-gray-600 dark:text-gray-400">{{ achievement.name }}</span>
                        <span class="text-indigo-600 dark:text-indigo-400">{{ achievement.value }}%</span>
                      </div>
                      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div class="bg-indigo-500 h-2 rounded-full" :style="`width: ${achievement.value}%`"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- MOD随笔 -->
              <div v-if="activeSection === 'modNotes'" class="space-y-6">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">MOD随笔</h3>
                
                <!-- MOD卡片按钮区域 -->
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div v-for="(card, index) in modCards" :key="index" 
                       @click="openModModal(card)"
                       class="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/30 border border-indigo-200 dark:border-indigo-800/50 rounded-xl shadow-md hover:shadow-lg transition-all p-4 cursor-pointer transform hover:-translate-y-1 hover:border-indigo-400 dark:hover:border-indigo-600">
                    <div class="flex flex-col items-center justify-center py-3 text-center space-y-2">
                      <div class="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                        <span v-html="card.icon" class="text-indigo-600 dark:text-indigo-300"></span>
                      </div>
                      <h4 class="font-medium text-gray-800 dark:text-gray-200">{{ card.title }}</h4>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ card.description }}</p>
                      <span class="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 rounded-full">
                        {{ card.count }} 条笔记
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 添加Modal弹窗 -->
    <Teleport to="body">
      <!-- 已有的MOD详情弹窗 -->
      <div v-if="showModModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- 背景遮罩 -->
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" @click="showModModal = false"></div>
          
          <!-- Modal内容 -->
          <div class="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <div class="absolute top-0 right-0 pt-4 pr-4">
              <button @click="showModModal = false" type="button" class="bg-white dark:bg-gray-800 rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div v-if="selectedModCard" class="px-4 pt-5 pb-4 sm:p-6">
              <!-- 精美标题区 -->
              <div class="mb-6 text-center">
                <div class="w-16 h-16 mx-auto mb-3 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                  <span v-html="selectedModCard.icon" class="text-indigo-600 dark:text-indigo-300 text-2xl"></span>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 dark:text-white">{{ selectedModCard.title }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ selectedModCard.description }}</p>
              </div>
              
              <!-- 添加笔记按钮 -->
              <div class="flex justify-end mb-4">
                <button 
                  @click="openModNoteEditModal()"
                  class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  添加笔记
                </button>
              </div>
              
              <!-- 卡片内容 -->
              <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-2" style="scrollbar-width: thin;">
                <div v-for="(note, idx) in selectedModCard.notes" :key="idx" 
                     class="bg-gradient-to-r from-white to-indigo-50/50 dark:from-gray-800 dark:to-indigo-900/20 rounded-lg p-4 border-l-4"
                     :class="[`border-${note.color}-400 dark:border-${note.color}-600`]">
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="font-medium text-gray-800 dark:text-gray-200">{{ note.title }}</h4>
                    <div class="flex items-center gap-2">
                      <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">{{ note.date }}</span>
                      <button @click="openModNoteEditModal(note, idx)" class="p-1 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-600 dark:text-indigo-400 rounded-full text-sm transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button @click="deleteModNote(idx)" class="p-1 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-800/40 text-red-600 dark:text-red-400 rounded-full text-sm transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ note.content }}</p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="(tag, tagIdx) in note.tags" :key="tagIdx" 
                          class="text-xs px-2 py-0.5 rounded-full"
                          :class="[`bg-${note.color}-100 text-${note.color}-700 dark:bg-${note.color}-900/30 dark:text-${note.color}-300`]">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏攻略编辑弹窗 -->
      <div v-if="showGuideEditModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- 背景遮罩 -->
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" @click="closeGuideEditModal"></div>
          
          <!-- Modal内容 -->
          <div class="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="absolute top-0 right-0 pt-4 pr-4">
              <button @click="closeGuideEditModal" type="button" class="bg-white dark:bg-gray-800 rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="px-4 pt-5 pb-4 sm:p-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {{ editingGuideIndex === -1 ? '添加游戏攻略' : '编辑游戏攻略' }}
              </h3>
              
              <form @submit.prevent="saveGuide" class="space-y-4">
                <div>
                  <label for="guide-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">攻略标题</label>
                  <input 
                    id="guide-title"
                    v-model="editingGuide.title" 
                    type="text" 
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label for="guide-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">攻略描述</label>
                  <textarea 
                    id="guide-description"
                    v-model="editingGuide.description" 
                    rows="3"
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label for="guide-class" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">职业</label>
                  <select 
                    id="guide-class"
                    v-model="editingGuide.class" 
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  >
                    <option value="">请选择职业</option>
                    <option value="野蛮人">野蛮人</option>
                    <option value="圣骑士">圣骑士</option>
                    <option value="法师">法师</option>
                    <option value="死灵法师">死灵法师</option>
                    <option value="亚马逊">亚马逊</option>
                    <option value="刺客">刺客</option>
                    <option value="德鲁伊">德鲁伊</option>
                  </select>
                </div>
                
                <div>
                  <label for="guide-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">日期</label>
                  <input 
                    id="guide-date"
                    v-model="editingGuide.date" 
                    type="date" 
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                  <button 
                    type="button"
                    @click="closeGuideEditModal"
                    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    type="submit"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
                  >
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏MOD编辑弹窗 -->
      <div v-if="showModEditModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- 背景遮罩 -->
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" @click="closeModEditModal"></div>
          
          <!-- Modal内容 -->
          <div class="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="absolute top-0 right-0 pt-4 pr-4">
              <button @click="closeModEditModal" type="button" class="bg-white dark:bg-gray-800 rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="px-4 pt-5 pb-4 sm:p-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {{ editingModIndex === -1 ? '添加游戏MOD' : '编辑游戏MOD' }}
              </h3>
              
              <form @submit.prevent="saveMod" class="space-y-4">
                <div>
                  <label for="mod-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">MOD名称</label>
                  <input 
                    id="mod-name"
                    v-model="editingMod.name" 
                    type="text" 
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
                
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label for="mod-version" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">版本</label>
                    <input 
                      id="mod-version"
                      v-model="editingMod.version" 
                      type="text" 
                      placeholder="如: v1.0"
                      class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="mod-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">类型</label>
                    <select 
                      id="mod-type"
                      v-model="editingMod.type" 
                      class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      required
                    >
                      <option value="">请选择类型</option>
                      <option value="大型改版">大型改版</option>
                      <option value="功能增强">功能增强</option>
                      <option value="掉落调整">掉落调整</option>
                      <option value="画质增强">画质增强</option>
                      <option value="全面改版">全面改版</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label for="mod-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">描述</label>
                  <textarea 
                    id="mod-description"
                    v-model="editingMod.description" 
                    rows="3"
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label for="mod-downloads" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">下载次数</label>
                  <input 
                    id="mod-downloads"
                    v-model="editingMod.downloads" 
                    type="text" 
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                  <button 
                    type="button"
                    @click="closeModEditModal"
                    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    type="submit"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
                  >
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏工具编辑弹窗 -->
      <div v-if="showToolEditModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- 背景遮罩 -->
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" @click="closeToolEditModal"></div>
          
          <!-- Modal内容 -->
          <div class="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="absolute top-0 right-0 pt-4 pr-4">
              <button @click="closeToolEditModal" type="button" class="bg-white dark:bg-gray-800 rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="px-4 pt-5 pb-4 sm:p-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {{ editingToolIndex === -1 ? '添加游戏工具' : '编辑游戏工具' }}
              </h3>
              
              <form @submit.prevent="saveTool" class="space-y-4">
                <div>
                  <label for="tool-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">工具名称</label>
                  <input 
                    id="tool-name"
                    v-model="editingTool.name" 
                    type="text" 
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label for="tool-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">描述</label>
                  <textarea 
                    id="tool-description"
                    v-model="editingTool.description" 
                    rows="3"
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label for="tool-tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标签 (用逗号分隔)</label>
                  <input 
                    id="tool-tags"
                    v-model="editingToolTags" 
                    type="text" 
                    placeholder="例如: 离线工具,角色编辑,免费"
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label for="tool-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">最后更新日期</label>
                  <input 
                    id="tool-date"
                    v-model="editingTool.lastUpdate" 
                    type="date" 
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                  <button 
                    type="button"
                    @click="closeToolEditModal"
                    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    type="submit"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
                  >
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏开发笔记编辑弹窗 -->
      <div v-if="showDevNoteEditModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- 背景遮罩 -->
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" @click="closeDevNoteEditModal"></div>
          
          <!-- Modal内容 -->
          <div class="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="absolute top-0 right-0 pt-4 pr-4">
              <button @click="closeDevNoteEditModal" type="button" class="bg-white dark:bg-gray-800 rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="px-4 pt-5 pb-4 sm:p-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {{ editingDevNoteIndex === -1 ? '添加开发笔记' : '编辑开发笔记' }}
              </h3>
              
              <form @submit.prevent="saveDevNote" class="space-y-4">
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label for="dev-note-day" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">天数</label>
                    <input 
                      id="dev-note-day"
                      v-model="editingDevNote.day" 
                      type="text" 
                      placeholder="例如: 01"
                      class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="dev-note-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">日期</label>
                    <input 
                      id="dev-note-date"
                      v-model="editingDevNote.date" 
                      type="date" 
                      class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label for="dev-note-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标题</label>
                  <input 
                    id="dev-note-title"
                    v-model="editingDevNote.title" 
                    type="text" 
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label for="dev-note-content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">内容</label>
                  <textarea 
                    id="dev-note-content"
                    v-model="editingDevNote.content" 
                    rows="3"
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label for="dev-note-tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标签 (用逗号分隔)</label>
                  <input 
                    id="dev-note-tags"
                    v-model="editingDevNoteTags" 
                    type="text" 
                    placeholder="例如: 项目启动,计划阶段"
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                  <button 
                    type="button"
                    @click="closeDevNoteEditModal"
                    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    type="submit"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
                  >
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- MOD笔记编辑弹窗 -->
      <div v-if="showModNoteEditModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- 背景遮罩 -->
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" @click="closeModNoteEditModal"></div>
          
          <!-- Modal内容 -->
          <div class="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="absolute top-0 right-0 pt-4 pr-4">
              <button @click="closeModNoteEditModal" type="button" class="bg-white dark:bg-gray-800 rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="px-4 pt-5 pb-4 sm:p-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {{ editingModNoteIndex === -1 ? '添加MOD笔记' : '编辑MOD笔记' }}
              </h3>
              
              <form @submit.prevent="saveModNote" class="space-y-4">
                <div>
                  <label for="mod-note-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标题</label>
                  <input 
                    id="mod-note-title"
                    v-model="editingModNote.title" 
                    type="text" 
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label for="mod-note-content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">内容</label>
                  <textarea 
                    id="mod-note-content"
                    v-model="editingModNote.content" 
                    rows="3"
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label for="mod-note-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">日期</label>
                  <input 
                    id="mod-note-date"
                    v-model="editingModNote.date" 
                    type="date" 
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label for="mod-note-tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标签 (用逗号分隔)</label>
                  <input 
                    id="mod-note-tags"
                    v-model="editingModNoteTags" 
                    type="text" 
                    placeholder="例如: 亚马逊,伤害提升,弹道优化"
                    class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">颜色</label>
                  <div class="grid grid-cols-4 gap-2">
                    <button 
                      type="button"
                      @click="editingModNote.color = 'blue'"
                      class="h-8 w-full rounded-md transition-all"
                      :class="editingModNote.color === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''"
                      style="background-color: rgb(59, 130, 246);"
                    ></button>
                    <button 
                      type="button"
                      @click="editingModNote.color = 'green'"
                      class="h-8 w-full rounded-md transition-all"
                      :class="editingModNote.color === 'green' ? 'ring-2 ring-offset-2 ring-green-500' : ''"
                      style="background-color: rgb(34, 197, 94);"
                    ></button>
                    <button 
                      type="button"
                      @click="editingModNote.color = 'red'"
                      class="h-8 w-full rounded-md transition-all"
                      :class="editingModNote.color === 'red' ? 'ring-2 ring-offset-2 ring-red-500' : ''"
                      style="background-color: rgb(239, 68, 68);"
                    ></button>
                    <button 
                      type="button"
                      @click="editingModNote.color = 'purple'"
                      class="h-8 w-full rounded-md transition-all"
                      :class="editingModNote.color === 'purple' ? 'ring-2 ring-offset-2 ring-purple-500' : ''"
                      style="background-color: rgb(168, 85, 247);"
                    ></button>
                    <button 
                      type="button"
                      @click="editingModNote.color = 'yellow'"
                      class="h-8 w-full rounded-md transition-all"
                      :class="editingModNote.color === 'yellow' ? 'ring-2 ring-offset-2 ring-yellow-500' : ''"
                      style="background-color: rgb(234, 179, 8);"
                    ></button>
                    <button 
                      type="button"
                      @click="editingModNote.color = 'indigo'"
                      class="h-8 w-full rounded-md transition-all"
                      :class="editingModNote.color === 'indigo' ? 'ring-2 ring-offset-2 ring-indigo-500' : ''"
                      style="background-color: rgb(99, 102, 241);"
                    ></button>
                    <button 
                      type="button"
                      @click="editingModNote.color = 'pink'"
                      class="h-8 w-full rounded-md transition-all"
                      :class="editingModNote.color === 'pink' ? 'ring-2 ring-offset-2 ring-pink-500' : ''"
                      style="background-color: rgb(236, 72, 153);"
                    ></button>
                    <button 
                      type="button"
                      @click="editingModNote.color = 'orange'"
                      class="h-8 w-full rounded-md transition-all"
                      :class="editingModNote.color === 'orange' ? 'ring-2 ring-offset-2 ring-orange-500' : ''"
                      style="background-color: rgb(249, 115, 22);"
                    ></button>
                  </div>
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                  <button 
                    type="button"
                    @click="closeModNoteEditModal"
                    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    type="submit"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
                  >
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import AuroraBackground from '@/components/AuroraBackground.vue'

// 导航项目
const navItems = [
  { id: 'news', name: '游戏资讯' },
  { id: 'table', name: '表格预览' },
  { id: 'guides', name: '游戏攻略' },
  { id: 'mods', name: '游戏MOD' },
  { id: 'tools', name: '游戏工具' },
  { id: 'development', name: '游戏开发' },
  { id: 'progress', name: '游戏进度' },
  { id: 'modNotes', name: 'MOD随笔' }
]

const activeSection = ref('news')

// 表格数据相关
const tableData = ref([])
const tableHeaders = ref([])
const selectedRows = ref([])
const editingCell = ref({ row: -1, col: '' })
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(100)
const sortConfig = ref({ key: '', direction: 'asc' })
const jumpToPage = ref(1)
const fixedHeader = ref(false)
const fixedFirstColumn = ref(false)
const excelFileName = ref('') // 存储上传的文件名

// 隐藏功能相关
const selectedColumn = ref('')
const operationType = ref('multiply') // 'multiply' or 'divide'
const operationValue = ref(1)
const operationMessage = ref('')
const operationError = ref(false)
const showDataProcessingPanel = ref(false) // 控制面板显示状态

// 检查是否可以应用操作
const canApplyOperation = computed(() => {
  return selectedColumn.value && operationValue.value > 0
})

// 表格功能 - 导入Excel
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // 保存文件名
  excelFileName.value = file.name
  console.log('上传文件名:', file.name);
  
  try {
    // 导入Excel处理库
    const { read, utils } = await import('xlsx')
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      // 使用更全面的解析选项
      const workbook = read(data, { 
        type: 'array',
        cellDates: true, // 正确解析日期
        cellNF: true,    // 保留数字格式
        cellText: false  // 使用转换后的值而非文本
      })
      
      // 获取第一个工作表
      const firstSheet = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheet]
      
      // 使用头部行作为列名，确保解析所有列
      const jsonData = utils.sheet_to_json(worksheet, {
        header: 1, // 使用第一行作为表头
        defval: '', // 空单元格的默认值
        raw: false  // 转换值（格式化日期等）
      })
      
      if (jsonData.length > 1) { // 至少有表头和一行数据
        // 提取表头（第一行）
        const headers = jsonData[0].map(header => header.toString().trim());
        
        // 构建数据对象（从第二行开始）
        const formattedData = jsonData.slice(1).map(row => {
          const rowData = {};
          // 确保每行数据都具有所有列（即使单元格为空）
          headers.forEach((header, index) => {
            rowData[header] = index < row.length ? row[index] : '';
          });
          return rowData;
        });
        
        // 更新表格数据和表头
        tableData.value = formattedData;
        tableHeaders.value = headers;
        
                  // 导入成功，清除之前的消息
        operationMessage.value = '';
        operationError.value = false;
      } else {
        alert('导入的Excel文件没有足够的数据');
      }
    };
    
    reader.readAsArrayBuffer(file);
  } catch (error) {
    console.error('导入Excel失败:', error);
    alert('导入Excel失败，请确保文件格式正确');
  }
};

// 应用列操作（乘法或除法）
const applyColumnOperation = () => {
  if (!selectedColumn.value || operationValue.value <= 0) {
    operationMessage.value = '请选择列并输入有效的倍数值';
    operationError.value = true;
    return;
  }
  
  const column = selectedColumn.value;
  const value = operationValue.value;
  let successCount = 0;
  let errorCount = 0;
  
  // 处理每一行数据
  tableData.value.forEach(row => {
    // 获取当前单元格的值
    const cellValue = row[column];
    
    // 检查是否为有效数字
    const numValue = parseFloat(cellValue);
    if (!isNaN(numValue)) {
      // 执行操作并四舍五入
      let result;
      if (operationType.value === 'multiply') {
        result = Math.round(numValue * value); // 四舍五入到整数
      } else { // divide
        result = Math.round(numValue / value); // 四舍五入到整数
      }
      // 更新表格数据
      row[column] = result;
      successCount++;
    } else if (cellValue !== '') {
      // 非空但不是数字
      errorCount++;
    }
  });
  
  // 设置操作结果消息
  if (errorCount > 0) {
    operationMessage.value = `已处理 ${successCount} 个数值，${errorCount} 个非数值单元格被跳过`;
    operationError.value = true;
  } else {
    operationMessage.value = `成功处理了 ${successCount} 个数值`;
    operationError.value = false;
  }
};

// 清空表格时重置文件名和隐藏功能状态
const clearTable = () => {
  if (confirm('确定要清空表格数据吗？此操作不可撤销。')) {
    tableData.value = []
    tableHeaders.value = []
    selectedRows.value = []
    excelFileName.value = ''
    selectedColumn.value = ''
    operationMessage.value = ''
    operationError.value = false
  }
}

// 表格功能 - 添加行
const addRow = () => {
  const newRow = {}
  tableHeaders.value.forEach(header => {
    newRow[header] = ''
  })
  tableData.value.push(newRow)
}

// 表格功能 - 删除行
const deleteRow = (rowIndex) => {
  tableData.value = tableData.value.filter((_, index) => index !== rowIndex)
  selectedRows.value = selectedRows.value
    .filter(index => index !== rowIndex)
    .map(index => index > rowIndex ? index - 1 : index)
}

// 表格功能 - 单元格编辑
const startEditing = (rowIndex, colName) => {
  editingCell.value = { row: rowIndex, col: colName }
  nextTick(() => {
    if (document.activeElement.tagName !== 'INPUT') {
      const input = document.querySelector('input[ref="cellInput"]')
      if (input) input.focus()
    }
  })
}

const finishEditing = () => {
  editingCell.value = { row: -1, col: '' }
}

// 表格功能 - 行选择
const toggleRowSelection = (rowIndex) => {
  const index = selectedRows.value.indexOf(rowIndex)
  if (index === -1) {
    selectedRows.value.push(rowIndex)
  } else {
    selectedRows.value.splice(index, 1)
  }
}

const toggleAllRows = (event) => {
  if (event.target.checked) {
    selectedRows.value = Array.from({ length: tableData.value.length }, (_, i) => i)
  } else {
    selectedRows.value = []
  }
}

const deleteSelectedRows = () => {
  if (selectedRows.value.length === 0) return
  
  if (confirm(`确定要删除选中的 ${selectedRows.value.length} 行数据吗？`)) {
    // 从高到低排序，防止删除时索引变化
    const sortedIndices = [...selectedRows.value].sort((a, b) => b - a)
    sortedIndices.forEach(index => {
      tableData.value.splice(index, 1)
    })
    selectedRows.value = []
  }
}

// 表格功能 - 排序
const sortTable = (column) => {
  if (sortConfig.value.key === column) {
    // 切换排序方向
    sortConfig.value.direction = sortConfig.value.direction === 'asc' ? 'desc' : 'asc'
  } else {
    // 新列排序
    sortConfig.value.key = column
    sortConfig.value.direction = 'asc'
  }
}

// 表格功能 - 分页控制
const handleJumpToPage = () => {
  if (jumpToPage.value >= 1 && jumpToPage.value <= totalPages.value) {
    currentPage.value = jumpToPage.value
  } else {
    jumpToPage.value = currentPage.value
  }
}

// 获取行在原始数据中的索引
const getOriginalIndex = (row) => {
  return tableData.value.findIndex(item => item === row)
}

// 监听条目变化，重置到第一页
watch(itemsPerPage, () => {
  currentPage.value = 1
})

// 监听搜索查询变化，重置到第一页
watch(searchQuery, () => {
  currentPage.value = 1
})

// 表格功能 - 搜索和过滤
const filteredTableData = computed(() => {
  let result = [...tableData.value]
  
  // 应用搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(row => {
      return Object.values(row).some(value => 
        String(value).toLowerCase().includes(query)
      )
    })
  }
  
  // 应用排序
  if (sortConfig.value.key) {
    result.sort((a, b) => {
      const aVal = a[sortConfig.value.key]
      const bVal = b[sortConfig.value.key]
      
      if (aVal < bVal) return sortConfig.value.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.value.direction === 'asc' ? 1 : -1
      return 0
    })
  }
  
  return result
})

// 分页计算
const totalPages = computed(() => {
  return Math.ceil(filteredTableData.value.length / itemsPerPage.value) || 1
})

const paginatedTableData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredTableData.value.slice(start, end)
})

// 职业标签
const classTabs = [
  { id: 'all', name: '全部' },
  { id: 'barbarian', name: '野蛮人' },
  { id: 'paladin', name: '圣骑士' },
  { id: 'sorceress', name: '法师' },
  { id: 'necromancer', name: '死灵法师' },
  { id: 'amazon', name: '亚马逊' },
  { id: 'assassin', name: '刺客' },
  { id: 'druid', name: '德鲁伊' }
]

const activeClassTab = ref('all')

// 游戏资讯数据
const gameNews = [
  { 
    title: '第十赛季"重铸混沌"版本前瞻', 
    summary: '第十赛季将于6月10日开启，本赛季将带来恐怖区域重铸机制，现有暗金装备改动和全新符文之语。', 
    date: '2024-05-28',
    content: '详细内容...' 
  },
  { 
    title: 'PTR 2.7版本测试公告', 
    summary: 'PTR测试服将于下周开启，测试全新的2.7版本内容，包括职业平衡性调整和游戏机制优化。', 
    date: '2024-05-20',
    content: '详细内容...' 
  },
  { 
    title: '暗黑2重制版周年庆活动', 
    summary: '为庆祝暗黑2重制版发布2周年，游戏将开启特别活动，玩家可获得独特的纪念奖励。', 
    date: '2024-05-15',
    content: '详细内容...' 
  },
  { 
    title: '战网服务器维护公告', 
    summary: '为确保游戏体验，战网服务器将于6月1日进行例行维护，预计停机4小时。', 
    date: '2024-05-12',
    content: '详细内容...' 
  },
  { 
    title: '暗黑2重制版移动端适配计划', 
    summary: '暴雪宣布正在考虑将暗黑2重制版适配到移动平台，以满足玩家随时随地游玩的需求。', 
    date: '2024-05-08',
    content: '详细内容...' 
  }
]

// 游戏攻略数据
const guides = [
  { 
    title: '旋风野蛮人打法详解', 
    description: '最流行的旋风野蛮人BD配装、技能加点及地图刷图路线全攻略，轻松通关地狱难度。', 
    class: '野蛮人',
    date: '2024-05-22' 
  },
  { 
    title: '圣骑士锤子流BD攻略', 
    description: '详细介绍锤子圣骑士的装备选择、技能点分配与各区域的战术打法。', 
    class: '圣骑士',
    date: '2024-05-18' 
  },
  { 
    title: '暴风雪/冰结合法师打法', 
    description: '冰系法师的最佳技能组合与装备推荐，以及如何应对冰免疫怪物的策略。', 
    class: '法师',
    date: '2024-05-15' 
  },
  { 
    title: '骨法死灵法师攻略', 
    description: '骨矛骨法的完整游戏指南，包括最优加点、装备搭配和安全刷图技巧。', 
    class: '死灵法师',
    date: '2024-05-12' 
  },
  { 
    title: '多重箭亚马逊打法详解', 
    description: '基于全新装备改动的多重箭亚马逊最新玩法，针对不同地图的战术调整。', 
    class: '亚马逊',
    date: '2024-05-08' 
  },
  { 
    title: '陷阱刺客速刷指南', 
    description: '陷阱刺客从新手到高手的完整培养路线，快速提升战力的关键点。', 
    class: '刺客',
    date: '2024-05-05' 
  },
  { 
    title: '元素德鲁伊通关指南', 
    description: '风火德鲁伊的技能配置、装备选择与高效通关技巧，应对各种地图挑战。', 
    class: '德鲁伊',
    date: '2024-05-01' 
  }
]

// 根据选择的职业标签过滤攻略
const filteredGuides = computed(() => {
  if (activeClassTab.value === 'all') {
    return guides
  } else {
    const classMap = {
      'barbarian': '野蛮人',
      'paladin': '圣骑士',
      'sorceress': '法师',
      'necromancer': '死灵法师',
      'amazon': '亚马逊',
      'assassin': '刺客',
      'druid': '德鲁伊'
    }
    return guides.filter(guide => guide.class === classMap[activeClassTab.value])
  }
})

// MOD数据
const mods = [
  {
    name: 'Project Diablo 2',
    version: 'v1.10',
    type: '大型改版',
    description: '全面改版MOD，重新平衡所有职业与装备，增加新的终游内容和挑战。',
    downloads: '62,543'
  },
  {
    name: 'PlugY',
    version: 'v14.03',
    type: '功能增强',
    description: '无限大保管箱、共享仓库、重置技能点等实用功能，单机玩家必备。',
    downloads: '128,967'
  },
  {
    name: 'Eastern Sun',
    version: 'v5.2',
    type: '大型改版',
    description: '全新装备、符文词组和隐藏区域，丰富的游戏内容与挑战。',
    downloads: '43,215'
  },
  {
    name: 'Perfect Drop',
    version: 'v2.7',
    type: '掉落调整',
    description: '优化装备掉落率，减少刷图时间，提升游戏效率，适合时间有限的玩家。',
    downloads: '85,432'
  },
  {
    name: 'MedianXL',
    version: 'v2023',
    type: '全面改版',
    description: '几乎重做整个游戏系统，拥有全新技能树、物品系统和挑战区域。',
    downloads: '156,789'
  },
  {
    name: 'HD Textures',
    version: 'v3.0',
    type: '画质增强',
    description: '高清纹理替换包，在保留原版风格的基础上提升游戏视觉效果。',
    downloads: '94,521'
  }
]

// 工具数据
const tools = [
  {
    name: 'Hero Editor',
    description: '功能强大的角色编辑器，可编辑装备、属性、技能点等，方便测试不同Build。',
    tags: ['角色编辑', '离线工具', '开源'],
    lastUpdate: '2024-04-15'
  },
  {
    name: 'D2RStash',
    description: '重制版专用保管箱管理工具，可整理物品、搜索特定装备和符文。',
    tags: ['物品管理', '在线支持', '免费'],
    lastUpdate: '2024-05-02'
  },
  {
    name: 'RunewordHelper',
    description: '符文之语查询工具，包含所有符文组合与效果，并可按需过滤搜索。',
    tags: ['符文工具', '查询', '中文支持'],
    lastUpdate: '2024-03-20'
  },
  {
    name: 'MapHack',
    description: '地图辅助工具，显示完整地图与怪物位置，提高游戏效率。',
    tags: ['地图工具', '怪物显示', '插件'],
    lastUpdate: '2024-04-28'
  },
  {
    name: 'LootFilter',
    description: '自定义物品过滤器，可根据需求显示或隐藏特定物品，减少刷图干扰。',
    tags: ['物品过滤', '自定义', '插件'],
    lastUpdate: '2024-05-10'
  },
  {
    name: 'BuildPlanner',
    description: '角色Build规划工具，可模拟不同技能点与装备配置的效果。',
    tags: ['Build规划', '在线工具', '免费'],
    lastUpdate: '2024-04-05'
  }
]

// 开发日记
const devNotes = [
  {
    day: '01',
    date: '2024-05-26',
    title: '项目启动：暗黑MOD开发',
    content: '今天开始我的暗黑2MOD开发项目，计划制作一个增强游戏平衡性的小型MOD，主要是调整一些被低估职业的技能效果。',
    tags: ['项目启动', '计划阶段']
  },
  {
    day: '12',
    date: '2024-05-15',
    title: '职业技能调整',
    content: '完成了对亚马逊和刺客职业的技能调整，提升了一些低使用率技能的效果，如亚马逊的毒箭和刺客的凤凰攻击。',
    tags: ['技能调整', '亚马逊', '刺客']
  },
  {
    day: '25',
    date: '2024-05-02',
    title: '装备平衡性修改',
    content: '调整了部分套装装备的属性，增加了一些新的词缀组合，希望能为玩家提供更多样的Build选择。',
    tags: ['装备调整', '词缀系统']
  },
  {
    day: '38',
    date: '2024-04-19',
    title: 'MOD测试阶段',
    content: '邀请了几位资深玩家进行封闭测试，收集反馈并进行调整。目前反馈普遍积极，但仍有一些平衡性问题需要解决。',
    tags: ['测试反馈', '平衡调整']
  },
  {
    day: '50',
    date: '2024-04-07',
    title: '新增特殊事件',
    content: '在MOD中加入了新的特殊事件，在特定区域有小概率触发特殊怪物群，掉落专属物品。',
    tags: ['特殊事件', '内容扩展']
  }
]

// 游戏成就进度
const achievements = [
  { name: '主线剧情', value: 100 },
  { name: '全职业通关', value: 75 },
  { name: '隐藏任务', value: 90 },
  { name: '装备收集', value: 62 },
  { name: '符文收集', value: 45 },
  { name: '稀有怪物猎杀', value: 78 }
]

// MOD随笔数据
const modCards = [
  {
    title: '角色技能',
    description: '各职业技能修改记录',
    count: 6,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>',
    notes: [
      {
        title: '亚马逊多重箭增强',
        content: '多重箭伤害提升10%，弹道速度提升10点，大幅提升了远程亚马逊的清图效率。',
        date: '2024-05-22',
        tags: ['亚马逊', '伤害提升', '弹道优化'],
        color: 'blue'
      },
      {
        title: '野蛮人狂战士技能改进',
        content: '狂战士技能持续时间延长30%，同时每级增加2%伤害减免，使肉搏野蛮人更具生存能力。',
        date: '2024-05-18',
        tags: ['野蛮人', '持续时间', '伤害减免'],
        color: 'red'
      },
      {
        title: '火系法师技能平衡',
        content: '流星术冷却时间减少1秒，火墙持续伤害提升15%，使火系法师在后期也具有竞争力。',
        date: '2024-05-15',
        tags: ['法师', '冷却时间', '持续伤害'],
        color: 'orange'
      },
      {
        title: '死灵法师骨矛强化',
        content: '骨矛魔法消耗减少15%，命中率提高8%，为纯骨系死灵法师提供更好的输出环境。',
        date: '2024-05-12',
        tags: ['死灵法师', '魔法消耗', '命中率'],
        color: 'green'
      },
      {
        title: '德鲁伊变形技能增强',
        content: '狼人和熊人形态物理伤害提升12%，并增加10%的生命回复速度，增强德鲁伊近战能力。',
        date: '2024-05-08',
        tags: ['德鲁伊', '变形技能', '生命回复'],
        color: 'purple'
      },
      {
        title: '刺客陷阱连锁效果',
        content: '死亡闪电现在可以连锁击中最多5个目标，显著提高了刺客的群体清怪能力。',
        date: '2024-05-05',
        tags: ['刺客', '连锁效果', '群体伤害'],
        color: 'indigo'
      }
    ]
  },
  {
    title: '魔方公式',
    description: '自定义魔方合成配方',
    count: 4,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>',
    notes: [
      {
        title: '符文升级配方优化',
        content: '两个相同符文加一颗完美宝石现可100%升级为更高阶符文，不再需要额外材料。',
        date: '2024-05-20',
        tags: ['符文升级', '成功率', '材料优化'],
        color: 'yellow'
      },
      {
        title: '装备品质转换',
        content: '新增配方：任意暗金装备 + 完美骷髅 + Zod符文可转换为同类型随机暗金装备。',
        date: '2024-05-16',
        tags: ['暗金装备', '随机转换', '稀有配方'],
        color: 'amber'
      },
      {
        title: '宝石合成改进',
        content: '3颗相同品质宝石可以合成更高品质宝石，无需额外材料，大幅简化宝石升级过程。',
        date: '2024-05-11',
        tags: ['宝石合成', '简化流程', '资源节约'],
        color: 'emerald'
      },
      {
        title: '重铸魔法属性',
        content: '任意装备 + 3个完美宝石可重铸所有魔法属性，保留物品基础类型和品质。',
        date: '2024-05-07',
        tags: ['属性重铸', '装备优化', '随机属性'],
        color: 'sky'
      }
    ]
  },
  {
    title: '暗金装备',
    description: '独特装备调整记录',
    count: 5,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>',
    notes: [
      {
        title: '风之力属性增强',
        content: '增加15%的攻击速度和8%的物理伤害转化为元素伤害，使这件经典武器在高等级仍然具有竞争力。',
        date: '2024-05-23',
        tags: ['双手武器', '攻击速度', '元素转化'],
        color: 'cyan'
      },
      {
        title: '死亡之网改动',
        content: '增加50%对亡灵伤害和"击中时15%几率施放3级衰老"效果，强化了这件手套在特定场景的实用性。',
        date: '2024-05-19',
        tags: ['手套', '亡灵克制', '特殊效果'],
        color: 'violet'
      },
      {
        title: '守护天使增强',
        content: '全属性抗性提升10%，并增加"被击中时10%几率施放15级神圣冰冻"，大幅提升生存能力。',
        date: '2024-05-14',
        tags: ['盾牌', '全抗性', '触发效果'],
        color: 'fuchsia'
      },
      {
        title: '死神之饰优化',
        content: '增加6%生命偷取和4%魔法偷取，并提高30%魔法装备出现率，使其成为刷图的理想选择。',
        date: '2024-05-10',
        tags: ['项链', '生命偷取', '掉落率'],
        color: 'rose'
      },
      {
        title: '暴风之盾改动',
        content: '现在额外提供15%的移动速度和"击中时25%几率施放8级旋风"效果，增强了物理系职业的机动性。',
        date: '2024-05-06',
        tags: ['护甲', '移动速度', '旋风触发'],
        color: 'blue'
      }
    ]
  },
  {
    title: '绿色套装',
    description: '套装装备优化记录',
    count: 3,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>',
    notes: [
      {
        title: '泰瑞尔的力量套装加强',
        content: '完整套装现在提供额外30%的伤害减免和25%的快速施法，使其成为施法者的优质选择。',
        date: '2024-05-21',
        tags: ['完整套装', '伤害减免', '快速施法'],
        color: 'green'
      },
      {
        title: '娜塔亚套装改进',
        content: '三件套效果增加20%攻击速度和15%移动速度，为亚马逊提供更好的输出和机动性。',
        date: '2024-05-17',
        tags: ['部分套装', '攻击速度', '移动速度'],
        color: 'lime'
      },
      {
        title: '极地套装元素调整',
        content: '完整套装现在提供所有元素技能+3和25%冰系伤害提升，使其成为冰系法师的理想选择。',
        date: '2024-05-09',
        tags: ['法师套装', '元素技能', '冰系伤害'],
        color: 'sky'
      }
    ]
  },
  {
    title: '佣兵',
    description: '佣兵系统增强记录',
    count: 3,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
    notes: [
      {
        title: '佣兵等级上限提升',
        content: '佣兵最高等级从99提升到120，高等级佣兵有额外的装备栏位和技能点。',
        date: '2024-05-24',
        tags: ['等级上限', '装备栏位', '技能点'],
        color: 'amber'
      },
      {
        title: '佣兵技能自定义',
        content: '新增功能允许玩家为佣兵重新分配技能点，提供更多战术选择和佣兵培养路线。',
        date: '2024-05-18',
        tags: ['技能重置', '自定义培养', '战术选择'],
        color: 'orange'
      },
      {
        title: '新增远程佣兵类型',
        content: '增加了亚马逊射手佣兵，擅长多重箭和闪电之矛技能，为玩家提供更多选择。',
        date: '2024-05-13',
        tags: ['新佣兵类型', '远程攻击', '元素伤害'],
        color: 'yellow'
      }
    ]
  },
  {
    title: '怪物集群',
    description: '怪物属性与分布改动',
    count: 4,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    notes: [
      {
        title: '精英怪物密度调整',
        content: '地狱难度精英怪物出现率提升30%，并增加10%的额外物品掉落率，提高刷图效率。',
        date: '2024-05-22',
        tags: ['精英怪物', '出现率', '掉落率'],
        color: 'red'
      },
      {
        title: '特殊怪物属性平衡',
        content: '降低了冰系免疫怪物在冰原地区的出现率，增加了火系免疫怪物的物理抗性，使游戏更平衡。',
        date: '2024-05-16',
        tags: ['元素免疫', '区域分布', '属性平衡'],
        color: 'purple'
      },
      {
        title: '超级暗金怪物增强',
        content: '超级暗金怪物现在必定掉落至少1件魔法物品，有10%几率掉落稀有或暗金物品。',
        date: '2024-05-11',
        tags: ['特殊怪物', '掉落保证', '稀有物品'],
        color: 'indigo'
      },
      {
        title: '新增特殊怪物群组',
        content: '在地狱难度的古墓中增加了"远古守卫"怪物群组，具有特殊能力和稀有掉落。',
        date: '2024-05-05',
        tags: ['新怪物组', '特殊能力', '专属掉落'],
        color: 'rose'
      }
    ]
  },
  {
    title: '环境变量',
    description: '游戏环境与机制调整',
    count: 2,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    notes: [
      {
        title: '区域等级动态调整',
        content: '实现了动态区域等级系统，玩家可以提升特定区域的怪物等级和掉落质量，增加挑战性。',
        date: '2024-05-19',
        tags: ['区域等级', '动态调整', '掉落质量'],
        color: 'emerald'
      },
      {
        title: '游戏难度自定义',
        content: '增加了"梦魇"难度选项，位于地狱之上，提供更高的挑战和更好的奖励。',
        date: '2024-05-08',
        tags: ['难度选项', '终极挑战', '顶级奖励'],
        color: 'cyan'
      }
    ]
  },
  {
    title: '玩法探索',
    description: '创新玩法机制记录',
    count: 3,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    notes: [
      {
        title: '符文词语自定义系统',
        content: '实现了符文词语自定义功能，玩家可以设计和创建具有特定属性组合的符文之语。',
        date: '2024-05-23',
        tags: ['符文之语', '自定义属性', '装备进阶'],
        color: 'fuchsia'
      },
      {
        title: '挑战副本系统',
        content: '新增6个挑战副本，每个副本有特定的入场条件和机制，完成后获得独特奖励。',
        date: '2024-05-14',
        tags: ['挑战副本', '特殊机制', '专属奖励'],
        color: 'violet'
      },
      {
        title: '角色专精系统',
        content: '实现了角色专精系统，每个职业可以选择两个专精方向，获得独特的被动加成。',
        date: '2024-05-06',
        tags: ['角色专精', '被动加成', '构建多样化'],
        color: 'blue'
      }
    ]
  }
];

// MOD随笔弹窗控制
const showModModal = ref(false);
const selectedModCard = ref(null);

// 打开MOD详情弹窗
const openModModal = (card) => {
  selectedModCard.value = card;
  showModModal.value = true;
};

// 表格功能 - 导出Excel
const exportToExcel = async () => {
  if (tableData.value.length === 0) {
    alert('表格中没有数据可导出');
    return;
  }
  
  try {
    const { utils, writeFile } = await import('xlsx');
    
    // 创建工作表，保留所有表头
    const worksheet = utils.json_to_sheet(tableData.value, { 
      header: tableHeaders.value 
    });
    
    // 设置列宽
    const colWidths = tableHeaders.value.map(header => ({
      wch: Math.max(header.length, 10) // 最小10个字符宽
    }));
    worksheet['!cols'] = colWidths;
    
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, '表格数据');
    
    const date = new Date();
    const timestamp = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}_${date.getHours().toString().padStart(2,'0')}${date.getMinutes().toString().padStart(2,'0')}`;
    
    writeFile(workbook, `表格数据_${timestamp}.xlsx`);
  } catch (error) {
    console.error('导出Excel失败:', error);
    alert('导出Excel失败: ' + error.message);
  }
};

// 表格功能 - 导出TXT
const exportToTxt = () => {
  if (tableData.value.length === 0) {
    alert('表格中没有数据可导出');
    return;
  }
  
  try {
    // 构建TXT内容
    let txtContent = '';
    
    // 添加表头
    txtContent += tableHeaders.value.join('\t') + '\n';
    
    // 添加数据行
    tableData.value.forEach(row => {
      const rowValues = tableHeaders.value.map(header => row[header] || '');
      txtContent += rowValues.join('\t') + '\n';
    });
    
    // 创建Blob对象
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    
    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // 设置下载文件名
    const date = new Date();
    const timestamp = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}_${date.getHours().toString().padStart(2,'0')}${date.getMinutes().toString().padStart(2,'0')}`;
    link.download = `表格数据_${timestamp}.txt`;
    
    // 设置链接并触发点击
    link.href = url;
    document.body.appendChild(link);
    link.click();
    
    // 清理
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('导出TXT失败:', error);
    alert('导出TXT失败: ' + error.message);
  }
};

// 游戏攻略编辑相关
const showGuideEditModal = ref(false)
const editingGuide = ref({
  title: '',
  description: '',
  class: '',
  date: ''
})
const editingGuideIndex = ref(-1)

// 游戏攻略编辑功能
const openGuideEditModal = (guide, index) => {
  if (guide) {
    // 编辑现有攻略
    editingGuide.value = { ...guide }
    editingGuideIndex.value = index
  } else {
    // 添加新攻略
    editingGuide.value = {
      title: '',
      description: '',
      class: '',
      date: new Date().toISOString().slice(0, 10)
    }
    editingGuideIndex.value = -1
  }
  showGuideEditModal.value = true
}

const closeGuideEditModal = () => {
  showGuideEditModal.value = false
}

const saveGuide = () => {
  // 验证必填字段
  if (!editingGuide.value.title || !editingGuide.value.description || !editingGuide.value.class || !editingGuide.value.date) {
    alert('请填写所有必填字段')
    return
  }
  
  if (editingGuideIndex.value === -1) {
    // 添加新攻略
    guides.push({ ...editingGuide.value })
  } else {
    // 更新现有攻略
    guides[editingGuideIndex.value] = { ...editingGuide.value }
  }
  
  closeGuideEditModal()
}

const deleteGuide = (index) => {
  if (confirm('确定要删除此攻略吗？')) {
    guides.splice(index, 1)
  }
}

// 游戏MOD编辑相关
const showModEditModal = ref(false)
const editingMod = ref({
  name: '',
  version: '',
  type: '',
  description: '',
  downloads: ''
})
const editingModIndex = ref(-1)

// 游戏MOD编辑功能
const openModEditModal = (mod, index) => {
  if (mod) {
    // 编辑现有MOD
    editingMod.value = { ...mod }
    editingModIndex.value = index
  } else {
    // 添加新MOD
    editingMod.value = {
      name: '',
      version: '',
      type: '',
      description: '',
      downloads: '0'
    }
    editingModIndex.value = -1
  }
  showModEditModal.value = true
}

const closeModEditModal = () => {
  showModEditModal.value = false
}

const saveMod = () => {
  // 验证必填字段
  if (!editingMod.value.name || !editingMod.value.version || !editingMod.value.type || !editingMod.value.description) {
    alert('请填写所有必填字段')
    return
  }
  
  if (editingModIndex.value === -1) {
    // 添加新MOD
    mods.push({ ...editingMod.value })
  } else {
    // 更新现有MOD
    mods[editingModIndex.value] = { ...editingMod.value }
  }
  
  closeModEditModal()
}

const deleteMod = (index) => {
  if (confirm('确定要删除此MOD吗？')) {
    mods.splice(index, 1)
  }
}

// 游戏工具编辑相关
const showToolEditModal = ref(false)
const editingTool = ref({
  name: '',
  description: '',
  tags: [],
  lastUpdate: ''
})
const editingToolTags = ref('')
const editingToolIndex = ref(-1)

// 游戏工具编辑功能
const openToolEditModal = (tool, index) => {
  if (tool) {
    // 编辑现有工具
    editingTool.value = { ...tool }
    editingToolTags.value = tool.tags.join(',')
    editingToolIndex.value = index
  } else {
    // 添加新工具
    editingTool.value = {
      name: '',
      description: '',
      tags: [],
      lastUpdate: new Date().toISOString().slice(0, 10)
    }
    editingToolTags.value = ''
    editingToolIndex.value = -1
  }
  showToolEditModal.value = true
}

const closeToolEditModal = () => {
  showToolEditModal.value = false
}

const saveTool = () => {
  // 验证必填字段
  if (!editingTool.value.name || !editingTool.value.description || !editingToolTags.value || !editingTool.value.lastUpdate) {
    alert('请填写所有必填字段')
    return
  }
  
  // 处理标签
  editingTool.value.tags = editingToolTags.value.split(',').map(tag => tag.trim()).filter(tag => tag)
  
  if (editingToolIndex.value === -1) {
    // 添加新工具
    tools.push({ ...editingTool.value })
  } else {
    // 更新现有工具
    tools[editingToolIndex.value] = { ...editingTool.value }
  }
  
  closeToolEditModal()
}

const deleteTool = (index) => {
  if (confirm('确定要删除此工具吗？')) {
    tools.splice(index, 1)
  }
}

// 游戏开发笔记编辑相关
const showDevNoteEditModal = ref(false)
const editingDevNote = ref({
  day: '',
  date: '',
  title: '',
  content: '',
  tags: []
})
const editingDevNoteTags = ref('')
const editingDevNoteIndex = ref(-1)

// 游戏开发笔记编辑功能
const openDevNoteEditModal = (devNote, index) => {
  if (devNote) {
    // 编辑现有开发笔记
    editingDevNote.value = { ...devNote }
    editingDevNoteTags.value = devNote.tags.join(',')
    editingDevNoteIndex.value = index
  } else {
    // 添加新开发笔记
    editingDevNote.value = {
      day: '',
      date: new Date().toISOString().slice(0, 10),
      title: '',
      content: '',
      tags: []
    }
    editingDevNoteTags.value = ''
    editingDevNoteIndex.value = -1
  }
  showDevNoteEditModal.value = true
}

const closeDevNoteEditModal = () => {
  showDevNoteEditModal.value = false
}

const saveDevNote = () => {
  // 验证必填字段
  if (!editingDevNote.value.day || !editingDevNote.value.date || !editingDevNote.value.title || !editingDevNote.value.content || !editingDevNoteTags.value) {
    alert('请填写所有必填字段')
    return
  }
  
  // 处理标签
  editingDevNote.value.tags = editingDevNoteTags.value.split(',').map(tag => tag.trim()).filter(tag => tag)
  
  if (editingDevNoteIndex.value === -1) {
    // 添加新开发笔记
    devNotes.push({ ...editingDevNote.value })
  } else {
    // 更新现有开发笔记
    devNotes[editingDevNoteIndex.value] = { ...editingDevNote.value }
  }
  
  closeDevNoteEditModal()
}

const deleteDevNote = (index) => {
  if (confirm('确定要删除此开发笔记吗？')) {
    devNotes.splice(index, 1)
  }
}

// MOD随笔编辑相关
const showModNoteEditModal = ref(false)
const editingModNote = ref({
  title: '',
  content: '',
  date: '',
  tags: [],
  color: 'blue'
})
const editingModNoteTags = ref('')
const editingModNoteIndex = ref(-1)

// MOD随笔编辑功能
const openModNoteEditModal = (note, index) => {
  if (note) {
    // 编辑现有MOD笔记
    editingModNote.value = { ...note }
    editingModNoteTags.value = note.tags.join(',')
    editingModNoteIndex.value = index
  } else {
    // 添加新MOD笔记
    editingModNote.value = {
      title: '',
      content: '',
      date: new Date().toISOString().slice(0, 10),
      tags: [],
      color: 'blue'
    }
    editingModNoteTags.value = ''
    editingModNoteIndex.value = -1
  }
  showModNoteEditModal.value = true
}

const closeModNoteEditModal = () => {
  showModNoteEditModal.value = false
}

const saveModNote = () => {
  // 验证必填字段
  if (!editingModNote.value.title || !editingModNote.value.content || !editingModNote.value.date || !editingModNoteTags.value) {
    alert('请填写所有必填字段')
    return
  }
  
  // 处理标签
  editingModNote.value.tags = editingModNoteTags.value.split(',').map(tag => tag.trim()).filter(tag => tag)
  
  if (editingModNoteIndex.value === -1) {
    // 添加新MOD笔记
    selectedModCard.value.notes.push({ ...editingModNote.value })
    // 更新计数
    selectedModCard.value.count = selectedModCard.value.notes.length
  } else {
    // 更新现有MOD笔记
    selectedModCard.value.notes[editingModNoteIndex.value] = { ...editingModNote.value }
  }
  
  closeModNoteEditModal()
}

const deleteModNote = (index) => {
  if (confirm('确定要删除此MOD笔记吗？')) {
    selectedModCard.value.notes.splice(index, 1)
    // 更新计数
    selectedModCard.value.count = selectedModCard.value.notes.length
  }
}
</script>

<style>
/* 表格固定样式 */
.table-fixed-header {
  overflow: auto;
}

.table-fixed-header thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgb(249 250 251 / 1);
}

.dark .table-fixed-header thead th {
  background-color: rgba(17, 24, 39, 0.5);
}

.table-fixed-column .sticky {
  position: sticky;
  left: 0;
  z-index: 5;
}

/* 表格容器样式，限制表格高度，使固定表头生效 */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}

/* 添加淡入动画 */
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 添加下滑动画 */
.animate-slideDown {
  animation: slideDown 0.3s ease-in-out;
  transform-origin: top;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}
</style> 