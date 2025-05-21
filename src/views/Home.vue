<template>
  <div class="min-h-screen relative">
    <AuroraBackground class="fixed inset-0 -z-10 w-full h-full" />
    
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
          <div class="hidden md:flex items-center space-x-1">
            <a href="/home" class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-serif">主页</a>
            
            <!-- 工作 Dropdown -->
            <div class="relative group">
              <button class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-serif flex items-center">
                工作
                <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
              <div class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out z-20">
                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-serif" role="menuitem">待做事项</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-serif" role="menuitem">随笔记录</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-serif" role="menuitem">工具箱</a>
                </div>
              </div>
            </div>

            <!-- 生活 Dropdown -->
            <div class="relative group">
              <button class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-serif flex items-center">
                生活
                <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
              <div class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out z-20">
                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-serif" role="menuitem">账单</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-serif" role="menuitem">菜谱</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-serif" role="menuitem">计划</a>
                </div>
              </div>
            </div>
            
            <a href="/game" class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-serif">游戏</a>
            <a href="#" class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-serif">AI</a>
          </div>
        </div>

        <!-- Mobile menu -->
        <div
          class="md:hidden"
          :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
        >
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/home" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-serif">主页</a>
            
            <!-- 工作 Mobile Dropdown -->
            <div>
              <button @click="toggleMobileDropdown('work')" class="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-serif">
                工作
                <svg class="ml-1 h-5 w-5 transform transition-transform duration-200" :class="{'rotate-180': mobileDropdownOpen === 'work'}" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
              <div v-if="mobileDropdownOpen === 'work'" class="mt-1 pl-4 space-y-1">
                <a href="#" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-serif">待做事项</a>
                <a href="#" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-serif">随笔记录</a>
                <a href="#" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-serif">工具箱</a>
              </div>
            </div>

            <!-- 生活 Mobile Dropdown -->
            <div>
              <button @click="toggleMobileDropdown('life')" class="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-serif">
                生活
                <svg class="ml-1 h-5 w-5 transform transition-transform duration-200" :class="{'rotate-180': mobileDropdownOpen === 'life'}" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
              <div v-if="mobileDropdownOpen === 'life'" class="mt-1 pl-4 space-y-1">
                <a href="#" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-serif">账单</a>
                <a href="#" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-serif">菜谱</a>
                <a href="#" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-serif">计划</a>
              </div>
            </div>

            <a href="/game" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-serif">游戏</a>
            <a href="#" @click="isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-serif">AI</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="relative pt-20 px-4">
      <div class="max-w-7xl mx-auto py-8">
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200 font-serif">高效工作，精致生活</h1>
        <p class="text-1xl md:text-1xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200 font-serif">一站式管理您的工作任务与生活计划，让每一天都井井有条</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-80 gap-y-5">
          <!-- 备忘录卡片 -->
          <ClientOnly>
            <CardContainer>
              <CardBody
                class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[24rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
              >
                <CardItem
                  :translate-z="50"
                  class="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  备忘录
                </CardItem>
                <CardItem
                  as="p"
                  translate-z="60"
                  class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
                >
                  记录生活中的重要事项，让每一天都井井有条
                </CardItem>
                <CardItem
                  :translate-z="100"
                  class="mt-4 w-full"
                >
                  <div class="space-y-4">
                    <!-- 状态统计 -->
                    <div class="grid grid-cols-2 gap-3">
                      <div class="flex items-center space-x-2 p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                        <div class="w-2 h-2 rounded-full bg-red-500"></div>
                        <div class="flex flex-col">
                          <span class="text-sm font-medium text-red-600 dark:text-red-400">紧急</span>
                          <span class="text-xs text-red-500 dark:text-red-300">3 项待处理</span>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div class="w-2 h-2 rounded-full bg-green-500"></div>
                        <div class="flex flex-col">
                          <span class="text-sm font-medium text-green-600 dark:text-green-400">已完成</span>
                          <span class="text-xs text-green-500 dark:text-green-300">15 项</span>
                        </div>
                      </div>
                    </div>

                    <!-- 最近备忘录 -->
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">最近备忘录</span>
                        <CardItem
                    :translate-z="20"
                    as="router-link"
                    to="/memo" class="text-xs text-gray-500 dark:text-gray-400">查看全部</CardItem>
                      </div>
                      <div class="space-y-2">
                        <div class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <div class="flex items-start justify-between">
                            <span class="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">产品需求梳理</span>
                            <span class="text-xs text-red-500">紧急</span>
                          </div>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">整理下季度产品功能需求清单，与设计团队协调UI方案...</p>
                        </div>
                        <div class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <div class="flex items-start justify-between">
                            <span class="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">健身计划安排</span>
                            <span class="text-xs text-gray-500">普通</span>
                          </div>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">每周3次训练，周一力量，周三有氧，周五瑜伽...</p>
                        </div>
                      </div>
                    </div>

                    <!-- 标签统计 -->
                    <div class="flex flex-wrap gap-2">
                      <span class="px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs">工作</span>
                      <span class="px-2 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs">生活</span>
                      <span class="px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs">学习</span>
                    </div>
                  </div>
                </CardItem>
                <div class="mt-6 flex items-center justify-between">
                  <CardItem
                    :translate-z="20"
                    as="router-link"
                    to="/memo"
                    class="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
                  >
                    查看详情 →
                  </CardItem>
                  <CardItem
                    :translate-z="20"
                    as="router-link"
                    to="/memo"
                    class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
                  >
                    查看备忘录
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </ClientOnly>

          <!-- 工具箱卡片 -->
          <ClientOnly>
            <CardContainer>
              <CardBody
                class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[24rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
              >
                <CardItem
                  :translate-z="50"
                  class="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  工具箱
                </CardItem>
                <CardItem
                  as="p"
                  translate-z="60"
                  class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
                >
                  实用工具集合，让生活更便捷
                </CardItem>
                <CardItem
                  :translate-z="100"
                  class="mt-4 w-full"
                >
                  <div class="space-y-4">
                    <!-- 工具分类统计 -->
                    <div class="grid grid-cols-2 gap-3">
                      <div class="flex items-center space-x-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div class="flex flex-col">
                          <span class="text-sm font-medium text-blue-600 dark:text-blue-400">开发工具</span>
                          <span class="text-xs text-blue-500 dark:text-blue-300">8 个工具</span>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                        <div class="w-2 h-2 rounded-full bg-purple-500"></div>
                        <div class="flex flex-col">
                          <span class="text-sm font-medium text-purple-600 dark:text-purple-400">效率工具</span>
                          <span class="text-xs text-purple-500 dark:text-purple-300">6 个工具</span>
                        </div>
                      </div>
                    </div>

                    <!-- 最近使用工具 -->
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">热门工具</span>
                        <CardItem
                          :translate-z="20"
                          as="router-link"
                          to="/tools"
                          class="text-xs text-gray-500 dark:text-gray-400"
                        >
                          查看全部
                        </CardItem>
                      </div>
                      <div class="space-y-2">
                        <div class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <div class="flex items-start justify-between">
                            <span class="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">代码格式化</span>
                            <span class="text-xs text-blue-500">开发工具</span>
                          </div>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">支持多种语言的代码格式化工具，帮助提高代码可读性...</p>
                        </div>
                        <div class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <div class="flex items-start justify-between">
                            <span class="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">番茄工作法计时器</span>
                            <span class="text-xs text-purple-500">效率工具</span>
                          </div>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">基于番茄工作法的时间管理工具，提高工作专注度...</p>
                        </div>
                      </div>
                    </div>

                    <!-- 工具分类标签 -->
                    <div class="flex flex-wrap gap-2">
                      <span class="px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs">开发工具</span>
                      <span class="px-2 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs">效率工具</span>
                      <span class="px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs">设计工具</span>
                    </div>
                  </div>
                </CardItem>
                <div class="mt-6 flex items-center justify-between">
                  <CardItem
                    :translate-z="20"
                    as="router-link"
                    to="/tools"
                    class="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
                  >
                    查看详情 →
                  </CardItem>
                  <CardItem
                    :translate-z="20"
                    as="router-link"
                    to="/tools"
                    class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
                  >
                    使用工具
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </ClientOnly>

          <!-- 菜谱卡片 -->
          <ClientOnly>
            <CardContainer>
              <CardBody
                class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[24rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
              >
                <CardItem
                  :translate-z="50"
                  class="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  菜谱
                </CardItem>
                <CardItem
                  as="p"
                  translate-z="60"
                  class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
                >
                  精选美食菜谱，让烹饪更简单
                </CardItem>
                <CardItem
                  :translate-z="100"
                  class="mt-4 w-full"
                >
                  <div class="space-y-4">
                    <!-- 菜系统计 -->
                    <div class="grid grid-cols-2 gap-3">
                      <div class="flex items-center space-x-2 p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                        <div class="w-2 h-2 rounded-full bg-red-500"></div>
                        <div class="flex flex-col">
                          <span class="text-sm font-medium text-red-600 dark:text-red-400">中餐</span>
                          <span class="text-xs text-red-500 dark:text-red-300">42 道菜品</span>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                        <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div class="flex flex-col">
                          <span class="text-sm font-medium text-yellow-600 dark:text-yellow-400">西餐</span>
                          <span class="text-xs text-yellow-500 dark:text-yellow-300">28 道菜品</span>
                        </div>
                      </div>
                    </div>

                    <!-- 热门菜品 -->
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">热门菜品</span>
                        <CardItem
                          :translate-z="20"
                          as="router-link"
                          to="/recipes"
                          class="text-xs text-gray-500 dark:text-gray-400"
                        >
                          查看全部
                        </CardItem>
                      </div>
                      <div class="space-y-2">
                        <div class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <div class="flex items-start justify-between">
                            <span class="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">香煎三文鱼</span>
                            <span class="text-xs text-yellow-500">西餐</span>
                          </div>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">外酥里嫩的三文鱼，富含欧米伽3脂肪酸，健康美味...</p>
                        </div>
                        <div class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <div class="flex items-start justify-between">
                            <span class="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">麻婆豆腐</span>
                            <span class="text-xs text-red-500">中餐</span>
                          </div>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">经典川菜，麻辣鲜香，下饭神器，制作简单...</p>
                        </div>
                      </div>
                    </div>

                    <!-- 菜系标签 -->
                    <div class="flex flex-wrap gap-2">
                      <span class="px-2 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs">中餐</span>
                      <span class="px-2 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs">西餐</span>
                      <span class="px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs">甜点</span>
                      <span class="px-2 py-1 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs">饮品</span>
                    </div>
                  </div>
                </CardItem>
                <div class="mt-6 flex items-center justify-between">
                  <CardItem
                    :translate-z="20"
                    as="router-link"
                    to="/recipes"
                    class="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
                  >
                    查看详情 →
                  </CardItem>
                  <CardItem
                    :translate-z="20"
                    as="router-link"
                    to="/recipes"
                    class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
                  >
                    浏览菜谱
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </ClientOnly>

          <!-- AI交互组件卡片 -->
          <ClientOnly>
            <CardContainer>
              <CardBody
                class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[24rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
              >
                <CardItem
                  :translate-z="50"
                  class="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  AI 提示词库
                </CardItem>
                <CardItem
                  as="p"
                  translate-z="60"
                  class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
                >
                  精选高效 AI 提示词，让你的创作更加高效
                </CardItem>
                <CardItem
                  :translate-z="100"
                  class="mt-4 w-full"
                >
                  <div class="space-y-4">
                    <!-- 模块统计 -->
                    <div class="grid grid-cols-2 gap-3">
                      <div class="flex items-center space-x-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div class="flex flex-col">
                          <span class="text-sm font-medium text-blue-600 dark:text-blue-400">创意写作</span>
                          <span class="text-xs text-blue-500 dark:text-blue-300">20 个提示词</span>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div class="w-2 h-2 rounded-full bg-green-500"></div>
                        <div class="flex flex-col">
                          <span class="text-sm font-medium text-green-600 dark:text-green-400">视觉设计</span>
                          <span class="text-xs text-green-500 dark:text-green-300">20 个提示词</span>
                        </div>
                      </div>
                    </div>

                    <!-- 最近提示词 -->
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">热门提示词</span>
                        <CardItem
                          :translate-z="20"
                          as="router-link"
                          to="/ai-prompts"
                          class="text-xs text-gray-500 dark:text-gray-400"
                        >
                          查看全部
                        </CardItem>
                      </div>
                      <div class="space-y-2">
                        <div class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <div class="flex items-start justify-between">
                            <span class="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">故事创作</span>
                            <span class="text-xs text-blue-500">创意写作</span>
                          </div>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">我需要创作一个有关[主题]的短篇故事。故事应包含以下元素：引人入胜的开头，清晰的角色描述...</p>
                        </div>
                        <div class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <div class="flex items-start justify-between">
                            <span class="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">UI界面设计</span>
                            <span class="text-xs text-green-500">视觉设计</span>
                          </div>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">请设计一个[应用类型]的[界面组件]。设计风格应该是[风格]，主色调为[颜色]...</p>
                        </div>
                      </div>
                    </div>

                    <!-- 模块标签 -->
                    <div class="flex flex-wrap gap-2">
                      <span class="px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs">创意写作</span>
                      <span class="px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs">视觉设计</span>
                      <span class="px-2 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs">商业助手</span>
                      <span class="px-2 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs">开发编程</span>
                    </div>
                  </div>
                </CardItem>
                <div class="mt-6 flex items-center justify-between">
                  <CardItem
                    :translate-z="20"
                    as="router-link"
                    to="/ai-prompts"
                    class="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
                  >
                    查看详情 →
                  </CardItem>
                  <CardItem
                    :translate-z="20"
                    as="router-link"
                    to="/ai-prompts"
                    class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
                  >
                    浏览提示词
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </ClientOnly>

          <!-- 坦克薯条卡片 -->
          <ClientOnly>
            <CardContainer>
              <CardBody
                class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[24rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
              >
                <CardItem
                  :translate-z="50"
                  class="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  游戏天地
                </CardItem>
                <CardItem
                  as="p"
                  translate-z="60"
                  class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
                >
                  发现有趣的游戏，享受愉快的休闲时光
                </CardItem>
                <CardItem
                  :translate-z="100"
                  class="mt-4 w-full"
                >
                  <div class="space-y-4">
                    <!-- 游戏分类统计 -->
                    <div class="grid grid-cols-2 gap-3">
                      <div class="flex items-center space-x-2 p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                        <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <div class="flex flex-col">
                          <span class="text-sm font-medium text-indigo-600 dark:text-indigo-400">休闲游戏</span>
                          <span class="text-xs text-indigo-500 dark:text-indigo-300">14 款游戏</span>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2 p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                        <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                        <div class="flex flex-col">
                          <span class="text-sm font-medium text-orange-600 dark:text-orange-400">益智解谜</span>
                          <span class="text-xs text-orange-500 dark:text-orange-300">8 款游戏</span>
                        </div>
                      </div>
                    </div>

                    <!-- 热门游戏 -->
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">热门游戏</span>
                        <CardItem
                          :translate-z="20"
                          as="router-link"
                          to="/game"
                          class="text-xs text-gray-500 dark:text-gray-400"
                        >
                          查看全部
                        </CardItem>
                      </div>
                      <div class="space-y-2">
                        <div class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <div class="flex items-start justify-between">
                            <span class="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">数独挑战</span>
                            <span class="text-xs text-orange-500">益智解谜</span>
                          </div>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">经典数独游戏，多种难度级别，训练逻辑思维能力...</p>
                        </div>
                        <div class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <div class="flex items-start justify-between">
                            <span class="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">消消乐</span>
                            <span class="text-xs text-indigo-500">休闲游戏</span>
                          </div>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">休闲消除类游戏，简单上手，丰富的关卡设计...</p>
                        </div>
                      </div>
                    </div>

                    <!-- 游戏分类标签 -->
                    <div class="flex flex-wrap gap-2">
                      <span class="px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs">休闲游戏</span>
                      <span class="px-2 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs">益智解谜</span>
                      <span class="px-2 py-1 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs">策略游戏</span>
                    </div>
                  </div>
                </CardItem>
                <div class="mt-6 flex items-center justify-between">
                  <CardItem
                    :translate-z="20"
                    as="router-link"
                    to="/game"
                    class="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
                  >
                    查看详情 →
                  </CardItem>
                  <CardItem
                    :translate-z="20"
                    as="router-link"
                    to="/game"
                    class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
                  >
                    开始游戏
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </ClientOnly>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import CardContainer from '@/components/ui/card-3d/CardContainer.vue'
import CardBody from '@/components/ui/card-3d/CardBody.vue'
import CardItem from '@/components/ui/card-3d/CardItem.vue'
import AuroraBackground from '@/components/AuroraBackground.vue'
import { ref } from 'vue'

const isMenuOpen = ref(false)
const mobileDropdownOpen = ref(null) // Stores which mobile dropdown is open: 'work', 'life', or null

const toggleMobileDropdown = (dropdownName) => {
  if (mobileDropdownOpen.value === dropdownName) {
    mobileDropdownOpen.value = null; // Close if already open
  } else {
    mobileDropdownOpen.value = dropdownName; // Open the clicked one
  }
}
</script> 