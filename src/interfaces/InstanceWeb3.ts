import Web3 from 'web3'

export interface InstanceWeb3 {
    networkId?: number
    isInjected?: boolean
    web3?: Web3
}