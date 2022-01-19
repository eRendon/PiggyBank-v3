import { reactive } from 'vue'
import { InstanceWeb3 } from '@/interfaces/InstanceWeb3'
import getWeb3 from '../../../web3/instance'

const state = reactive<InstanceWeb3>({})

const actions = {
    registerWeb3() {
        const instance = getWeb3()
        if ('web3' in instance) {
            state.web3 = instance.web3
            state.isInjected = true
        }
    }
}

const getters = {
    getWeb3: () => state.web3
}

export default { state, actions, getters }