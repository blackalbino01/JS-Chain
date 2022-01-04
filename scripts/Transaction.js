class Transaction{
	constructor(fromAddress, toAddress, amount){
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
		this.timestamp = Date.now();
	}

	//Calculating Hash String using SHA256
	calculateHash() {
		return toHex(sha256(utf8ToBytes(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce)));
	}

	//Signing Transactions using the signature.
	signature(){

	}

}

let instance = new Transaction();

module.exports = Transaction;