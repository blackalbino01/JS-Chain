const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes,toHex } = require("ethereum-cryptography/utils");

class Block{

	constructor(timestamp, txns, previousHash = '' ){
		this.timestamp = timestamp;
		this.txns = txns;
		this.previousHash = previousHash;
		this.nonce = 0;
		this.hash = this.calculateHash();
	}

	//Calculating Hash String using SHA256
	calculateHash() {
		return toHex(sha256(utf8ToBytes(this.previousHash + this.timestamp + JSON.stringify(this.txns) + this.nonce)));
	}

	//Mining Block Hash using Proof Of Work Algorigm
	mine(difficulty) {
      while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
        this.nonce++;
        this.hash = this.calculateHash();
        console.log(this.hash)
      }
  
      console.log(`Block Hash: ${this.hash}`);
    }

    //check if block have valid transactions
    hasValidTxns() {
      for (const txn of this.txns) {
        if (!txn.isValid()) {
          return false;
        }
      }
  
      return true;
    }
}


module.exports.Block = Block;