const main = async () => {
  const storageFactory = await hre.ethers.getContractFactory("Storage");
  const storage = await storageFactory.deploy();
  await storage.deployed();
  console.log("Contract deployed to:", storage.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
