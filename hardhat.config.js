require("@nomiclabs/hardhat-waffle");
require("dotenv").config();


// // This is a sample Hardhat task. To learn how to create your own go to
// // https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/GQgpF0c3qtOAHDWWdosjdI7T1_2ydSMM",
      accounts: [
        "b427abd59b3e391116617d657c687fdc9239ae508e701a661310654ec8d0173e",
      ],
    },
  },
};
