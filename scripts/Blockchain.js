const { Block } = require('./Block')


class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 3;
		this.pendingTransactions = [];
		this.blockReward = 2;
		
	}

	//The first Block on a Blockchain
	createGenesisBlock(){
		const block = new Block(Date.parse('2022-01-03'), [], 0, 0);
		return block;
	}

	//Retrieving the Previous block
	getPreviousBlock(){
		return this.chain[this.chain.length - 1];
	}
}

let instance = new Blockchain();
console.log(instance.getLatestBlock());

module.exports = Blockchain;