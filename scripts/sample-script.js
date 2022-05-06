
const hre = require("hardhat");

async function main() {


  // We get the contract to deploy
  const TestUniswap = await hre.ethers.getContractFactory("TestUniswap");
  const testuniswap = await TestUniswap.deploy();

  await testuniswap.deployed();

  console.log("Greeter deployed to:", testuniswap.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // 0x2eBeD6a75777EbA1d59A95706A00d1Df36e6c0B5
