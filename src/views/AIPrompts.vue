<template>
  <div class="min-h-screen relative">
    <AuroraBackground class="fixed inset-0 -z-10 w-full h-full" />
    
    <div class="pt-20 px-4">
      <div class="max-w-7xl mx-auto py-8">
        <h1 class="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200 font-serif">AI 提示词库</h1>
        <p class="text-lg md:text-xl text-center mb-12 text-gray-600 dark:text-gray-300 font-serif">精选高效 AI 提示词，让你的创作更加高效</p>
        
        <!-- 类别选择 -->
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          <button 
            v-for="(category, index) in categories" 
            :key="index"
            @click="activeCategory = category.id"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium font-serif',
              activeCategory === category.id 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'bg-muted hover:bg-muted/80 text-muted-foreground'
            ]"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- 搜索框 -->
        <div class="relative max-w-xl mx-auto mb-12">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索提示词..."
            class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="space-y-8">
          <!-- 创意写作模块 -->
          <div v-if="activeCategory === 'creative-writing' || activeCategory === 'all'" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 font-serif flex items-center">
                <span class="mr-2">✍️</span> 创意写作
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-6">帮助你突破创作瓶颈，生成各类创意文本内容</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(prompt, index) in filteredPrompts.creativeWriting" :key="index" class="group relative">
                  <div class="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all bg-gray-50 dark:bg-gray-900">
                    <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-2">{{ prompt.title }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{{ prompt.content }}</p>
                    
                    <div class="flex justify-between mt-4">
                      <span class="text-xs text-gray-500 dark:text-gray-500">{{ prompt.category }}</span>
                      <div class="flex space-x-2">
                        <button @click="copyToClipboard(prompt.content)" class="text-gray-400 hover:text-primary focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                        <button @click="showPromptDetail(prompt)" class="text-gray-400 hover:text-primary focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 视觉设计模块 -->
          <div v-if="activeCategory === 'visual-design' || activeCategory === 'all'" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 font-serif flex items-center">
                <span class="mr-2">🎨</span> 视觉设计
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-6">帮助你创建精美的图像、插图和设计作品</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(prompt, index) in filteredPrompts.visualDesign" :key="index" class="group relative">
                  <div class="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all bg-gray-50 dark:bg-gray-900">
                    <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-2">{{ prompt.title }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{{ prompt.content }}</p>
                    
                    <div class="flex justify-between mt-4">
                      <span class="text-xs text-gray-500 dark:text-gray-500">{{ prompt.category }}</span>
                      <div class="flex space-x-2">
                        <button @click="copyToClipboard(prompt.content)" class="text-gray-400 hover:text-primary focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                        <button @click="showPromptDetail(prompt)" class="text-gray-400 hover:text-primary focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 商业助手模块 -->
          <div v-if="activeCategory === 'business' || activeCategory === 'all'" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 font-serif flex items-center">
                <span class="mr-2">💼</span> 商业助手
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-6">提升商业沟通、策略制定和运营效率的提示词</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(prompt, index) in filteredPrompts.business" :key="index" class="group relative">
                  <div class="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all bg-gray-50 dark:bg-gray-900">
                    <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-2">{{ prompt.title }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{{ prompt.content }}</p>
                    
                    <div class="flex justify-between mt-4">
                      <span class="text-xs text-gray-500 dark:text-gray-500">{{ prompt.category }}</span>
                      <div class="flex space-x-2">
                        <button @click="copyToClipboard(prompt.content)" class="text-gray-400 hover:text-primary focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                        <button @click="showPromptDetail(prompt)" class="text-gray-400 hover:text-primary focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 学术研究模块 -->
          <div v-if="activeCategory === 'academic' || activeCategory === 'all'" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 font-serif flex items-center">
                <span class="mr-2">🎓</span> 学术研究
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-6">辅助学术研究和学习的专业提示词模板</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(prompt, index) in filteredPrompts.academic" :key="index" class="group relative">
                  <div class="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all bg-gray-50 dark:bg-gray-900">
                    <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-2">{{ prompt.title }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{{ prompt.content }}</p>
                    
                    <div class="flex justify-between mt-4">
                      <span class="text-xs text-gray-500 dark:text-gray-500">{{ prompt.category }}</span>
                      <div class="flex space-x-2">
                        <button @click="copyToClipboard(prompt.content)" class="text-gray-400 hover:text-primary focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                        <button @click="showPromptDetail(prompt)" class="text-gray-400 hover:text-primary focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 开发编程模块 -->
          <div v-if="activeCategory === 'development' || activeCategory === 'all'" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 font-serif flex items-center">
                <span class="mr-2">💻</span> 开发编程
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-6">提升编程效率和解决技术问题的专业提示词</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(prompt, index) in filteredPrompts.development" :key="index" class="group relative">
                  <div class="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all bg-gray-50 dark:bg-gray-900">
                    <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-2">{{ prompt.title }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{{ prompt.content }}</p>
                    
                    <div class="flex justify-between mt-4">
                      <span class="text-xs text-gray-500 dark:text-gray-500">{{ prompt.category }}</span>
                      <div class="flex space-x-2">
                        <button @click="copyToClipboard(prompt.content)" class="text-gray-400 hover:text-primary focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                        <button @click="showPromptDetail(prompt)" class="text-gray-400 hover:text-primary focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
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
    </div>

    <!-- 提示词详情 Modal -->
    <div v-if="selectedPrompt" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">{{ selectedPrompt.title }}</h3>
            <button @click="selectedPrompt = null" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="mb-6">
            <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line">{{ selectedPrompt.content }}</p>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">{{ selectedPrompt.category }}</span>
            <button @click="copyToClipboard(selectedPrompt.content)" class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              复制提示词
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AuroraBackground from '../components/AuroraBackground.vue';

