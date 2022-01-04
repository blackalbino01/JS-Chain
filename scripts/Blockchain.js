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
}

let instance = new Blockchain();
console.log(instance.createGenesisBlock());

module.exports = Blockchain;