/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');

exports.storeProduct = async (data) => {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('faizan');
        if (!userExists) {
            console.log('An identity for the user "faizan" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'faizan', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        console.log(data);
        // return {id:data}
        data.id = data.id.replace("ID", "");
        const result = await contract.submitTransaction('createCar', `ID${data.id}`, data.name, data.description, data.color, data.make, data.price, data.quantity, 'FAIZAN12', data.image, data.type);

        // const result = await contract.submitTransaction('createCar',JSON.stringify(data));
        console.log(`Transaction has been submitted ${result.toString()}`);
        // //Purchase car function call;
        // //Purchase car requires to arguments , card ID and new Owner name
        // const result = await contract.submitTransaction('purchaseCar', `ID${data.id}`, );
        // Disconnect from the gateway.
        await gateway.disconnect();

        return { message: 'Product has been successfully added.' };

    } catch (error) {
        // throw error;
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
};

exports.storeUser = async (data) => {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('faizan');
        if (!userExists) {
            console.log('An identity for the user "faizan" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'faizan', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        // console.log(data);
        const result = await contract.submitTransaction('createUser', data.firstName, data.lastName, data.email, data.email);
        // const result = await contract.submitTransaction('createCar',JSON.stringify(data));
        console.log(`Transaction has been submitted ${result.toString()}`);
        // //Purchase car func
        // //Purchase car requires to arguments , card ID and new Owner name
        // const result = await contract.submitTransaction('purchaseCar', `ID${data.id}`, );
        // Disconnect from the gateway.
        await gateway.disconnect();

        return { message: 'User has been successfully added.' };

    } catch (error) {
        // throw error;
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
};
/*
 * This function is for purchase product
 * @param {data}
 * @return JSON
 */
exports.buyProduct = async (data) => {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('faizan');
        if (!userExists) {
            console.log('An identity for the user "faizan" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'faizan', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');
        const token = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
        //Purchase car function call;
        //Purchase car requires to arguments , card ID and new Owner name
        const result1 = await contract.submitTransaction('purchaseCar', data.product_id, data.user_id, token);
        // this.delay(7000);
        // const result = await contract.submitTransaction('purchaseCarR2P', data.product_id, data.user_id);
        // Disconnect from the gateway.
        await gateway.disconnect();

        return { message: 'Product has been purchased successfully.' };

    } catch (error) {
        // throw error;
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
};


/*
 * This function is for review product
 * @param {data}
 * @return JSON
 */
exports.reviewProduct = async (data) => {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('faizan');
        if (!userExists) {
            console.log('An identity for the user "faizan" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'faizan', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        //Review car function call;
        await contract.submitTransaction('createReview', data.product_id, data.user_id, data.description, data.token);
        // Disconnect from the gateway.
        await gateway.disconnect();

        return { message: 'Product has been review successfully.' };

    } catch (error) {
        // throw error;
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
};

exports.delay = (t, val) => {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log('TIMEOUT');
            resolve(val);
        }, t);
    });
};
