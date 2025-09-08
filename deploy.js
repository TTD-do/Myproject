const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

// ---- CONFIG ----
const RPC_URL = "https://rpc.sepolia.org"; // ví dụ testnet Sepolia
const PRIVATE_KEY = "YOUR_PRIVATE_KEY";    // private key ví của bạn
// ----------------

// 1. Setup provider + wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// 2. Load compiled contract (ABI + Bytecode)
// File này bạn sẽ có sau khi compile bằng Hardhat/Remix/solc
const artifact = JSON.parse(
  fs.readFileSync(path.join(__dirname, "HelloWorld.json"), "utf8")
);

async function main() {
  console.log("📦 Deploying contract...");

  // 3. Tạo ContractFactory
  const factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    wallet
  );

  // 4. Deploy (constructor nhận tham số "Hello Anoma")
  const contract = await factory.deploy("Hello Anoma");

  // 5. Chờ tx confirm
  await contract.waitForDeployment();

  console.log("✅ Contract deployed at:", contract.target);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
