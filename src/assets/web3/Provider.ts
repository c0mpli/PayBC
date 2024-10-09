import { ethers } from "ethers";

let provider: ethers.BrowserProvider | null = null;

if (typeof window !== "undefined" && window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
}

export { provider };