// 定义类别
const categories = [
  { id: 'all', name: '全部' },
  { id: 'creative-writing', name: '创意写作' },
  { id: 'visual-design', name: '视觉设计' },
  { id: 'business', name: '商业助手' },
  { id: 'academic', name: '学术研究' },
  { id: 'development', name: '开发编程' },
];

const activeCategory = ref('all');
const searchQuery = ref('');
const selectedPrompt = ref(null);

// 创意写作提示词
const creativeWritingPrompts = [
  {
    title: '故事创作',
    content: '我需要创作一个有关[主题]的短篇故事。故事应包含以下元素：1) 一个引人入胜的开头，2) 清晰的角色描述，3) 情节转折，4) 一个发人深省的结局。故事的基调应该是[基调]，长度大约[字数]字。',
    category: '创意写作'
  },
  {
    title: '诗歌创作',
    content: '请帮我创作一首关于[主题]的诗。诗的风格应该是[风格]（例如：自由诗、十四行诗、古风等），情感基调是[情感]。可以包含一些意象和比喻来增强表现力。',
    category: '创意写作'
  },
  {
    title: '角色设定',
    content: '请为一个名为[角色名]的小说/剧本/游戏角色创建详细的背景设定。包括：1) 基本信息（年龄、性别、外貌）2) 成长背景 3) 性格特点 4) 重要关系 5) 内在动机和冲突 6) 特殊能力或技能。',
    category: '创意写作'
  },
  {
    title: '对话生成',
    content: '请创建两个角色之间的对话。角色A是[角色A描述]，角色B是[角色B描述]。他们正在讨论[话题]。对话应该反映出各自的性格特点和观点差异，并包含一些冲突或转折。',
    category: '创意写作'
  },
  {
    title: '情感场景描写',
    content: '请描写一个充满[情感类型]的场景。场景发生在[地点]，涉及的人物包括[人物]。使用感官描写（视觉、听觉、嗅觉、触觉、味觉）来增强场景的沉浸感，让读者能够感同身受。',
    category: '创意写作'
  },
  {
    title: '创意标题生成',
    content: '请为我的[内容类型]（如文章、书籍、播客等）生成10个吸引人的标题。主题是关于[主题]，目标受众是[受众群体]。标题应该引起好奇心，突出价值，并具有点击诱惑力。',
    category: '创意写作'
  },
  {
    title: '故事梗概扩展',
    content: '我有一个故事梗概：[简短梗概]。请帮我将这个梗概扩展成一个完整的故事大纲，包括主要情节点、角色发展弧、转折点和结局。风格应该是[风格]，适合[目标受众]。',
    category: '创意写作'
  },
  {
    title: '世界观构建',
    content: '请帮我构建一个[类型]（如奇幻、科幻、历史等）世界的设定。这个世界叫[世界名称]，具有以下特点：[特点1]、[特点2]。请详细描述这个世界的地理、历史、社会结构、文化、科技/魔法系统和主要冲突。',
    category: '创意写作'
  },
  {
    title: '文学风格模仿',
    content: '请用[作家名]的写作风格，创作一段关于[主题]的文字。注意模仿该作家的句式结构、词汇选择、修辞手法和整体语调。长度约[字数]字。',
    category: '创意写作'
  },
  {
    title: '情节转折构思',
    content: '我的故事中[简述当前情节]，现在我需要一个令人惊讶但合理的情节转折。请提供3-5个可能的转折点构想，每个都能引导故事走向不同方向，但都保持角色一致性和故事的内部逻辑。',
    category: '创意写作'
  },
  {
    title: '隐喻和象征创作',
    content: '请为[主题或概念]创造5个原创的隐喻或象征。这些修辞手法应该新颖且有深度，能够在文学作品中使用，帮助读者从新的角度理解这个概念。为每个隐喻提供简短的解释。',
    category: '创意写作'
  },
  {
    title: '开场白创作',
    content: '请为一篇关于[主题]的[类型]（如小说、演讲、文章等）创作一个引人入胜的开场白。开场白应该能够立即抓住读者/听众的注意力，设定基调，并暗示后续内容。风格应该是[风格]。',
    category: '创意写作'
  },
  {
    title: '情感信件',
    content: '请帮我撰写一封从[发信人]写给[收信人]的情感信件。信件的目的是[目的]（如道歉、感谢、表达爱意等）。背景情况是[背景]，情感基调应该是[情感]。信件长度约[字数]字。',
    category: '创意写作'
  },
  {
    title: '跨文化故事改编',
    content: '请将[原始故事]改编为一个设定在[目标文化]背景下的故事。保留原始故事的核心主题和情感，但调整人物、环境、文化元素和具体情节，使其在新的文化背景中既合理又有新鲜感。',
    category: '创意写作'
  },
  {
    title: '视角转换',
    content: '请将以下场景从不同角色的视角重新描述：[场景描述]。分别用[角色1]、[角色2]和[角色3]的第一人称视角来讲述这个场景，展示每个角色独特的观察、感受和想法。',
    category: '创意写作'
  },
  {
    title: '悬疑情节构建',
    content: '请为一个悬疑故事设计一个扣人心弦的情节。故事的核心谜团是[谜团]，主要角色包括[角色列表]。请设计线索的逐步揭示过程，包括误导、红鲱鱼和关键线索，以及最终揭示真相的方式。',
    category: '创意写作'
  },
  {
    title: '多感官描写',
    content: '请描述[场景或物体]，充分运用五感（视觉、听觉、嗅觉、味觉、触觉）。描写应该生动细腻，能让读者仿佛亲临其境。场景的情绪基调是[情绪]，风格应该是[风格]。',
    category: '创意写作'
  },
  {
    title: '创意写作练习',
    content: '请设计5个创意写作练习，帮助突破写作瓶颈和提升特定写作技巧。这些练习应该针对[特定技巧]（如对话、描写、情节构建等），每个练习应包含明确的指导和一个具体的例子。',
    category: '创意写作'
  },
  {
    title: '故事结构分析',
    content: '请分析[故事名称]的叙事结构，包括：1) 故事的整体架构（如三幕结构、英雄之旅等）2) 关键情节点 3) 角色弧线发展 4) 冲突设置与解决 5) 主题呈现方式。分析要深入且具体。',
    category: '创意写作'
  },
  {
    title: '创意非虚构写作',
    content: '请以创意非虚构的形式，撰写一篇关于[主题]的文章。应结合事实信息和个人视角，使用生动的叙事手法、场景描写和对话，同时保持内容的真实性。风格应该是[风格]，字数约[字数]。',
    category: '创意写作'
  },
];

