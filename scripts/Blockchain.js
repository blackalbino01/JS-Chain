const { Block } = require('./Block');
const { Transaction } = require('./Transaction');
const Merkle = require("merkle-js");


class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 1;
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

	//mining pending transactions
	minePendingTxs(minerAddress){
		const coinbaseTx = new Transaction( null, minerAddress, this.blockReward);
		this.pendingTransactions.push(coinbaseTx);

		let Txns = [JSON.stringify(this.pendingTransactions)];
		const merkelRoot = new Merkle(Txns);
		const block = new Block(Date.now(), this.pendingTransactions, merkelRoot.getRoot('hex'), this.getPreviousBlock().hash);

		block.mine(this.difficulty);

		console.log('Block successfully mined!');
	    this.chain.push(block);
	  
	    this.pendingTransactions = [];
	}
}

let instance = new Blockchain();

module.exports = Blockchain;