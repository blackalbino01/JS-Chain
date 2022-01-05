const { generateMnemonic, mnemonicToSeedSync } = require("ethereum-cryptography/bip39");
const { sha256 } = require("ethereum-cryptography/sha256");
const { wordlist } = require("ethereum-cryptography/bip39/wordlists/english");
const { toHex } = require("ethereum-cryptography/utils");
const secp256k1 = require("secp256k1");
const { Blockchain } = require('./scripts/Blockchain');
const { Transaction } = require('./scripts/Transaction');


// generate a mnemonic
const mnemonic = generateMnemonic(wordlist);
console.log("MNEMONIC : ",mnemonic);

// generate a seed
const seed = mnemonicToSeedSync(mnemonic);

const privKey = sha256(seed);

const pubKey = secp256k1.publicKeyCreate(privKey);
console.log('PUBLIC KEY : ',toHex(pubKey));

const pubKey2 = '03d7cb99232bef673ed0b49b9db615f7fa0a4124eee7bb06fefcc415d52bcf0373';

// create an instance of the blockchain
const jsChain = new Blockchain();


//create transaction
const txn = new Transaction(toHex(pubKey), pubKey2, 2);

//sign transaction
txn.signTxn(privKey);

// before we can send that first transaction ever we need tokens.
// let's mine a block
jsChain.minePendingTxns(toHex(pubKey));

//add transaction
jsChain.addTxn(txn);

// for the transaction to be executes it has to be mined.
jsChain.minePendingTxns(toHex(pubKey));


// display the balance
jsChain.getBalanceOf(toHex(pubKey));