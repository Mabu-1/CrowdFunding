import { pinata } from '../utils/config';

export const uploadToIPFS = async (file) => {
    try {
        if (!file) return null;
        const upload = await pinata.upload.file(file);
        const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash);

        console.log("upload=>", upload)
        console.log("ipfsURL=>", ipfsUrl)

        return {
            hash: upload.IpfsHash,
            url: ipfsUrl
        };
    } catch (error) {
        console.error("IPFS upload failed:", error);
        throw error;
    }
};