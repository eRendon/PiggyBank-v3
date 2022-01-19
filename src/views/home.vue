<template>
<div>
  <div>
    <div class="m-4 flex">
      <input v-model="nameWallet" class="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="Nombre de mi alcancía"/>
      <button @click="create" class="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Crear Alcancía</button>
    </div>
  </div>
  <ListTable :addresses="[]" title="Mis alcancías"></ListTable>
</div>
</template>

<script setup lang="ts">
import ListTable from '../components/List/ListTable.vue'
import _ from 'lodash'

import PiggyBank from '../web3/PiggyBank'
import Hub from '../web3/Hub'
import { onMounted, ref } from 'vue'
import { modalStore, toastStore } from '../store'

const piggyBank = new PiggyBank()
const hub = new Hub('0xBB08684ad198410A19Cfa8f80B90F0Ae99323A76')
const nameWallet = ref('')

const deposit = () => {
  piggyBank.deposit('0.1').then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  })
}

const eventualName = () => {
  piggyBank.eventualName().then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log('error', error)
  })
}

const create = () => {
  if (nameWallet.value) {
    piggyBank.create(nameWallet.value).then((response) => {
      toastStore.actions.setStateToast({ state: 'success', isToastActive: true, text: 'Piggy Bank creado correctamente'})
      createPiggyBank(response as string)
    }).catch((error) => {
      modalStore.actions.setStateModal({ state: 'error', isModalActive: true, text: error.message})
    })
    return
  }
  toastStore.actions.setStateToast({ state: 'error', isToastActive: true, text: 'Por favor, ingrese un nombre para el Piggy Bank'})
}

const createPiggyBank = (address: string) => {
  hub.addPiggyBank(address).then((response) => {
    console.log('reacr piggy', response)
  }).catch((error) => {
    console.log('error al crear pigy', error)
  })
}

const getEventualOwner = () => {
  const piggy = new PiggyBank()
  piggy.eventualOwner.then((owner) => {
    console.log(owner)
  }).catch((error) => {
    console.log('error', error)
  })
}

const loadPiggyBanks = () => {
  const hubP = new Hub('0xBB08684ad198410A19Cfa8f80B90F0Ae99323A76')
  hubP.eventualPiggyBanks
      .then((piggies) => _.range(piggies as number))
      .then((indices) => Promise.all(indices.map((idx: number) => hub.piggies(idx))))
      .then((addresses) => [...(new Set(addresses))])
      .then((addresses) => addresses.filter((address) => (address as string).match(/0x[0]{40}/)))
      .then((addresses) => {
        console.log('piggibanks', addresses)
      }).catch((error) => {
        console.log('error al traer mis wallets', error)
  });
}

onMounted(() => {
  loadPiggyBanks()
  getEventualOwner()
})

</script>

<style scoped>

</style>