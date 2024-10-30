import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getContract } from "../helper/contract";
import { uploadToIPFS } from "../helper/ipfsService";
import Loader from "./Loader";

const UpdateCampaign = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const campaignData = location.state;

  const [formData, setFormData] = useState({
    title: campaignData.title || "",
    description: campaignData.description || "",
    target: campaignData.target || "",
    image: campaignData.image || "",
    deadline: new Date(campaignData.deadline).toISOString().split("T")[0] || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(formData.image);
  const [image, setImage] = useState(null);
  const [imageMethod, setImageMethod] = useState("url");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const contract = await getContract();
      if (!contract) throw new Error("Failed to load contract");

      // Handle image upload/URL
      let finalImageUrl = formData.image;
      if (imageMethod === "upload" && image) {
        const imageUpload = await uploadToIPFS(image);
        if (!imageUpload || !imageUpload.url) {
          throw new Error("Failed to upload image");
        }
        finalImageUrl = imageUpload.url;
      }

      // Create metadata object
      const metadata = {
        title: formData.title,
        description: formData.description,
        image: finalImageUrl,
      };

      // Upload metadata to IPFS
      const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
      });
      const metadataUpload = await uploadToIPFS(metadataBlob);
      if (!metadataUpload || !metadataUpload.url) {
        throw new Error("Failed to upload metadata");
      }

      // Convert target amount to Wei
      const targetAmount = ethers.parseUnits(
        formData.target.toString(),
        "ether"
      );

      // Convert deadline to Unix timestamp
      const deadlineTimestamp = Math.floor(
        new Date(formData.deadline).getTime() / 1000
      );

      // Call smart contract to update campaign
      const tx = await contract.updateCampaign(
        campaignData.id, // Campaign ID
        metadataUpload.url, // IPFS URL for metadata
        targetAmount, // Target amount in Wei
        deadlineTimestamp // Deadline timestamp
      );

      await tx.wait(); // Wait for transaction to be mined

      console.log("Campaign updated successfully!");
      navigate("/"); // Redirect to home page after successful update
    } catch (err) {
      console.error("Error updating campaign:", err);
      setError(err.message || "Failed to update campaign");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData.image) {
      setImagePreview(formData.image);
    }
  }, [formData.image]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Update Campaign
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-400"
            >
              Campaign Title
            </label>
            <input
              id="title"
              type="text"
              className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>

          {/* Description Input */}
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-400"
            >
              Description
            </label>
            <textarea
              id="description"
              className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
            />
          </div>

          {/* Target Input */}
          <div className="mt-4">
            <label
              htmlFor="target"
              className="block text-sm font-medium text-gray-400"
            >
              Funding Target (in ETH)
            </label>
            <input
              id="target"
              type="number"
              className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              value={formData.target}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, target: e.target.value }))
              }
              required
            />
          </div>

          {/* Image Input */}
          <div className="mt-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-400"
            >
              Campaign Image URL
            </label>
            <input
              id="image"
              type="url"
              className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              value={formData.image}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, image: e.target.value }))
              }
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image preview"
                className="mt-2 h-32 w-32 object-cover"
              />
            )}
          </div>

          {/* Image Upload Option */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-400">
              Image Method
            </label>
            <select
              value={imageMethod}
              onChange={(e) => setImageMethod(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            >
              <option value="url">URL</option>
              <option value="upload">Upload</option>
            </select>
            {imageMethod === "upload" && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 p-2 text-gray-900"
              />
            )}
          </div>

          {/* Deadline Input */}
          <div className="mt-4">
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-400"
            >
              Campaign Deadline
            </label>
            <input
              id="deadline"
              type="date"
              className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              value={formData.deadline}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, deadline: e.target.value }))
              }
              min={new Date().toISOString().split("T")[0]} // Ensure the minimum date is today
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
          >
            {loading ? "Updating..." : "Update Campaign"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateCampaign;