// 视觉设计提示词
const visualDesignPrompts = [
  {
    title: '插画风格描述',
    content: '请创建一幅[主题]的插画，风格为[风格]（如水彩、像素艺术、平面设计等）。画面应包含以下元素：[元素列表]。色彩方案应以[色彩]为主，整体氛围是[氛围]。构图应该[构图要求]。',
    category: '视觉设计'
  },
  {
    title: 'UI界面设计',
    content: '请设计一个[应用类型]的[界面组件]（如登录页、仪表盘、产品列表等）。设计风格应该是[风格]（如拟物化、扁平化、新拟态等），主色调为[颜色]。目标用户是[用户群体]，关键功能包括[功能列表]。',
    category: '视觉设计'
  },
  {
    title: '产品包装设计',
    content: '请设计一款[产品]的包装。产品定位是[定位]，目标受众是[目标受众]。包装应体现品牌的[核心价值]，设计风格偏向[风格]。主要元素应包括[元素列表]，颜色方案以[颜色]为主。',
    category: '视觉设计'
  },
  {
    title: '标志设计',
    content: '请为名为[名称]的[企业/组织类型]设计一个标志。该组织的核心价值是[价值观]，目标受众是[目标受众]。标志应该简洁、独特且易于记忆，能在各种尺寸下保持清晰度。风格偏向于[风格]，主色调是[颜色]。',
    category: '视觉设计'
  },
  {
    title: '角色设计',
    content: '请设计一个[类型]游戏/动画中的角色。角色是[角色简述]，有以下特点：[特点列表]。角色的服装应反映[时代/风格]，性格特点应在设计中体现出来。请提供正面全身像的详细描述。',
    category: '视觉设计'
  },
  {
    title: '场景概念设计',
    content: '请描述一个[类型]（如科幻、奇幻、现代等）场景的概念设计。场景是[场景简述]，时间是[时间]，关键视觉元素包括[元素列表]。场景的氛围应该是[氛围]，光照条件是[光照]。',
    category: '视觉设计'
  },
  {
    title: '海报设计',
    content: '请设计一张宣传[活动/产品/电影等]的海报。海报的目标是[目标]，主要受众是[受众]。核心信息包括[信息列表]，视觉风格应该是[风格]。构图应该如何安排，文字与图像的关系如何处理？',
    category: '视觉设计'
  },
  {
    title: '纹理和图案设计',
    content: '请设计一种可用于[应用场景]的无缝纹理/图案。风格应该是[风格]，主题围绕[主题]。图案应包含[元素]，色彩方案以[颜色]为主。图案的复杂度应该[复杂度级别]，适合[应用方式]。',
    category: '视觉设计'
  },
  {
    title: '排版设计',
    content: '请为[内容类型]设计排版方案。内容的主题是[主题]，目标受众是[受众]。需要考虑字体选择、字体大小、行间距、段落布局等元素。整体风格应该是[风格]，重点强调[重点内容]。',
    category: '视觉设计'
  },
  {
    title: '信息图表设计',
    content: '请设计一个关于[主题]的信息图表。需要呈现的关键数据/信息点包括[数据点列表]。目标受众是[受众]，目的是[目的]。风格应该简洁明了，使用[颜色方案]，确保数据可视化直观且易于理解。',
    category: '视觉设计'
  },
  {
    title: '环境光效描述',
    content: '请描述一个[场景]中的光影效果。时间是[时间]（如黄昏、正午等），天气条件是[天气]。光源包括[光源列表]，主要的光影交互发生在[位置/物体]。描述应包含颜色、强度、方向和情绪效果。',
    category: '视觉设计'
  },
  {
    title: '动画场景过渡',
    content: '请描述从场景A（[场景A描述]）过渡到场景B（[场景B描述]）的动画效果。过渡应该反映[情感/主题变化]，可以使用[技术/效果]。过渡的速度和节奏应该是[速度/节奏]，持续时间约为[时长]秒。',
    category: '视觉设计'
  },
  {
    title: '颜色方案设计',
    content: '请为[项目类型]设计一个颜色方案。项目的目标受众是[受众]，要传达的情感/信息是[情感/信息]。方案应包含主色、辅助色、强调色和中性色。每种颜色的选择理由是什么？它们如何协同工作？',
    category: '视觉设计'
  },
  {
    title: '3D模型概念',
    content: '请描述一个[主题]的3D模型概念。模型将用于[用途]，风格应该是[风格]。关键特征包括[特征列表]，材质应该如何处理？表面细节应该关注哪些方面？模型的比例和维度大约是[尺寸]。',
    category: '视觉设计'
  },
  {
    title: '服装设计',
    content: '请设计一套适合[场合/角色]的服装。风格应该是[风格]，时代背景是[时代]。服装应该反映穿着者的[特性/身份]，主要材质包括[材质列表]，配色方案以[颜色]为主。请详细描述服装的各个部分。',
    category: '视觉设计'
  },
  {
    title: '环境设计',
    content: '请设计一个[类型]环境的内部/外部空间。空间的功能是[功能]，风格是[风格]。关键设计元素包括[元素列表]，材质主要使用[材质]，照明方案是[照明描述]。空间应该给人[情感反应]的感觉。',
    category: '视觉设计'
  },
  {
    title: '概念艺术风景',
    content: '请描述一幅[类型]风景的概念艺术。场景是[场景]，时间是[时间]，天气条件是[天气]。关键景观元素包括[元素列表]，色彩基调是[色彩]，氛围应该传达[情感/主题]。构图应该如何安排？',
    category: '视觉设计'
  },
  {
    title: '用户界面动效',
    content: '请描述[界面元素]的动画效果。当用户[交互动作]时，界面应该如何响应？动画的风格是[风格]（如流畅、弹性、几何等），持续时间是[时长]秒。动画应该传达什么信息/情感？它如何提升用户体验？',
    category: '视觉设计'
  },
  {
    title: '书籍/杂志封面',
    content: '请设计一本[类型]书籍/杂志的封面。书名是[书名]，作者/出版商是[作者/出版商]。封面应该反映内容的[主题/基调]，目标读者是[读者群体]。视觉风格应该是[风格]，主要视觉元素包括[元素列表]。',
    category: '视觉设计'
  },
  {
    title: '品牌视觉识别',
    content: '请为名为[品牌名]的[行业]品牌创建视觉识别系统。品牌价值观是[价值观]，目标受众是[受众]。视觉系统应包括：标志、配色方案、字体选择、主要图形元素和应用示例。整体风格应该是[风格]。',
    category: '视觉设计'
  }
];

