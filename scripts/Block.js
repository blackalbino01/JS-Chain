const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes,toHex } = require("ethereum-cryptography/utils");

class Block{

	constructor(index, timestamp, transactions, previousHash = '' ){
		this.index = index;
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.previousHash = previousHash;
		this.nonce = 0;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return toHex(sha256(utf8ToBytes(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce)));
	}

	mine(difficulty) {
      while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
        this.nonce++;
        this.hash = this.calculateHash();
        console.log(this.hash)
      }
  
      console.log(`Block mined: ${this.hash}`);
    }
}

let instance = new Block(0,60);
console.log(instance.mine(1));

module.exports = Block;