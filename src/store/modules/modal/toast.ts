import { reactive } from 'vue'
import { IToastState } from '@/interfaces/IModalsState'

const state = reactive<IToastState>({
    isToastActive: false,
    text: '',
    state: 'success'
})

const actions = {
    setStateToast(payload: IToastState, time?: number): void {
        state.text = payload.text
        state.isToastActive = payload.isToastActive
        state.state = payload.state
        if (!time) {
            time = 2000
        }
        setTimeout(() => {
            this.closeToast()
        }, time)
    },
    closeToast(): void {
        state.isToastActive = false
        state.text = ''
    }
}

const getters = {
    getStateToast: () => state
}

export default { state, getters, actions }