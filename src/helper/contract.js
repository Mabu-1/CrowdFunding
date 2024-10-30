import { ethers } from 'ethers';
import crowdFundingABI from '../utils/CrowdFunding.json';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export const getContract = async () => {
    try {
        if (!window.ethereum) return null;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(); // Added await here
        const contract = new ethers.Contract(
            contractAddress,
            crowdFundingABI,
            signer
        );
        return contract;
    } catch (error) {
        console.error("Failed to load contract:", error);
        return null;
    }
}