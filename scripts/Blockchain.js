const { Block } = require('./Block');
const { Transaction } = require('./Transaction');
const Merkle = require("merkle-js");


class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTxns = [];
		this.blockReward = 10;
		
	}

	//The first Block on a Blockchain
	createGenesisBlock(){
		const block = new Block(Date.parse('2022-01-03'), [], 0);
		return block;
	}

	//Retrieving the Previous block
	getPreviousBlock(){
		return this.chain[this.chain.length - 1];
	}

	//mining pending transactions
	minePendingTxns(minerAddress){
		const coinbaseTx = new Transaction( null, minerAddress, this.blockReward);
    this.pendingTxns.push(coinbaseTx);

		const block = new Block(Date.now(), this.pendingTxns, this.getPreviousBlock().hash);

		block.mine(this.difficulty);

		console.log('Block successfully mined!');
	    this.chain.push(block);
	  
	    this.pendingTxns = [];
	}

	//add Transaction
	addTxn(txn) {
  
      // Verify the transactiion
      if (!txn.isValid()) {
        throw new Error('Cannot add invalid transaction to the chain');
      }

      if(!txn.fromAddress || !txn.toAddress){
        throw new Error('Transaction must include from and to address');
      }
      
      if (txn.amount <= 0) {
        throw new Error('Transaction amount should be higher than 0');
      }
      
      // Making sure that the amount sent is not greater than existing balance
      if (this.getBalanceOf(txn.fromAddress) < txn.amount) {
        
        throw new Error('Not enough balance');
      }
  
      this.pendingTxns.push(txn);
      console.log('Transaction added: ', txn);
    }

    //retrieving balance
    getBalanceOf(address) {
      let balance = 0;

      for (const block of this.chain) {
        for (const txn of block.txns) {
          if (txn.fromAddress === address) {
            balance -= txn.amount;
          }
  
          if (txn.toAddress === address) {
            balance += txn.amount;
          }
        }
      }
  

      console.log('BALANCE : ', balance)
  
      return balance;
    }

    //checks if chain is valid
    isChainValid() {
 
      const realGenesis = JSON.stringify(this.createGenesisBlock());
  
      if (realGenesis !== JSON.stringify(this.chain[0])) {
        return false;
      }
  
      for (let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i];
  
        if (!currentBlock.hasValidTxns()) {
          return false;
        }
  
        if (currentBlock.hash !== currentBlock.calculateHash()) {
          return false;
        }
      }
  
      return true;
    }


}


module.exports.Blockchain = Blockchain;