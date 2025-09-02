import fs from "fs";
import solc from "solc";

const source = fs.readFileSync("ThemisCore.sol", "utf8");

const input = {
    language: "Solidity",
    sources: {
        "ThemisCore.sol": { content: source }
    },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode.object"] } } }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contractName = "ThemisCore";
const abi = output.contracts["ThemisCore.sol"][contractName].abi;
const bytecode = output.contracts["ThemisCore.sol"][contractName].evm.bytecode.object;

fs.writeFileSync("ThemisCore.json", JSON.stringify({ abi, bytecode }, null, 2));

console.log("✅ Compilation complete: ThemisCore.json created");
