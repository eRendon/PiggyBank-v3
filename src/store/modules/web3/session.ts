import { reactive } from 'vue'
import { modalStore, toastStore, web3Store } from '../../../store'

const state = reactive({
    isWalletConnected: false,
    token: '',
    address: ''
})

const actions = {
    async sing(): Promise<void> {
        const web3 = web3Store.getters.getWeb3()
        const address = await this.getAddress()
        try {
            await this.connect()
            web3?.eth.personal.sign(web3?.utils.fromUtf8(address), address, '')
                .then(async (response) => {
                    console.log(response)
                    state.token = response
                    state.isWalletConnected = true
                    state.address = await this.getAddress()
                    toastStore.actions.setStateToast({ state: 'success', isToastActive: true, text: 'Sesión iniciado correctamente'})
                }).catch((error) => {
                state.isWalletConnected = false
                toastStore.actions.setStateToast({ state: 'error', isToastActive: true, text: 'Inicio de sesión cancelado'})
                console.log(error)
            })
        } catch (e) {
            console.log(e)
            state.isWalletConnected = false
            modalStore.actions.setStateModal({ isModalActive: true, state: 'error', text: 'Por favor, inicie sesión en su wallet'})
        }
    },
    getAddress(): Promise<string> {
        const web3 = web3Store.getters.getWeb3()
        return new Promise((resolve, reject) => {
            web3?.eth.getAccounts()
                .then(([account]) => {
                    resolve(account)
                }).catch((error) => {
                reject(error)
            })
        })
    },
    async connect(): Promise<void> {
        try {
            await (window as any).ethereum!.enable()
            state.isWalletConnected = true
        } catch (e) {
            console.log(e)
        }
    }
}

const getters = {
    getIsConnected: () => state.isWalletConnected
}

export default { state, actions, getters}