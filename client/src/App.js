import React, { useEffect, useState } from "react";
import ipfs from "./ipfs";
import Storage from "./utils/Storage.json";
import { ethers } from "ethers";

import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";

const CONTRACT_ADDRESS = "0x2f664736a56518C1E6c715015dd3a75c7706396C";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [buffer, setBuffer] = useState("");
  const [images, setImages] = useState([]);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            Storage.abi,
            signer
          );

          console.log("Going to pop wallet now to pay gas...");
          let yourImages = await connectedContract.get();
          console.log("images", yourImages);
          setImages(yourImages);
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
      console.log(Buffer(reader.result));
    };
  };

  const onSubmit = (event) => {
    event.preventDefault();
    ipfs.files.add(buffer, async (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            Storage.abi,
            signer
          );

          console.log("Going to pop wallet now to pay gas...");
          let Txn = await connectedContract.add(result[0].hash);

          console.log("Mining...please wait.");
          await Txn.wait();
          console.log(Txn);
          console.log(
            `Mined, see transaction: https://rinkeby.etherscan.io/tx/${Txn.hash}`
          );
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
      setIpfsHash(result[0].hash);
      console.log(result[0].hash);
    });
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const renderNotConnectedContainer = () => (
    <div className="container">
      <button
        onClick={connectWallet}
        className="cta-button connect-wallet-button vertical-center"
      >
        Connect to Wallet
      </button>
    </div>
  );
  const renderUploadUi = () => (
    <main className="container">
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>Your Image</h1>
          <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
          <img src={`https://ipfs.io/ipfs/${ipfsHash}`} alt="" />
          <h2>Upload Image</h2>
          <form onSubmit={onSubmit}>
            <input type="file" onChange={captureFile} />
            <input type="submit" />
          </form>
        </div>
      </div>
    </main>
  );

  return (
    <div className="App">
      <nav className="navbar pure-menu pure-menu-horizontal">
        <a href="#" className="pure-menu-heading pure-menu-link">
          IPFS File Upload DApp
        </a>
      </nav>
      {currentAccount === "" ? renderNotConnectedContainer() : renderUploadUi()}
    </div>
  );
};

export default App;
