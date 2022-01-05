const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes,toHex } = require("ethereum-cryptography/utils");
const secp256k1 = require("secp256k1");
const { getPublicKey, recoverPublicKey } = require('@noble/secp256k1');

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
	signTxn(privKey){

		// get the public key in a compressed format
		const pubKey = getPublicKey(privKey,true);
		
		console.log('PUBLIC KEY : ',toHex(pubKey));

		if(toHex(pubKey) !== this.fromAddress) {

	        throw new Error('You cannot sign transactions for other wallets!');
	    }

	    const TxId = this.calculateHash();

	    this.msgHash = toHex(TxId);

	    // sign the message
		const sig = secp256k1.ecdsaSign(TxId, privKey);

		this.signatureHash = toHex(sig.signature);

        console.log('SIGNATURE : ', this.signatureHash);

	}


	//validate Transactions
	isValid(){
		if(this.fromAddress === null) return true; 

		if (!this.signatureHash || this.signatureHash === 0) {

			throw new Error('No signature in this transaction');
		}

		const pubKey = Uint8Array.from(Buffer.from(this.fromAddress, 'hex'));
		const message = Uint8Array.from(Buffer.from(this.msgHash, 'hex'));
		const signature = Uint8Array.from(Buffer.from(this.signatureHash, 'hex'));

		return secp256k1.ecdsaVerify(signature, message, pubKey);

	}

}


module.exports.Transaction = Transaction;