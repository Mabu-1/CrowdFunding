import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContract } from "../helper/contract";
import Loader from "./Loader";

const IPFS_GATEWAYS = [
  "https://gateway.pinata.cloud/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
  "https://ipfs.io/ipfs/",
];

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const [loadingDelete, setLoadingDelete] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingCampaigns, setLoadingCampaigns] = useState({});
  const [error, setError] = useState("");
  const [donationAmounts, setDonationAmounts] = useState({});

  const fetchIPFSData = async (hash) => {
    if (!hash) {
      console.error("Invalid IPFS hash received:", hash);
      return null;
    }

    let lastError;

    for (const gateway of IPFS_GATEWAYS) {
      try {
        const url = hash.startsWith("ipfs://")
          ? hash.replace("ipfs://", gateway)
          : hash.startsWith("http")
          ? hash
          : `${gateway}${hash}`;

        console.log("Attempting to fetch from:", url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Successfully fetched data:", data);
        return data;
      } catch (err) {
        console.warn(`Failed to fetch from ${gateway}:`, err);
        lastError = err;
        continue;
      }
    }

    console.error("All IPFS gateways failed. Last error:", lastError);
    return null;
  };

  const getAllCampaigns = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Initializing contract...");
      const contract = await getContract();
      if (!contract) throw new Error("Failed to load contract");

      console.log("Fetching active campaigns...");
      const onChainCampaigns = await contract.getActiveCampaigns();
      console.log("Raw campaigns data:", onChainCampaigns);

      const campaignsWithData = await Promise.all(
        onChainCampaigns.map(async (campaign, index) => {
          try {
            if (!campaign.isActive) {
              console.log(`Campaign ${index} is inactive, skipping`);
              return null;
            }

            // Extract metadata URL from campaign
            const metaData = Object.values(campaign)[1];
            console.log(`Campaign ${index} metadata URL:`, metaData);

            // Fetch IPFS data
            const ipfsData = await fetchIPFSData(metaData);
            console.log(`Campaign ${index} IPFS data:`, ipfsData);

            if (!ipfsData) {
              console.warn(`Failed to fetch IPFS data for campaign ${index}`);
              return {
                id: index,
                owner: campaign.owner,
                target: ethers.formatEther(campaign.target),
                deadline: new Date(Number(campaign.deadline) * 1000),
                amountCollected: ethers.formatEther(campaign.amountCollected),
                claimed: campaign.claimed,
                isActive: campaign.isActive,
                title: "Unable to load campaign title",
                description: "Unable to load campaign description",
                image: "",
              };
            }

            // Process image URL
            let imageUrl = ipfsData.image || "";
            if (imageUrl.startsWith("ipfs://")) {
              imageUrl = imageUrl.replace(
                "ipfs://",
                "https://gateway.pinata.cloud/ipfs/"
              );
            }

            return {
              id: index,
              owner: campaign.owner,
              target: ethers.formatEther(campaign.target),
              deadline: new Date(Number(campaign.deadline) * 1000),
              amountCollected: ethers.formatEther(campaign.amountCollected),
              claimed: campaign.claimed,
              isActive: campaign.isActive,
              title: ipfsData.title || "Untitled Campaign",
              description: ipfsData.description || "No description available",
              image: imageUrl,
            };
          } catch (err) {
            console.error(`Error processing campaign ${index}:`, err);
            return null;
          }
        })
      );

      // Filter out null campaigns and log final result
      const validCampaigns = campaignsWithData.filter(
        (campaign) => campaign && campaign.isActive
      );
      console.log("Processed campaigns:", validCampaigns);

      setCampaigns(validCampaigns);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setError(err.message || "Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async (campaignId, amount) => {
    try {
      setLoadingCampaigns((prev) => ({ ...prev, [campaignId]: true }));
      console.log(
        `Initiating donation for campaign ${campaignId}: ${amount} ETH`
      );

      const contract = await getContract();
      if (!contract) throw new Error("Failed to load contract");

      const tx = await contract.donateToCampaign(campaignId, {
        value: ethers.parseEther(amount),
      });
      console.log("Donation transaction:", tx);

      const receipt = await tx.wait();
      console.log("Donation receipt:", receipt);

      await getAllCampaigns(); // Refresh campaigns after donation
    } catch (err) {
      console.error("Error donating:", err);
      alert(err.message || "Failed to donate");
    } finally {
      setLoadingCampaigns((prev) => ({ ...prev, [campaignId]: false }));
    }
  };

  const handleDelete = async (campaignId) => {
    if (!window.confirm("Are you sure you want to deactivate this campaign?"))
      return;

    try {
      setLoadingDelete((prev) => ({ ...prev, [campaignId]: true }));
      console.log(`Initiating campaign deletion for ID: ${campaignId}`);

      const contract = await getContract();
      if (!contract) throw new Error("Failed to load contract");

      const tx = await contract.deleteCampaign(campaignId);
      console.log("Delete transaction:", tx);

      const receipt = await tx.wait();
      console.log("Delete receipt:", receipt);

      await getAllCampaigns();
    } catch (err) {
      console.error("Error deactivating campaign:", err);
      alert(err.message || "Failed to deactivate campaign");
    } finally {
      setLoadingDelete((prev) => ({ ...prev, [campaignId]: false }));
    }
  };

  useEffect(() => {
    getAllCampaigns();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center">
        <div className="text-red-500 text-center">
          <p>Error: {error}</p>
          <button
            onClick={getAllCampaigns}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        {campaigns.length === 0 ? (
          <div className="text-center text-gray-300">
            <p className="text-3xl pt-52 flex flex-col items-center justify-center">
              No active campaigns Yet!
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
              Active Campaigns
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col"
                >
                  {campaign.image && (
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6 flex-grow">
                    <h2 className="text-xl font-bold text-white mb-2">
                      {campaign.title}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {campaign.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>
                        <span className="font-medium">Target:</span>{" "}
                        {campaign.target} ETH
                      </p>
                      <p>
                        <span className="font-medium">Collected:</span>{" "}
                        {campaign.amountCollected} ETH
                      </p>
                      <p>
                        <span className="font-medium">Deadline:</span>{" "}
                        {campaign.deadline.toLocaleDateString()}
                      </p>
                      <p className="truncate">
                        <span className="font-medium">Owner:</span>{" "}
                        {campaign.owner.slice(0, 4)}....................
                        {campaign.owner.slice(38, 42)}
                      </p>
                    </div>
                    <div className="mt-6">
                      <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-500 h-full"
                          style={{
                            width: `${Math.min(
                              (Number(campaign.amountCollected) /
                                Number(campaign.target)) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                      <p className="text-right text-sm text-gray-400 mt-1">
                        {(
                          (Number(campaign.amountCollected) /
                            Number(campaign.target)) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                    </div>

                    {/* Updated Input and Donate button */}
                    {!campaign.claimed && new Date() < campaign.deadline && (
                      <div className="mt-6 flex gap-2">
                        <input
                          type="number"
                          placeholder="ETH Amount"
                          className="flex-1 px-2 py-1 bg-gray-800 text-white rounded"
                          min="0"
                          step="0.01"
                          value={donationAmounts[campaign.id] || ""}
                          onChange={(e) =>
                            setDonationAmounts((prev) => ({
                              ...prev,
                              [campaign.id]: e.target.value,
                            }))
                          }
                        />
                        <button
                          onClick={() => {
                            const amount = donationAmounts[campaign.id];
                            if (amount > 0) {
                              handleDonate(campaign.id, amount);
                            }
                          }}
                          disabled={
                            loadingCampaigns[campaign.id] ||
                            !(donationAmounts[campaign.id] > 0)
                          }
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          {loadingCampaigns[campaign.id]
                            ? "Loading..."
                            : "Donate"}
                        </button>
                        <button
                          onClick={() => handleDelete(campaign.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          {loadingDelete[campaign.id]
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    )}
                    {campaign.claimed && (
                      <p className="mt-4 text-green-500 text-center">
                        Campaign funds claimed
                      </p>
                    )}
                    {new Date() >= campaign.deadline && !campaign.claimed && (
                      <p className="mt-4 text-red-500 text-center">
                        Campaign deadline passed, awaiting claim
                      </p>
                    )}
                    {/* Update Campaign Button */}
                    <div className="mt-4">
                      <button
                        onClick={() =>
                          navigate("/updateCampaign", { state: campaign })
                        }
                        className="w-full px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                      >
                        Update Campaign
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignList;
