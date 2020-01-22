/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
// const uuidv1 = require('uuid/v1');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [
            {
                id: 'ID0',
                name: 'Blue Shirt',
                description: 'Blue Shorts Desc',
                color: 'blue',
                make: 'Denim',
                price: 5000,
                quantity: 5,
                owner: 'FAIZAN23',
                reviews: [
                    {
                        userId: 'asdfgh',
                        token: '64321',
                        review: 'Best in town, recommended (y)'
                    }
                ],
                image: "image"
            },
            {
                id: 'ID2',
                name: 'Black Casual Coat',
                description: 'Black Casual Coat desc',
                color: 'Black',
                make: 'Levis',
                price: 5000,
                quantity: 5,
                owner: 'FAIZAN23',
                reviews: [
                    {
                        userId: 'qwerty',
                        token: '54321',
                        review: 'Best in town, recommended (y)'
                    }
                ],
                image: ""
            }
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('ID' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, ID) {
        const carAsBytes = await ctx.stub.getState(ID); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${ID} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
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

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(user)));
        console.info('============= END : Create User ===========');
    }

    async createCar(ctx, id, name, description, color, make, price, quantity, owner,  image, type) {
        console.info('============= START : Create Car ===========');

        // const id = uuidv1();
        const car = {
            name,
            description,
            color,
            docType: type,
            make,
            price,
            owner,
            id: id,
            quantity,
            image,
            reviews: []
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = 'ID0';
        const endKey = 'ID9999999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async changeCarOwner(ctx, ID, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(ID); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${ID} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(ID, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

	//purchase car code
	async purchaseCar(ctx, productId, userId, token) {
        console.info('============= START : purchaseCar ===========');

        const carAsBytes = await ctx.stub.getState(productId); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${ID} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        console.log(car);
        let value = parseInt(car.price);

        const userAsBytes = await ctx.stub.getState(userId); // get the user from chaincode state
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`${ID} does not exist`);
        }
        const user = JSON.parse(userAsBytes.toString());

        if (value > user.balance) {
			throw new Error(`${user.balane} is not enough for purchasing the product`);
        }
        else if (car.quantity == 0) {
            throw new Error(`Product is out of stock.`);
        }
		user.balance = parseInt(user.balance) - value;
        car.quantity = car.quantity - 1;

        user.puchasedProducts.push({
            productId: car.id,
            reviewToken: token,
        });
        console.log(user);

        await ctx.stub.putState(productId, Buffer.from(JSON.stringify(car)));
        await ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
        console.info('============= END : purchaseCar ===========');
    }

    async createReview(ctx, product_id, user_id, description, token) {
        console.info('============= START : Create Review ===========');
		const carAsBytes = await ctx.stub.getState(product_id);
		let car = JSON.parse(carAsBytes.toString());

		car.reviews.push({
			token: token,
			userId: user_id,
            review: description
		});

        await ctx.stub.putState(product_id, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Review ===========');
    }

}

module.exports = FabCar;
