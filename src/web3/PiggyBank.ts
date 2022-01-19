import { web3Store } from '../store'
import { ABI } from '../contract/abi'
import Web3 from 'web3'
import { bytecode } from '../contract/bytecode'

export default class PiggyBank {
    private instance: any;
    private web3: Web3
    public internalAddress: string

    constructor(address?: string) {
        this.internalAddress = address || '0x74d11c17f8F2F24CFF151E8601b1d9e7b1CD238F'
        this.web3 = web3Store.getters.getWeb3() as Web3
        console.log(this.web3!.eth)
       this.instance = new this.web3!.eth.Contract(ABI, address || '0x74d11c17f8F2F24CFF151E8601b1d9e7b1CD238F')
    }

    get address() {
        return this.internalAddress;
    }

    deposit(amount: string) {
        return new Promise((resolve, reject) => {
            const depositSignature = this.instance.methods.deposit();
            this.web3.eth.getAccounts()
                .then(([from]) => Promise.all([
                    from,
                    depositSignature.estimateGas({ from, value: this.web3.utils.toWei(amount)})
                ]))
                .then(([ from, gas]) => depositSignature.send({
                    from,
                    gas,
                    value: this.web3.utils.toWei(amount)
                }))
                .then(resolve)
                .catch(reject)

        })
    }

    transfer(newOwner: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const transferSignature = this.instance.methods.setOwner(newOwner);
            this.web3.eth.getAccounts()
                .then(([from]) => Promise.all([
                    from,
                    transferSignature.estimateGas({ from }),
                ]))
                .then(([from, gas]) => transferSignature.send({ from, gas }))
                .then(resolve)
                .catch(reject);
        });
    }

    eventualName() {
        return new Promise((resolve, reject) => {
            this.instance.methods.name()
                .call()
                .then(resolve)
                .catch(reject);
        });
    }

    get eventualOwner(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.instance.methods.owner()
                .call()
                .then(resolve)
                .catch(reject);
        });
    }

    get eventualBalance(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.web3.eth.getBalance(this.internalAddress)
                .then(this.web3.utils.fromWei)
                .then(resolve)
                .catch(reject);
        });
    }

    withdraw(): Promise<void> {
        return new Promise((resolve, reject) => {
            const withdrawSignature = this.instance.methods.withdraw();
            this.web3.eth.getAccounts()
                .then(([from]) => Promise.all([
                    from,
                    withdrawSignature.estimateGas({ from }),
                ]))
                .then(([from, gas]) => withdrawSignature.send({ from, gas }))
                .then(resolve)
                .catch(reject);
        });
    }

    create(name: string) {
        return new Promise((resolve, reject) => {
            const PBSC = new this.web3.eth.Contract(ABI);
            const deploy = PBSC.deploy({
                data: bytecode,
                arguments: [name]
            })
            this.web3.eth.getAccounts()
                .then(([from]) => Promise.all([
                    from,
                    deploy.estimateGas({ from }),
                ]))
                .then(([from, gas]) => deploy.send({ from, gas }))
                .then((instance) => instance['_address'])
                .then(resolve)
                .catch(reject);
        })
    }

}