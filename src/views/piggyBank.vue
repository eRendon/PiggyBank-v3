<template>
  <div class="px-4 lg:grid sm:grid py-6 grid-cols-2 gap-x-6 max-w-4xl mx-auto">
    <div class="mb-8">
      <h2 class="text-center text-2xl font-bold text-blue-800">Transferir</h2>
      <div class="mt-6">
        <div class="flex-col space-y-4">
          <input  v-model="deposit" type="text"  class="border-2 w-full px-4 py-2 rounded-md text-md text-gray-700 outline-none" />
        </div>
        <button :disabled="canSend" @click="send" class="w-full mt-4 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white py-2 rounded-md text-lg font-semibold">Enviar</button>
      </div>
      <div class="mt-7">
        <h2 class="text-center text-2xl font-bold text-blue-800">Transferir Dueño</h2>
        <div class="mt-6">
          <div class="flex-col space-y-4">
            <input type="text" v-model="newOwner" class="border-2 w-full px-4 py-2 rounded-md text-md text-gray-700 outline-none" />
          </div>
          <button :disabled="canTransfer" @click="transfer" class="w-full mt-4 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white py-2 rounded-md text-lg font-semibold">Transerir</button>
        </div>
      </div>
    </div>
    <div class="mt-2 space-y-4">
      <div class="flex-col space-y-4">
        <label class="text-center text-2xl font-bold text-blue-800">Balance</label>
        <input disabled type="text" :placeholder="`${balance} ETH`" class="border-2 w-full px-4 py-2 rounded-md text-md text-gray-700 outline-none" />
      </div>
      <div class="flex-col space-y-4">
        <label class="text-center text-2xl font-bold text-blue-800">Address</label>
        <input type="text" disabled :placeholder="address" class="border-2 w-full px-4 py-2 rounded-md text-md text-gray-700 outline-none" />
      </div>
      <div class="flex justify-around p-6 rounded-md bg-indigo-50">
        <div>
          <div @click="withdraw" class="space-x-1">
            <span class="text-md px-20 py-2 w-8 rounded-md bg-green-500 text-indigo-50 font-semibold cursor-pointer" text-indigo-50 font-semibold cursor-pointer>Retirar</span>
          </div>
        </div>
      </div>
      <div class="flex justify-around p-4 rounded-md bg-indigo-50">
        <div>
          <div class="space-x-1">
            <span class="text-md px-20 py-2 w-8 rounded-md  text-indigo-50 font-semibold cursor-pointer bg-red-500 ">Crash</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PiggyBank from '../web3/PiggyBank'
import Hub from '../web3/Hub'
import { modalStore, sessionStore, toastStore } from '../store'
let piggyBank: PiggyBank
const address = ref('')
const route = useRoute()
const balance = ref('')
const deposit = ref(0)
const newOwner = ref('')
const hub = new Hub('0xBB08684ad198410A19Cfa8f80B90F0Ae99323A76')
const isOwner = ref(false)

onMounted((): void => {
  address.value = route.params.address as string
  piggyBank = new PiggyBank(address.value)
  getBalance()
})

const account = computed(() => sessionStore.state.address)

const canSend = computed(() => {
  return deposit.value <= 0
})

const canTransfer = computed(() => {
  return !newOwner.value
})

const getBalance = (): void => {
  piggyBank.eventualBalance.then((response) => {
    balance.value = response as string
  }).catch((error) => {
    console.log('error', useRoute())
  })
}

const send = () => {
  piggyBank.deposit(String(deposit.value))
      .then(() => piggyBank.eventualBalance)
      .then((newValance) => {
        balance.value = newValance as string;
        deposit.value = 0
        toastStore.actions.setStateToast({ state: 'success', text: 'Se ha realizado la transferencia correctamente', isToastActive: true})
      }).catch((error) => {
        modalStore.actions.setStateModal({ state: 'error', text: error.message, isModalActive: true})
  });
}

const transfer = (): void => {
  piggyBank.transfer(newOwner.value)
      .then(() => hub.transferOwnership(piggyBank.address, newOwner.value))
      .then(() => {
        toastStore.actions.setStateToast({ state: 'success', text: 'Se ha transferido esta cuenta satisfactoriamente', isToastActive: true})
        getOwnershipStatus();
      }).catch((error) => {
        modalStore.actions.setStateModal({ state: 'error', text: error.message, isModalActive: true})
  });
}

const getOwnershipStatus = (): void => {
  piggyBank.eventualOwner
      .then((owner) => {
        isOwner.value = owner === account.value;
      });
}

const withdraw = (): void => {
  piggyBank.withdraw()
      .then(() => piggyBank.eventualBalance)
      .then((newBalance) => {
        balance.value = newBalance as string;
      });
}
</script>

<style scoped>

</style>