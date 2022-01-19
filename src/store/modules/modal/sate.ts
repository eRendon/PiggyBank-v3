import { reactive } from 'vue'
import { IModalsState } from '@/interfaces/IModalsState'

const state = reactive<IModalsState>({
    isModalActive: false,
    text: '',
    state: 'success'
})

const actions = {
    setStateModal(payload: IModalsState): void {
        state.text = payload.text
        state.isModalActive = payload.isModalActive
        state.state = payload.state
    },
    closeModal(): void {
        state.isModalActive = false
        state.text = ''
    }
}

const getters = {
    getStateModal: () => state
}

export default { state, getters, actions }