// 商业助手提示词
const businessPrompts = [
  {
    title: '商业计划书',
    content: '请帮我起草一份关于[产品/服务]的商业计划书摘要。包括：1) 执行摘要（概述业务理念、使命和目标） 2) 市场分析（目标市场、规模、竞争对手） 3) 产品/服务描述 4) 营销策略 5) 财务预测摘要（投资需求、预期回报） 6) 团队介绍。',
    category: '商业助手'
  },
  {
    title: '市场调研报告',
    content: '请为[产品/服务/行业]创建一份市场调研报告大纲。报告应涵盖：1) 行业概览和趋势 2) 目标市场分析（规模、增长率、特点） 3) 竞争对手分析（主要竞争者、优劣势、市场份额） 4) 消费者需求和行为分析 5) 进入市场的机会和挑战 6) 建议的市场定位策略。',
    category: '商业助手'
  },
  {
    title: '营销策略制定',
    content: '请为[产品/服务]设计一份全面的营销策略。目标受众是[受众描述]，核心价值主张是[价值主张]。策略应包括：1) 品牌定位 2) 内容营销方向 3) 社交媒体策略 4) 广告投放建议 5) 合作与联名机会 6) 效果衡量指标。预算约为[预算范围]。',
    category: '商业助手'
  },
  {
    title: '销售话术模板',
    content: '请为销售[产品/服务]创建一套销售话术模板。目标客户是[客户类型]，他们的主要痛点是[痛点]。话术应包括：1) 开场白 2) 价值陈述 3) 产品/服务介绍 4) 处理常见异议的回应 5) 成功案例分享 6) 促成交易的话术。语气应该是[语气类型]（如专业、友好、权威等）。',
    category: '商业助手'
  },
  {
    title: '商业演讲稿',
    content: '请为即将在[场合]（如投资路演、产品发布会、行业峰会等）进行的商业演讲撰写一份演讲稿。演讲主题是[主题]，时长约[分钟]分钟，目标听众是[听众]。演讲应包括引人入胜的开场白、核心信息、数据支持、故事元素和有力的结束语。',
    category: '商业助手'
  },
  {
    title: '品牌故事构建',
    content: '请帮我构建[品牌名]的品牌故事。品牌的核心价值是[价值观]，目标受众是[受众]。故事应包括：1) 创立背景和初衷 2) 面临的挑战与转折点 3) 品牌的独特之处 4) 与客户建立的情感连接 5) 未来愿景。风格应该是[风格]（如真实感人、鼓舞人心等）。',
    category: '商业助手'
  },
  {
    title: '客户调查问卷',
    content: '请为[业务类型]设计一份客户调查问卷。调查目的是[目的]（如满意度评估、需求调研等）。问卷应包括多种类型的问题（如选择题、评分题、开放式问题），涵盖[主题领域]。问题应简洁明了，避免引导性语言，问卷完成时间控制在[时长]分钟内。',
    category: '商业助手'
  },
  {
    title: '产品说明书',
    content: '请为[产品名称]撰写一份全面的产品说明书。产品类型是[类型]，目标用户是[用户]。说明书应包括：1) 产品概述和主要优势 2) 技术规格和参数 3) 使用指南和最佳实践 4) 常见问题解答 5) 保修和支持信息。语言应专业但易于理解，可适当使用图表说明。',
    category: '商业助手'
  },
  {
    title: '竞争对手分析',
    content: '请提供一份[行业/产品类别]的主要竞争对手分析。分析应包括：1) 各竞争者的市场定位和目标受众 2) 产品/服务的主要特点和差异 3) 定价策略比较 4) 营销和品牌策略 5) 优劣势(SWOT)分析 6) 市场份额估计 7) 可学习的经验和机会。',
    category: '商业助手'
  },
  {
    title: '投资者沟通邮件',
    content: '请撰写一封发送给现有/潜在投资者的邮件，更新[公司/项目名称]的最新进展。邮件应包括：1) 简短热情的开场白 2) 关键业务指标和成就 3) 产品/服务进展 4) 市场反馈概述 5) 未来规划和机会 6) 资金使用情况（如适用）7) 下一步沟通计划。语调应专业、透明且充满信心。',
    category: '商业助手'
  },
  {
    title: '社交媒体内容计划',
    content: '请为[品牌/产品]制定一个月的社交媒体内容计划。目标平台是[平台列表]，主要受众是[受众描述]。计划应包括：1) 每周内容主题 2) 不同类型内容的分配（如教育内容、娱乐内容、促销内容等）3) 发布频率和最佳时间 4) 互动策略 5) 关键绩效指标。还请提供5个具体的内容创意示例。',
    category: '商业助手'
  },
  {
    title: '客户旅程地图',
    content: '请为[产品/服务]创建一个客户旅程地图框架。从客户首次了解到成为忠实用户的全过程。地图应包括：1) 旅程的各个阶段（认知、考虑、购买、使用、忠诚等）2) 每个阶段的客户目标和期望 3) 接触点和渠道 4) 客户可能的情感反应 5) 痛点和机会 6) 改进建议。',
    category: '商业助手'
  },
  {
    title: '商业谈判策略',
    content: '请提供一份关于即将与[对方]进行的[谈判主题]谈判的策略指导。分析应包括：1) 对方可能的立场和利益点 2) 我方的目标和底线 3) 潜在的让步空间 4) 谈判开场策略 5) 应对强硬态度的技巧 6) 寻找双赢的方向 7) 谈判后续行动建议。',
    category: '商业助手'
  },
  {
    title: '商业问题解决框架',
    content: '请针对[业务问题]提供一个结构化的问题解决框架。问题的背景是[背景描述]。框架应包括：1) 问题定义和分解 2) 数据收集和分析方向 3) 假设生成 4) 解决方案构思 5) 解决方案评估标准 6) 实施计划要点 7) 成功衡量指标。使用商业分析的专业方法（如5W1H、MECE等）。',
    category: '商业助手'
  },
  {
    title: '专业简历优化',
    content: '我的职业背景是[行业/职位]，有[年数]年经验，主要成就包括[成就简述]。请帮我优化简历，应对[目标职位]的申请。简历应强调相关技能和成就，使用有力的行动动词，突出量化成果，并确保格式专业一致。请提供一个简历摘要和关键工作经历的描述示例。',
    category: '商业助手'
  },
  {
    title: '业务扩展策略',
    content: '请为[企业名称]制定业务扩展策略。当前业务是[业务描述]，目标是[扩展目标]。策略应考虑：1) 地理扩张vs产品/服务多元化 2) 自然增长vs并购 3) 所需资源和能力 4) 风险评估和缓解措施 5) 时间表和里程碑 6) 关键成功指标。',
    category: '商业助手'
  },
  {
    title: '客户反馈分析框架',
    content: '请提供一个系统分析[产品/服务]客户反馈的框架。我们收集了[反馈类型]（如App评论、客服记录、社交媒体评论等）。分析应包括：1) 反馈分类方法 2) 定量和定性分析方法 3) 优先级确定标准 4) 从反馈到行动的转化流程 5) 持续监控机制。',
    category: '商业助手'
  },
  {
    title: '企业文化声明',
    content: '请帮助撰写[公司名称]的企业文化声明。我们是一家[行业]公司，核心业务是[业务]，我们的价值观包括[价值观列表]。文化声明应包括：1) 使命和愿景 2) 核心价值观及其行为表现 3) 工作环境描述 4) 团队合作方式 5) 成功的定义。语言应鼓舞人心且真实。',
    category: '商业助手'
  },
  {
    title: '定价策略分析',
    content: '请为[产品/服务]制定定价策略。产品成本约为[成本]，目标市场是[市场描述]，主要竞争对手的价格在[价格范围]。分析应包括：1) 可行的定价模式（如成本加成、价值定价、订阅制等）2) 不同价格点的优缺点 3) 心理定价考虑 4) 促销和折扣策略 5) 长期定价策略。',
    category: '商业助手'
  },
  {
    title: '公司季度报告',
    content: '请为[公司名称]起草一份面向[内部团队/董事会/投资者]的季度业务报告框架。报告应涵盖：1) 执行摘要 2) 财务表现概览（关键指标，同比/环比对比）3) 部门/产品线表现 4) 市场发展和竞争动态 5) 挑战和风险 6) 下季度优先事项和目标。',
    category: '商业助手'
  }
];

