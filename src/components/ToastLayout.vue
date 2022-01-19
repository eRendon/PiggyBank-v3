<template>
  <!--Toast-->
  <transition
      enter-from-class="translate-x-full"
      enter-active-class="transition ease-in-out duration-300 transform"
      enter-to-class="-translate-x-0"
      leave-from-class="-translate-x-0"
      leave-active-class="transition ease-in-out duration-300 transform"
      leave-to-class="translate-x-full"
  >
    <div v-if="toastState.isToastActive" style="z-index: 1050" class="alert-toast bottom-0  fixed right-0 m-8 w-5/6 md:w-full max-w-sm">

      <div :class="{'bg-green-500 border-green-700': toastState.state === 'success', 'bg-red-500 border-red-700' : toastState.state === 'error' }"
           class="flex items-center border-l-4 cursor-pointer py-2 px-3 shadow-md mb-2">
        <!-- icons -->
        <div v-if="toastState.state === 'error'"
             class="text-red-500 rounded-full bg-white mr-3">
          <!-- Heroicon name: outline/exclamation -->
          <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"></path>
            <path fill-rule="evenodd"
                  d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"></path>
          </svg>
        </div>
        <div v-if="toastState.state === 'success'" class="text-green-500 rounded-full bg-white mr-3">
          <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"></path>
          </svg>
        </div>
        <!-- message -->
        <div class="text-white max-w-xs ">
          {{ toastState.text }}
        </div>
      </div>

    </div>
  </transition>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { toastStore } from '../store'
import { IToastState } from '../interfaces/IModalsState'

const toastState = computed<IToastState>(() => toastStore.getters.getStateToast())
</script>
<style></style>