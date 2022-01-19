<template>
  <div class="flex h-screen overflow-y-hidden bg-white" x-data="setup()" x-init="$refs.loading.classList.add('hidden')">
    <!-- Loading screen -->
    <div
        v-if="loading"
        class="fixed inset-0 z-50 flex items-center justify-center text-white bg-black bg-opacity-50"
        style="backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px)"
    >
      Loading.....
    </div>

    <!-- Sidebar backdrop -->
    <div
        v-if="loading"
        class="fixed inset-0 z-10 bg-black bg-opacity-20 lg:hidden"
        style="backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px)"
    ></div>


    <div class="flex flex-col flex-1 h-full overflow-hidden">
      <!-- Navbar -->
      <Header/>
      <!-- Main content -->
      <main class="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
        <!-- Main content header -->
        <div
            class="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row"
        >
          <h1 class="text-2xl font-semibold whitespace-nowrap">Piggy Bank</h1>
        </div>

        <!-- Start Content -->
        <router-view></router-view>
      </main>
    </div>



<modal></modal>
<toast></toast>

  </div>
</template>

<script setup lang="ts">
import Header from '../components/HeaderLayout.vue'

import { onMounted, ref } from 'vue'

const loading = ref(false)

onMounted(() => {
  loading.value = false
})

</script>

<style scoped>

</style>