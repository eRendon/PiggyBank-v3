import Web3 from 'web3'
import { web3Store } from '../store'
import { HubABI } from '../contract/HubABI'

export default class Hub {
    private internalAddress: string
    private instance: any
    private web3: Web3
    constructor(address: string) {
        this.internalAddress = address
        this.web3 = web3Store.getters.getWeb3() as Web3
        this.instance = new this.web3.eth.Contract(HubABI, '0xBB08684ad198410A19Cfa8f80B90F0Ae99323A76')
    }

    get eventualPiggyBanks() {
        return new Promise((resolve, reject) => {
            this.web3.eth.getAccounts()
                .then(([from]) => this.instance.methods.piggyBanks().call({ from }))
                .then(resolve)
                .catch(reject);
        });
    }

    addPiggyBank(piggyBankAddress: string) {
        return new Promise((resolve, reject) => {
            const addPiggyBankSignature = this.instance.methods.addPiggyBank(piggyBankAddress);
            this.web3.eth.getAccounts()
                .then(([from]) => Promise.all([
                    from,
                    addPiggyBankSignature.estimateGas({ from }),
                ]))
                .then(([from, gas]) => addPiggyBankSignature.send({ from, gas }))
                .then(resolve)
                .catch(reject);
        });
    }

    piggies(idx: number) {
        return new Promise((resolve, reject) => {
            this.web3.eth.getAccounts()
                .then(([from]) => this.instance.methods.piggies(idx).call({ from }))
                .then(resolve)
                .catch(reject);
        });
    }

    transferOwnership(piggyBankAddress: string, newOwner: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const transferOwnershipSignature = this.instance.methods.transferOwnership(
                piggyBankAddress,
                newOwner,
            );
            this.web3.eth.getAccounts()
                .then(([from]) => Promise.all([
                    from,
                    transferOwnershipSignature.estimateGas({ from }),
                ]))
                .then(([from, gas]) => transferOwnershipSignature.send({ from, gas }))
                .then(resolve)
                .catch(reject);
        });
    }
}