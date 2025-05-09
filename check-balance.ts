import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

function validateSolAddress(address: string): boolean {
  try {
   let pubkey = new PublicKey(address);
   return PublicKey.isOnCurve(pubkey.toBuffer());
 } catch (error) {
   return false;
 }
}


const suppliedPublicKey = process.argv[2];

const isValid =  validateSolAddress(suppliedPublicKey);

if (!isValid) {
  console.log("valid")
  throw new Error(" public key is valid!")
}

if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const publicKey = new PublicKey(suppliedPublicKey);

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`);
