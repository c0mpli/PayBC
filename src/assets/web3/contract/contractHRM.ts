import { provider } from "@/assets/web3/Provider";
import toTransferHarmony from "@/hooks/toTransferHarmony";

const { getContractHarmony } = toTransferHarmony();
const TransferTokenContract = getContractHarmony();

export const transferHarmony = async (to:string, amountInWei:string, account:string, name: string, blockchain: string) => {
    try {
        const signer = await provider!.getSigner(account);
        console.log("Signer:", signer);
        const contractWithSigner = TransferTokenContract.connect(signer);
        // @ts-ignore
        const tx = await contractWithSigner.transferEther(
            to,
            name,
            blockchain,
            {
                gasLimit: 300000,
                value: amountInWei,
            }
        );
        await tx.wait();
        return tx.hash;
    } catch (error) {
        console.error("Error transferring ether:", error);
        throw error;
    }
};