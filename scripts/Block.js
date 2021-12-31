const SHA256 = require("crypto-js/sha256");

class Block{

	constructor(timestamp, transactions, previousHash = '' ){
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.previousHash = previousHash;
		this.nonce = 0;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
	}
}

let instance = new Block(0,60);
console.log(instance.hash);

module.exports = Block;