// 学术研究提示词
const academicPrompts = [
  {
    title: '研究问题优化',
    content: '我正在[学科领域]进行研究，我的初步研究问题是"[初步研究问题]"。请帮我评估并优化这个研究问题，使其更加明确、可研究且有意义。考虑范围的适当性、概念的清晰度、方法可行性，并提出2-3个改进的研究问题版本。',
    category: '学术研究'
  },
  {
    title: '文献综述大纲',
    content: '请为[研究主题]的文献综述创建一个详细大纲。我的研究方向是[具体方向]，已发现的主要子主题包括[子主题列表]。请提供一个结构化的大纲，包括引言（研究问题和综述目的）、主要章节（按主题或时间顺序组织）、理论框架部分、研究空白识别，以及结论部分的内容建议。',
    category: '学术研究'
  },
  {
    title: '研究方法设计',
    content: '我正在研究[研究主题]，研究问题是"[研究问题]"。请帮我设计一个合适的研究方法。需要考虑：1) 研究范式（定量、定性或混合方法）2) 数据收集策略 3) 样本选择和规模 4) 分析方法 5) 可能的局限性和应对策略 6) 伦理考虑。我偏好[方法偏好，如有]方法。',
    category: '学术研究'
  },
  {
    title: '论文摘要撰写',
    content: '请帮我为一篇关于[研究主题]的学术论文撰写一个结构化摘要。研究方法是[研究方法]，主要发现包括[主要发现]，结论是[结论]。摘要应包括研究背景、目的、方法、结果和结论，总字数控制在250-300字之间。风格应符合[学科领域]的学术标准。',
    category: '学术研究'
  },
  {
    title: '研究假设生成',
    content: '基于[理论框架]和关于[研究主题]的现有文献，请帮我生成3-5个可测试的研究假设。这些假设应该与我的研究问题"[研究问题]"相关，明确指出变量间的预期关系，并具有理论基础。每个假设后请简要解释其理论依据。',
    category: '学术研究'
  },
  {
    title: '问卷设计指导',
    content: '我需要设计一份问卷来研究[研究主题]。目标人群是[目标人群]，主要研究变量包括[变量列表]。请提供问卷设计建议，包括：1) 问卷结构 2) 关键构念的操作化方法 3) 适合的量表类型 4) 5-8个核心问题示例 5) 可能的偏差来源及如何减少。风格应该是[风格要求]。',
    category: '学术研究'
  },
  {
    title: '学术论点构建',
    content: '请帮我构建一个关于"[论题]"的学术论点。我的初步立场是[立场]。请提供一个结构化的论点框架，包括：1) 核心主张 2) 支持证据（理论和实证） 3) 潜在反驳意见 4) 对反驳的回应 5) 结论及其意义。论点应基于[学科领域]的学术理论和研究。',
    category: '学术研究'
  },
  {
    title: '研究数据分析计划',
    content: '我在[研究项目]中收集了以下数据：[数据描述]。研究问题是"[研究问题]"。请帮我设计一个数据分析计划，包括：1) 适当的统计分析方法 2) 所需的预处理步骤 3) 变量的操作化方式 4) 如何处理缺失数据和异常值 5) 结果验证方法 6) 可能的进一步分析。我使用[软件]进行分析。',
    category: '学术研究'
  },
  {
    title: '理论框架构建',
    content: '请为我的研究"[研究主题]"构建一个理论框架。相关的理论包括[相关理论列表]。请描述：1) 如何整合这些理论以解释我的研究现象 2) 主要概念及其关系 3) 理论假设 4) 该框架如何指导实证研究设计 5) 该框架的潜在贡献和局限性。',
    category: '学术研究'
  },
  {
    title: '学术演讲准备',
    content: '我需要准备一个20分钟的学术演讲，主题是"[演讲主题]"，听众是[听众描述]。请帮我设计演讲结构，包括：1) 引人入胜的开场 2) 核心内容组织（3-5个关键点） 3) 视觉辅助建议 4) 互动环节设计 5) 有效的结束语 6) 可能的问答准备。风格应该是[风格]。',
    category: '学术研究'
  },
  {
    title: '研究结果讨论',
    content: '我的研究"[研究主题]"得出了以下主要结果：[研究结果]。请帮我编写一个研究讨论部分，包括：1) 结果解释及与研究问题的联系 2) 与现有文献的比较（支持和矛盾之处） 3) 结果的理论意义 4) 实践应用价值 5) 研究局限性 6) 未来研究方向。',
    category: '学术研究'
  },
  {
    title: '研究格式规范化',
    content: '请根据[引用格式]（如APA、MLA、Chicago等）规范，帮我格式化以下参考文献：[参考文献原始信息]。另外，请提供在文内引用这些文献的正确格式示例，包括直接引用和间接引用的情况。',
    category: '学术研究'
  },
  {
    title: '研究伦理审查准备',
    content: '我的研究项目"[研究项目]"需要通过伦理审查。研究方法涉及[研究方法描述]，参与者是[参与者描述]。请帮我梳理需要在伦理审查申请中考虑的关键问题，包括：1) 潜在风险及缓解措施 2) 知情同意过程设计 3) 数据保密和隐私保护 4) 特殊群体保护措施（如适用） 5) 利益冲突管理。',
    category: '学术研究'
  },
  {
    title: '案例研究分析框架',
    content: '我正在对[案例主题]进行案例研究。请提供一个分析该案例的结构化框架，包括：1) 背景分析维度 2) 核心问题识别方法 3) 利益相关者分析 4) 可选方案评估标准 5) 因果关系分析方法 6) 结论和启示提取。分析应基于[学科领域]的理论视角。',
    category: '学术研究'
  },
  {
    title: '学术概念解析',
    content: '请详细解析[学术概念]这一概念。包括：1) 概念的起源和发展历史 2) 主要理论家的不同定义 3) 核心组成元素 4) 与相关概念的区别和联系 5) 在[学科领域]中的应用 6) 当前学术争议 7) 评估和测量该概念的方法。请提供关键参考文献。',
    category: '学术研究'
  },
  {
    title: '实验设计优化',
    content: '我正设计一个关于[研究主题]的实验，初步设计如下：[初步实验设计]。请帮我评估并优化这个设计，考虑：1) 内部和外部效度 2) 潜在混淆变量控制 3) 操纵和测量的有效性 4) 样本规模和统计功效 5) 可能的替代设计。推荐的改进应该平衡科学严谨性和实际可行性。',
    category: '学术研究'
  },
  {
    title: '学术评价框架',
    content: '请提供一个框架，用于评价[学科领域]中的学术文章。评价标准应包括：1) 研究问题的价值和明确性 2) 文献综述的全面性和批判性 3) 理论框架的适当性 4) 研究方法的严谨性 5) 结果的可信度和解释的合理性 6) 贡献的原创性和意义 7) 写作的清晰度和结构。',
    category: '学术研究'
  },
  {
    title: '研究资金申请指导',
    content: '我计划向[资助机构]申请关于[研究主题]的研究资金。请提供一个成功申请的框架，包括：1) 项目摘要的关键元素 2) 研究意义的有效表达方式 3) 方法学部分的详细程度 4) 预期成果和影响力的描述策略 5) 预算和时间线的合理编排 6) 申请书修改的核心检查点。',
    category: '学术研究'
  },
  {
    title: '学术批判性分析',
    content: '请对以下学术观点进行批判性分析："[学术观点]"。分析应包括：1) 该观点的核心主张和假设 2) 支持该观点的证据评估 3) 逻辑推理的评价 4) 潜在的反面论据 5) 理论和方法论局限性 6) 替代解释或框架 7) 该观点在当前学术环境中的地位。',
    category: '学术研究'
  },
  {
    title: '跨学科研究整合',
    content: '我正在进行一项结合[学科A]和[学科B]的跨学科研究，研究主题是[研究主题]。请帮我：1) 识别两个学科中的相关理论和概念 2) 分析这些理论的兼容性和矛盾点 3) 提出整合框架 4) 建议适合跨学科研究的方法 5) 讨论整合的潜在创新点和挑战。',
    category: '学术研究'
  }
];

