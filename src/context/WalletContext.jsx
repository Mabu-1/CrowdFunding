import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const WalletContext = createContext();

// Custom hook to use the WalletContext
export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(null);

  // Check if the user is already connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      const savedAddress = localStorage.getItem("userAddress");
      if (savedAddress) {
        setUserAddress(savedAddress);
      }
    };

    checkWalletConnection();

    if (window.ethereum) {
      // Event listeners for MetaMask account changes
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("disconnect", handleDisconnect);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("disconnect", handleDisconnect);
      }
    };
  }, []);

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      localStorage.removeItem("userAddress");
      setUserAddress(null);
    } else {
      const address = accounts[0];
      setUserAddress(address);
      localStorage.setItem("userAddress", address);
    }
  };

  // Handle MetaMask disconnection
  const handleDisconnect = () => {
    localStorage.removeItem("userAddress");
    setUserAddress(null);
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setUserAddress(address);
      localStorage.setItem("userAddress", address);
    } else {
      console.error("MetaMask is not installed.");
    }
  };

  return (
    <WalletContext.Provider value={{ userAddress, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
