import { ethers } from "ethers";
import fs from "fs";

// Polygon RPC
const POLYGON_RPC = "https://polygon-mainnet.g.alchemy.com/v2/Lb0ty0LDrMxBJZpSSHstY";

// Replace with the private key of your founder wallet
const PRIVATE_KEY = "YOUR_FOUNDER_PRIVATE_KEY";

// Read the contract ABI & bytecode
const contractJson = JSON.parse(fs.readFileSync("ThemisCore.json", "utf8"));
const abi = contractJson.abi;
const bytecode = contractJson.bytecode;

async function main() {
    const provider = new ethers.JsonRpcProvider(POLYGON_RPC);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    console.log("Deploying ThemisCore with address:", wallet.address);

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy(
        "0x8Cbe46A175E9CE3bB9FCF1F739F8C6b37d3308b3", // operational wallet
        "MASTER_CID_HERE",
        "0x56Eddb7aa87536c09CCc2793473599fD21A8b17F", // Treasury
        "0x505e71695E9bc45943c58adEC1650577BcA68fD9", // Dev
        "0x4E3520A5Bbb6213243FDb3e1650C73AEae1D8514", // Community
        "0x367e50521765fa7DD60536415c58fB198abeE1Da"  // Founder
    );

    console.log("Transaction sent, waiting for confirmation...");
    await contract.waitForDeployment();

    console.log("✅ ThemisCore deployed at:", contract.target);
}

main().catch(console.error);
