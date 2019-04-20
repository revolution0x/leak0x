const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export const uploadToIPFS = (buffer) => {
    return new Promise((resolve, reject) => {
        ipfs.add(buffer, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    });
}

export const getFromIPFS = (hash) => {
    return new Promise((resolve, reject) => {
        ipfs.get(hash, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        });
    });
}