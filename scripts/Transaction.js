const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes,toHex } = require("ethereum-cryptography/utils");
const secp256k1 = require("secp256k1");
const { getRandomBytesSync } = require("ethereum-cryptography/random");

class Transaction{
	constructor(fromAddress, toAddress, amount){
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
		this.timestamp = Date.now();
	}

	//Calculating Hash String using SHA256
	calculateHash() {
		return sha256(utf8ToBytes(this.fromAddress + this.toAddress + this.amount.toString()));
	}

	//Signing Transactions using the signature.
	signTx(privKey){

		// get the public key in a compressed format
		const pubKey = toHex(secp256k1.publicKeyCreate(privKey));
		console.log('PUBLIC KEY : ',pubKey);

		/*if(pubKey !== this.fromAddress) {

	        throw new Error('You cannot sign transactions for other wallets!');
	    }*/

	    const TxId = this.calculateHash();

	    // sign the message
		const sig = secp256k1.ecdsaSign(TxId, privKey);

		this.signature = sig;
        console.log('SIGNATURE : ',toHex(sig.signature));

	}

}

let instance = new Transaction(0,0,1);

const hash = instance.calculateHash();

instance.signTx(hash);

module.exports.Transaction = Transaction;