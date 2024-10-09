import { ethers } from "ethers";
import { TokenTransferContractAddress } from "@/assets/web3/Address";
import TransferTokensAbi from "@/assets/web3/Abis/TransferTokensAbi.json";

export default function toTransferETH() {
	const getContractETH = async () => {
		try {
			if (typeof window === "undefined" || !window.ethereum) {
				throw new Error("MetaMask not found");
			}

			// Create provider and signer using ethers v6 syntax
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();

			// Create contract instance
			const contract = new ethers.Contract(
				TokenTransferContractAddress,
				TransferTokensAbi,
				signer
			);

			return contract;
		} catch (error) {
			console.error("Error getting contract:", error);
			return null;
		}
	};

	return {
		getContractETH,
	};
}
