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
		const pubKey = secp256k1.publicKeyCreate(privKey);
		this.key = pubKey;
		console.log('PUBLIC KEY : ',toHex(pubKey));

		/*if(pubKey !== this.fromAddress) {

	        throw new Error('You cannot sign transactions for other wallets!');
	    }*/

	    const TxId = this.calculateHash();

	    this.msg = TxId;

	    // sign the message
		const sig = secp256k1.ecdsaSign(TxId, privKey);

		this.signature = sig.signature;
        console.log('SIGNATURE : ', toHex(this.signature));

	}


	//validate Transactions
	isValid(){
		if(this.fromAddress === null) return true; 

		if (!this.signature || this.signature === 0) {

			throw new Error('No signature in this transaction');
		}

		return secp256k1.ecdsaVerify(this.signature, this.msg, this.key);

	}

}


module.exports.Transaction = Transaction;