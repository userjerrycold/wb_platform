<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <AuroraBackground>
      <div class="relative min-h-screen flex items-center justify-center px-4">
        <!-- Particle Effect Container -->
        <div class="absolute inset-0" ref="particleContainer"></div>
        
        <!-- Login Form -->
        <Motion
          as="div"
          :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
          :in-view="{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }"
          :transition="{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }"
          class="relative w-[45vw] max-w-[1200px] p-10 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-2xl"
        >
          <div class="text-center mb-10">
            <h1 class="text-5xl font-bold text-gray-800 dark:text-white font-serif tracking-wide mb-4">
              欢迎回来
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300">
              请登录您的账号
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6 max-w-3xl mx-auto px-6">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                用户名
              </label>
              <input
                v-model="username"
                type="text"
                class="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base"
                placeholder="请输入用户名"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                密码
              </label>
              <input
                v-model="password"
                type="password"
                class="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base"
                placeholder="请输入密码"
              />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center cursor-pointer" @click="toggleRememberMe">
                <input
                  type="checkbox"
                  v-model="rememberMe"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  记住我
                </label>
              </div>
              <a @click="showForgotPassword" class="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 cursor-pointer">
                忘记密码？
              </a>
            </div>

            <button
              type="submit"
              class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              登录
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              还没有账号？
              <a @click="showRegister" class="text-blue-600 hover:text-blue-500 dark:text-blue-400 cursor-pointer">
                立即注册
              </a>
            </p>
          </div>
        </Motion>
      </div>
    </AuroraBackground>

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">忘记密码</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">请联系管理员！</p>
        <button @click="closeForgotPassword" class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          确定
        </button>
      </div>
    </div>

    <!-- Register Modal -->
    <div v-if="showRegisterModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold mb-6 text-gray-900 dark:text-white">注册账号</h3>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">用户名</label>
            <input v-model="registerForm.username" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">密码</label>
            <input v-model="registerForm.password" type="password" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">确认密码</label>
            <input v-model="registerForm.confirmPassword" type="password" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700" required />
          </div>
          <div class="flex gap-4 mt-6">
            <button type="button" @click="closeRegister" class="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              取消
            </button>
            <button type="submit" class="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              注册
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AuroraBackground from '../components/AuroraBackground.vue';
import { Motion } from "motion-v";
import { useRouter } from 'vue-router';
import { useParticles } from '../composables/useParticles';

const router = useRouter();
const particleContainer = ref(null);
const username = ref('admin');
const password = ref('123');
const rememberMe = ref(false);
const showForgotPasswordModal = ref(false);
const showRegisterModal = ref(false);
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
});

// Initialize particles
onMounted(() => {
  if (particleContainer.value) {
    useParticles(particleContainer.value);
  }
});

const toggleRememberMe = () => {
  rememberMe.value = !rememberMe.value;
};

const showForgotPassword = () => {
  showForgotPasswordModal.value = true;
};

const closeForgotPassword = () => {
  showForgotPasswordModal.value = false;
};

const showRegister = () => {
  showRegisterModal.value = true;
};

const closeRegister = () => {
  showRegisterModal.value = false;
};

const handleRegister = () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('两次输入的密码不一致');
    return;
  }
  // 模拟注册成功
  alert('注册成功！');
  showRegisterModal.value = false;
  // 清空注册表单
  registerForm.value = {
    username: '',
    password: '',
    confirmPassword: ''
  };
};

const handleLogin = () => {
  if (username.value === 'admin' && password.value === '123') {
    router.push('/home');
  } else {
    alert('用户名或密码错误');
  }
};
</script>

<style scoped>
.backdrop-blur-lg {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style> 