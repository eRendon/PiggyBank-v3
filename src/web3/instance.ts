// @ts-ignore
import Web3 from 'web3/dist/web3.min.js'
import detectEthereumProvider from '@metamask/detect-provider'
import { InstanceWeb3 } from '@/interfaces/InstanceWeb3'

const getWeb3 = (): InstanceWeb3 | Error => {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(Web3.givenProvider)
        console.log('web3', web3)
        return{
            isInjected: true,
            web3
        }
    } else {
        return new Error('No existe metamask')
    }
    // return new Promise(async (resolve, reject) =>  {
    //     const provider = await detectEthereumProvider()
    //     console.log('el proveedor', provider)
    //     if (typeof window.ethereum !== 'undefined') {
    //         const web3 = new Web3(Web3.givenProvider)
    //         console.log('web3', web3)
    //         resolve({
    //             injectedWeb3: true,
    //             web3 () {
    //                 return web3;
    //             }
    //         })
    //     } else {
    //         reject(new Error('No existe metamask'))
    //     }
    // })
    //     .then((result: any) =>  {
    //         console.log('result', result)
    //         return new Promise((resolve, reject) => {
    //             result.web3().eth.net.getId().then(((networkId: number) => {
    //                 result = Object.assign({}, result, { networkId })
    //                 console.log('resutls', result)
    //                 resolve(result)
    //             })).catch((error: any) => {
    //                 reject(new Error('no se puede conectar a la red' + error))
    //             })
    //         })
    //     })
}


export default getWeb3;