// 开发编程提示词
const developmentPrompts = [
  {
    title: '代码优化',
    content: '请帮我优化以下[语言]代码，提高其性能和可读性：```[代码块]```。分析应包括：1) 当前代码的性能瓶颈 2) 可能的内存泄漏或资源使用问题 3) 设计模式应用建议 4) 算法复杂度改进 5) 代码可读性和维护性增强。请提供优化后的代码和解释每项改进的原因。',
    category: '开发编程'
  },
  {
    title: '函数重构',
    content: '请重构以下[语言]函数，使其更加模块化、可测试和符合最佳实践：```[函数代码]```。重构应考虑：1) 单一职责原则 2) 依赖注入 3) 错误处理改进 4) 命名规范 5) 注释完善 6) 测试友好性。请提供重构后的代码并解释您的决策理由。',
    category: '开发编程'
  },
  {
    title: 'API设计指南',
    content: '我正在为[项目/服务描述]设计一个RESTful/GraphQL API。主要资源/实体包括[实体列表]，核心功能需求是[功能需求]。请提供API设计指南，包括：1) 端点结构和命名规范 2) 请求/响应格式 3) 认证和授权策略 4) 错误处理标准 5) 版本控制方法 6) 性能和缓存考虑 7) 文档要求。',
    category: '开发编程'
  },
  {
    title: '数据库架构设计',
    content: '我需要为[应用描述]设计数据库架构。主要实体包括[实体列表]，关键功能需求是[功能需求]，预计数据量和访问模式是[数据量/访问描述]。请提供：1) 适合的数据库类型(SQL/NoSQL)选择理由 2) 表/集合设计 3) 关系和索引策略 4) 分区考虑 5) 查询优化建议 6) 扩展性设计。',
    category: '开发编程'
  },
  {
    title: '单元测试编写',
    content: '请为以下[语言]代码编写单元测试：```[代码块]```。测试应该使用[测试框架]，覆盖正常流程、边界条件和异常情况。请包括：1) 测试设置 2) 模拟(Mock)策略 3) 断言方法 4) 测试组织结构 5) 代码覆盖率考虑。特别关注[特定功能或方法]的测试。',
    category: '开发编程'
  },
  {
    title: '调试策略',
    content: '我在[语言/框架]项目中遇到以下错误：```[错误信息]```。相关代码片段是：```[代码片段]```。请提供一个系统的调试策略，包括：1) 可能的错误原因分析 2) 调试工具和技术建议 3) 日志检查方向 4) 问题隔离方法 5) 验证修复的步骤。我的环境是[环境描述]。',
    category: '开发编程'
  },
  {
    title: '系统架构设计',
    content: '请为[应用/系统描述]设计一个可扩展、高可用的系统架构。需求包括：[功能需求列表]，非功能需求有[非功能需求]。预期用户量和增长是[用户数据]。请提供：1) 高层架构图 2) 关键组件和交互 3) 数据流设计 4) 扩展策略 5) 故障恢复机制 6) 安全考虑 7) 监控方案。',
    category: '开发编程'
  },
  {
    title: '代码审查清单',
    content: '请为[语言/框架]项目创建一个详细的代码审查清单。审查应关注：1) 代码质量和可读性 2) 潜在bug和边缘情况 3) 性能考虑 4) 安全漏洞 5) 设计模式应用 6) 测试覆盖 7) 文档完整性。请针对每个类别提供具体的检查项目和示例问题，以及可能的自动化工具建议。',
    category: '开发编程'
  },
  {
    title: '微服务设计',
    content: '我需要将一个[应用描述]的单体应用分解为微服务架构。核心功能包括[功能列表]。请提供微服务分解策略，包括：1) 服务边界识别方法 2) 建议的服务划分 3) 服务通信模式 4) 数据一致性策略 5) 部署和运维考虑 6) 服务发现和配置管理 7) 监控和跟踪方案。',
    category: '开发编程'
  },
  {
    title: '性能优化指南',
    content: '我的[类型]应用在[场景]下存在性能问题。具体表现为[性能问题描述]。使用的技术栈是[技术栈]。请提供一个系统的性能优化指南，包括：1) 性能指标和基准测试方法 2) 可能的瓶颈分析 3) 前端/后端/数据库层面的优化策略 4) 缓存使用建议 5) 异步和并行处理机会 6) 资源优化方案。',
    category: '开发编程'
  },
  {
    title: '安全评估清单',
    content: '请为一个[类型]应用提供安全评估清单，该应用使用[技术栈]，处理[数据类型]数据。评估应涵盖：1) 认证和授权机制 2) 数据验证和清理 3) 敏感数据处理 4) 加密策略 5) API安全 6) 依赖项安全 7) 部署和基础设施安全 8) 合规考虑。请针对每个类别提供具体检查项和修复建议。',
    category: '开发编程'
  },
  {
    title: '设计模式应用',
    content: '我正在开发一个[功能/组件描述]，使用[语言/框架]。核心需求是[需求描述]。请推荐适合的设计模式，包括：1) 为什么这个模式适合该问题 2) 如何在当前技术栈中实现 3) 示例代码骨架 4) 与其他可能方案的比较 5) 实施过程中的注意事项 6) 测试策略。',
    category: '开发编程'
  },
  {
    title: 'Docker容器化',
    content: '请提供将[应用类型]应用Docker容器化的指南。应用使用[技术栈]，有以下依赖项：[依赖项列表]。指南应包括：1) 基础镜像选择理由 2) Dockerfile内容 3) 多阶段构建策略 4) 环境变量和配置管理 5) 存储和数据持久化 6) 网络配置 7) 安全最佳实践 8) Docker Compose设置(如适用)。',
    category: '开发编程'
  },
  {
    title: 'CI/CD流程设计',
    content: '请为[项目类型]设计一个完整的CI/CD流程。项目使用[技术栈]，团队规模为[团队描述]。设计应包括：1) 代码仓库和分支策略 2) 构建自动化步骤 3) 自动化测试策略 4) 代码质量检查 5) 部署流程(包括环境管理) 6) 回滚机制 7) 监控和反馈 8) 适合的工具链建议。',
    category: '开发编程'
  },
  {
    title: '技术债务分析',
    content: '请帮我分析以下[项目/代码库]中的技术债务：[代码/架构描述]。分析应包括：1) 代码质量问题识别 2) 架构缺陷和限制 3) 过时依赖和技术 4) 性能瓶颈 5) 测试覆盖率缺口 6) 文档不足。请提供优先级排序的技术债务清单，每项包括影响评估和建议的修复方法。',
    category: '开发编程'
  },
  {
    title: '需求分析和用户故事',
    content: '基于以下需求描述：[需求描述]，请帮我创建详细的用户故事和技术需求规格。输出应包括：1) 主要用户角色定义 2) 用户故事(按"作为[角色]，我想要[功能]，以便[价值]"格式) 3) 验收标准 4) 非功能需求 5) 技术限制和假设 6) 依赖项和风险 7) 优先级建议。',
    category: '开发编程'
  },
  {
    title: '前端组件设计',
    content: '请为[应用类型]设计一个[组件描述]前端组件。技术栈是[前端框架]，设计系统使用[UI库/设计系统]。需求包括：[功能需求]。设计应包括：1) 组件API和属性 2) 状态管理方案 3) 响应式/自适应考虑 4) 无障碍设计 5) 性能优化策略 6) 组件测试方法 7) 示例代码实现。',
    category: '开发编程'
  },
  {
    title: '代码文档模板',
    content: '请为[语言/框架]项目创建一个全面的代码文档模板。该项目是[项目描述]，面向的开发者是[目标开发者]。文档应涵盖：1) 项目概述和架构 2) 安装和环境设置 3) API参考格式 4) 代码示例标准 5) 模块/类/函数文档结构 6) 疑难解答部分 7) 贡献指南 8) 版本控制和发布说明标准。',
    category: '开发编程'
  },
  {
    title: '数据处理管道设计',
    content: '请设计一个数据处理管道，用于[数据处理需求]。数据源是[数据源描述]，数据量约为[数据量]，处理频率是[频率]。设计应包括：1) 数据获取和集成策略 2) 清洗和转换步骤 3) 处理逻辑和算法 4) 存储方案 5) 错误处理和恢复机制 6) 监控和日志记录 7) 扩展和性能考虑 8) 适合的技术栈建议。',
    category: '开发编程'
  },
  {
    title: '第三方API集成',
    content: '我需要将[第三方服务]集成到我的[应用类型]中，实现[功能需求]。请提供集成指南，包括：1) API认证和授权流程 2) 端点调用和数据格式 3) 错误处理策略 4) 速率限制和性能考虑 5) 测试和模拟方法 6) 数据映射和转换 7) 监控和日志记录 8) 代码示例和实施步骤。',
    category: '开发编程'
  }
];

// 提示词数据
const promptsData = {
  creativeWriting: creativeWritingPrompts,
  visualDesign: visualDesignPrompts,
  business: businessPrompts,
  academic: academicPrompts,
  development: developmentPrompts,
};

// 过滤提示词
const filteredPrompts = computed(() => {
  const result = {};
  
  for (const category in promptsData) {
    result[category] = promptsData[category].filter(prompt => 
      prompt.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      prompt.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  return result;
});

// 复制到剪贴板
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('提示词已复制到剪贴板');
    })
    .catch(err => {
      console.error('复制失败: ', err);
    });
};

// 显示提示词详情
const showPromptDetail = (prompt) => {
  selectedPrompt.value = prompt;
};
</script>
