<template>
  <header class="flex-shrink-0 border-b">
    <div class="flex items-center justify-between p-2">

      <!-- Desktop search box -->
      <div class="items-center hidden px-2 space-x-2 lg:flex-1 lg:flex lg:mr-auto md:ml-5">
        <!-- search icon -->
        <span>
                <svg
                    class="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
        <input
            type="text"
            placeholder="Search"
            class="px-4 py-3 rounded-md hover:bg-gray-100 lg:max-w-sm md:py-2 md:flex-1 focus:outline-none md:focus:bg-gray-100 md:focus:shadow md:focus:border"
        />
      </div>
      <div class="items-center hidden px-2 space-x-2 lg:flex-1 lg:flex lg:mr-auto md:ml-5">
        <!-- search icon -->

        <input
            disabled
            type="text"
            :placeholder="sessionStore.state.address"
            class="px-4 py-3 rounded-md hover:bg-gray-100 lg:max-w-sm md:py-2 md:flex-1 focus:outline-none md:focus:bg-gray-100 md:focus:shadow md:focus:border"
        />
      </div>

      <!-- Navbar right -->
      <div class="relative flex items-center space-x-3">
        <!-- Search button -->
        <button
            @click="isSearchBoxOpen = true"
            class="p-2 bg-gray-100 rounded-full lg:hidden focus:outline-none focus:ring hover:bg-gray-200"
        >
          <svg
              class="w-6 h-6 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        <div class="items-center hidden space-x-3 md:flex lg:flex">
          <!-- Notification Buttons -->
          <div class="relative">
            <!-- red dot -->
            <div class="absolute right-0 p-1 bg-red-400 rounded-full animate-ping"></div>
            <div class="absolute right-0 p-1 bg-red-400 border rounded-full"></div>
            <button
                @click="isOpenNotification = !isOpenNotification"
                class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring"
            >
              <svg
                  class="w-6 h-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            <!-- Dropdown card -->
            <div
                @click="isOpenNotification = false"
                v-show="isOpenNotification"
                class="absolute w-48 max-w-md mt-3 transform bg-white rounded-md shadow-lg -translate-x-3/4 min-w-max"
            >
              <div class="p-4 font-medium border-b">
                <span class="text-gray-800">Notification</span>
              </div>
              <ul class="flex flex-col p-2 my-2 space-y-1">
                <li>
                  <a href="#" class="block px-2 py-1 transition rounded-md hover:bg-gray-100">Link</a>
                </li>
                <li>
                  <a href="#" class="block px-2 py-1 transition rounded-md hover:bg-gray-100">Another Link</a>
                </li>
              </ul>
              <div class="flex items-center justify-center p-4 text-blue-700 underline border-t">
                <a href="#">See All</a>
              </div>
            </div>
          </div>

          <!-- Services Buttons -->
          <div>
            <button
                @click="isDropDownOpen = !isDropDownOpen"
                class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring"
            >
              <svg
                  class="w-6 h-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>

            <!-- Dropdown -->
            <div
                @click="isDropDownOpen = false"
                @keydown.esc="isDropDownOpen = false"
                v-show="isDropDownOpen"
                class="absolute mt-3 transform bg-white rounded-md shadow-lg -translate-x-3/4 min-w-max"
            >
              <div class="p-4 text-lg font-medium border-b">Web apps & services</div>
              <ul class="flex flex-col p-2 my-3 space-y-3">
                <li>
                  <a href="#" class="flex items-start px-2 py-1 space-x-2 rounded-md hover:bg-gray-100">
                          <span class="block mt-1">
                            <svg
                                class="w-6 h-6 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                              <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path
                                  fill="#fff"
                                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                              />
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                              />
                            </svg>
                          </span>
                    <span class="flex flex-col">
                            <span class="text-lg">Atlassian</span>
                            <span class="text-sm text-gray-400">Lorem ipsum dolor sit.</span>
                          </span>
                  </a>
                </li>
                <li>
                  <a href="#" class="flex items-start px-2 py-1 space-x-2 rounded-md hover:bg-gray-100">
                          <span class="block mt-1">
                            <svg
                                class="w-6 h-6 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                              />
                            </svg>
                          </span>
                    <span class="flex flex-col">
                            <span class="text-lg">Slack</span>
                            <span class="text-sm text-gray-400"
                            >Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span
                            >
                          </span>
                  </a>
                </li>
              </ul>
              <div class="flex items-center justify-center p-4 text-blue-700 underline border-t">
                <a href="#">Show all apps</a>
              </div>
            </div>
          </div>

          <!-- Options Buttons -->
          <div class="relative" v-if="!isConnected">
            <button
                @click="connect"
                class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring"
            >
              <svg
                  class="w-5 h-5 text-gray-500"
                  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve"
              >
              <path d="M459.102,274.658v-66.057c0-21.692-17.647-39.34-39.34-39.34H263.033c1.776-6.602,2.699-13.463,2.699-20.469
			c0-6.653-0.839-13.112-2.404-19.285c14.402,16.775,35.739,27.433,59.531,27.433c43.268,0,78.47-35.201,78.47-78.47
			S366.127,0,322.858,0c-43.269,0-78.47,35.201-78.47,78.47c0,6.653,0.839,13.113,2.404,19.285
			c-14.402-16.775-35.739-27.433-59.531-27.433c-43.268,0-78.469,35.202-78.469,78.47c0,7.005,0.923,13.865,2.699,20.469h-51.4
			c-21.692,0-39.339,17.647-39.339,39.34v264.06c0,21.692,17.647,39.339,39.339,39.339h359.671c21.692,0,39.34-17.647,39.34-39.339
			v-66.057c18.074-2.112,32.148-17.51,32.148-36.141v-59.662C491.251,292.167,477.176,276.769,459.102,274.658z M322.858,33.089
			c25.023,0,45.381,20.358,45.381,45.381s-20.358,45.381-45.381,45.381c-25.023,0-45.381-20.358-45.381-45.381
			S297.835,33.089,322.858,33.089z M187.262,103.41c25.023,0,45.381,20.358,45.381,45.381c0,7.216-1.663,14.172-4.859,20.469H146.74
			c-3.195-6.298-4.859-13.253-4.859-20.469C141.882,123.769,162.239,103.41,187.262,103.41z M426.013,472.66
			c0,3.447-2.804,6.25-6.252,6.25H60.09c-3.447,0-6.25-2.804-6.25-6.25V208.6c0-3.447,2.804-6.252,6.25-6.252
			c7.133,0,351.077,0,359.671,0c3.447,0,6.252,2.804,6.252,6.252v65.802c-10.293,0-106.432,0-116.753,0
			c-19.42,0-35.22,15.8-35.22,35.22c0,13.827,0,56.904,0,62.017c0,19.42,15.8,35.22,35.22,35.22c10.32,0,106.46,0,116.753,0V472.66z
			 M458.162,370.461c0,1.824-1.483,3.308-3.308,3.308c-5.223,0-137.183,0-144.416,0c-1.824,0-3.309-1.483-3.309-3.308v-59.662
			c0-1.824,1.485-3.308,3.309-3.308c7.394,0,139.29,0,144.416,0c1.824,0,3.308,1.484,3.308,3.308V370.461z"/>
                </svg>
            </button>

            <!-- Dropdown card -->
            <div
                @click="isOpen = false"
                v-show="isOpen"
                class="absolute w-40 max-w-sm mt-3 transform bg-white rounded-md shadow-lg -translate-x-3/4 min-w-max"
            >
              <div class="p-4 font-medium border-b">
                <span class="text-gray-800">Options</span>
              </div>
              <ul class="flex flex-col p-2 my-2 space-y-1">
                <li>
                  <a href="#" class="block px-2 py-1 transition rounded-md hover:bg-gray-100">Link</a>
                </li>
                <li>
                  <a href="#" class="block px-2 py-1 transition rounded-md hover:bg-gray-100">Another Link</a>
                </li>
              </ul>
              <div class="flex items-center justify-center p-4 text-blue-700 underline border-t">
                <a href="#">See All</a>
              </div>
            </div>
          </div>
        </div>

        <!-- avatar button -->
        <div class="relative" x-data="{ isOpen: false }">
          <button @click.stop="isDropDownCardOpen = !isDropDownCardOpen" class="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring">
            <img
                class="object-cover w-8 h-8 rounded-full"
                src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                alt="Ahmed Kamel"
            />
          </button>
          <!-- green dot -->
          <div class="absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping"></div>
          <div class="absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3"></div>

          <!-- Dropdown card -->
          <div
              @click="isDropDownCardOpen = false"
              v-show="isDropDownCardOpen"
              class="absolute mt-3 transform -translate-x-full bg-white rounded-md shadow-lg min-w-max"
          >
            <div class="flex flex-col p-4 space-y-1 font-medium border-b">
              <span class="text-gray-800">Ahmed Kamel</span>
              <span class="text-sm text-gray-400">ahmed.kamel@example.com</span>
            </div>
            <ul class="flex flex-col p-2 my-2 space-y-1">
              <li>
                <a href="#" class="block px-2 py-1 transition rounded-md hover:bg-gray-100">Link</a>
              </li>
              <li>
                <a href="#" class="block px-2 py-1 transition rounded-md hover:bg-gray-100">Another Link</a>
              </li>
            </ul>
            <div class="flex items-center justify-center p-4 text-blue-700 underline border-t">
              <a href="#">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { sessionStore } from '../store'

const isSearchBoxOpen = ref(false)
const isOpen = ref(false)

const isOpenNotification = ref(false)
const isDropDownOpen = ref(false)
const isDropDownCardOpen = ref(false)


const connect = async () => {
  await sessionStore.actions.sing()
}

const isConnected = computed<boolean>(() => sessionStore.getters.getIsConnected())

</script>

<style scoped>

</style>