import contract from 'truffle-contract';
import leak0x from '../../../build/contracts/leak0x.json';
import Web3 from 'web3';

const web3 = window.ethereum ? window.ethereum : new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io:443'));

console.log(web3.currentProvider);

const leak0xContract = contract(leak0x);
leak0xContract.setProvider(web3);

const getInstance = async () => {
    const instance = await leak0xContract.deployed();
    return instance;
}

export const createLeak = async (account, hash, title, mimeType) => {
    const instance = await getInstance();
    const item = await instance.createLeak(hash, title, mimeType, {
        from: account
    });
    return item;
}

export const getWhistleblowerLeaks = async (account) => {
    const instance = await getInstance();
    const items = await instance.getWhistleblowerLeakIds(account);
    return items;
}

export const getLeakFromLeakId = async (leakId) => {
    const instance = await getInstance();
    const leak = await instance.getLeakFromLeakId(leakId);
    return leak;
}

export const getLeakFromIpfsHash = async (ipfsHash) => {
    const instance = await getInstance();
    const leak = await instance.getLeak(ipfsHash);
    return leak;
}

