import React, { useState } from "react";
import { ethers } from "ethers";
import "./WalletConnect.css"; // Importando um arquivo de estilo, se necessário

const WalletConnect = () => {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Solicitar acesso à conta do usuário
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        await newProvider.send("eth_requestAccounts", []);
        const signer = newProvider.getSigner();
        const userAccount = await signer.getAddress();
        const userNetwork = await newProvider.getNetwork();

        // Definindo as informações de conta e rede
        setAccount(userAccount);
        setNetwork(userNetwork.name);
        setProvider(newProvider);

        console.log("Wallet connected:", userAccount);
        console.log("Network:", userNetwork.name);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("MetaMask connection failed!");
      }
    } else {
      alert("MetaMask not found! Please install MetaMask.");
    }
  };

  return (
    <div className="wallet-connect">
      <button onClick={connectWallet}>Connect MetaMask</button>
      {account && (
        <div>
          <p><strong>Account:</strong> {account}</p>
          <p><strong>Network:</strong> {network}</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
