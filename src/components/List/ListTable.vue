<template>
  <h3 class="mt-6 text-xl">{{ title }}</h3>
  <div class="flex flex-col mt-6">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div class="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
          <table v-if="addresses.length > 0" class="min-w-full overflow-x-scroll divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th
                  scope="col"
                  class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Nombre
              </th>
              <th
                  scope="col"
                  class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Dirección
              </th>
              <th
                  scope="col"
                  class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Balance
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="i in addresses" :key="i">
              <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                <router-link :to="{name: 'PiggyBank', params: { address: i.address }}">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                          class="w-10 h-10 rounded-full"
                          src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                          alt=""
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ i.name }}</div>
<!--                      <div class="text-sm text-gray-500">ahmed.kamel@example.com</div>-->
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ i.address }}</div>
<!--                  <div class="text-sm text-gray-500">Optimization</div>-->
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{{ i.balance }}</td>
                <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Ver detalle</a>
                </td>
                </router-link>
              </tr>
            </template>
            </tbody>
          </table>
          <div v-else class="p-5 text-center">
            No hay datos para mostrar
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  addresses: {
    type: Array,
    required: true,
  }
});
</script>

<style scoped>

</style>