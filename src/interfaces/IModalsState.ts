export interface IModalsState {
    isModalActive: boolean
    text: string
    state: 'error' | 'success'
}

export interface IToastState {
    isToastActive: boolean
    text: string
    state: 'error' | 'success'
}