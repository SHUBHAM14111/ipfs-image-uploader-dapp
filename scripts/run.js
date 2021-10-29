const main = async () => {
  const storageFactory = await hre.ethers.getContractFactory("Storage");
  const storage = await storageFactory.deploy();
  await storage.deployed();
  console.log("Contract deployed to:", storage.address);

  let txn = await storage.add("Shubham");
  await txn.wait();
  txn = await storage.add("Karan");
  await txn.wait();
  txn = await storage.add("Anal");
  await txn.wait();
  txn = await storage.add("Pradeep");
  await txn.wait();

  let images = await storage.get();

  console.log(images);
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
