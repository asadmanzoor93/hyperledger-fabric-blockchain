/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class User extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const users = [
            {
                firstName: 'faizan',
                lastName: 'sh',
                email: 'faixan.sh@gmail.com',
                id: 'asdfgh',
                balance: 50000,
                puchasedProducts: [
                    {
                        productId: '001',
                        reviewToken: '12345',
                    }
                ]
            },
            {
                firstName: 'nawaz',
                lastName: 'm',
                email: 'msds18073@gmail.com',
                id: 'qwerty',
                balance: 55000,
                puchasedProducts: [
                    {
                        productId: '002',
                        reviewToken: '54321',
                    }
                ]
            }
        ];

        for (let i = 0; i < users.length; i++) {
            await ctx.stub.putState(users[i].id, Buffer.from(JSON.stringify(users[i])));
            console.info('Added <--> ', users[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryUser(ctx, ID) {
        const userAsBytes = await ctx.stub.getState(ID); // get the user from chaincode state
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`${ID} does not exist`);
        }
        console.log(userAsBytes.toString());
        return userAsBytes.toString();
    }

    async createUser(ctx, firstName, lastName, email, id) {
        console.info('============= START : Create User ===========');

        const user = {
            id,
            firstName,
            lastName,
            email,
            balance: 50000,
            puchasedProducts: []
        };

        await ctx.stub.putState(ID, Buffer.from(JSON.stringify(user)));
        console.info('============= END : Create User ===========');
    }


}

module.exports = User;
