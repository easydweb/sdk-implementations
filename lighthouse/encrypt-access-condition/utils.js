import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import { saveAs } from "file-saver";

// ------- lighthouse functions

const lighthouseKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;

const nftAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME;

// encrypts a text file using lighthouse
export async function encryptUsingLighthouse(textData) {
    try {
        console.log("encrypting..");
        const encryptionAuth = await signAuthMessage();
        if (!encryptionAuth) {
            console.error("Failed to sign the message.");
            return;
        }

        const { signature, signerAddress } = encryptionAuth;

        const output = await lighthouse.textUploadEncrypted(
            textData,
            lighthouseKey,
            signerAddress,
            signature
        );

        console.log("Upload Successful", output);

        await applyAccessConditions(output.data.Hash);
        console.log("cid", output.data.Hash);

        return output.data.Hash;
    } catch (error) {
        console.error("Error uploading encrypted file:", error);
    }
}

// decrypts a text file checking its access condition
export async function decryptUsingLighthouse(_cid) {
    console.log("decrypting..");
    const { publicKey, signedMessage } = await encryptionSignature();
    const keyObject = await lighthouse.fetchEncryptionKey(
        _cid,
        publicKey,
        signedMessage
    );
    const fileType = "text/json";
    const decrypted = await lighthouse.decryptFile(
        _cid,
        keyObject.data.key,
        fileType
    );
    console.log(decrypted);
    const url = URL.createObjectURL(decrypted);
    console.log(url);
    Download(_cid, url);
    return url;
}

// https://docs.lighthouse.storage/lighthouse-1/how-to/encryption-features/access-control-conditions
// following condition specifies that the user must have at least 1 NFT in the nftAddress contract to access the file
const applyAccessConditions = async (_cid) => {
    const conditions = [
        {
            id: 1,
            chain: chainName,
            method: "balanceOf",
            standardContractType: "ERC721",
            contractAddress: nftAddress,
            returnValueTest: { comparator: ">=", value: "1" },
            parameters: [":userAddress"],
        },
    ];

    const aggregator = "([1])"; // Logical aggregator for conditions.
    const { publicKey, signedMessage } = await encryptionSignature();

    const response = await lighthouse.applyAccessCondition(
        publicKey,
        _cid,
        signedMessage,
        conditions,
        aggregator
    );

    console.log("access condition res:", response);
};

const signAuthMessage = async () => {
    if (window.ethereum) {
        try {
            const accounts = await window?.ethereum?.request({
                method: "eth_requestAccounts",
            });
            if (accounts.length === 0) {
                throw new Error("No accounts returned from Wallet.");
            }
            const signerAddress = accounts[0];
            const { message } = (await lighthouse.getAuthMessage(signerAddress))
                .data;
            const signature = await window.ethereum.request({
                method: "personal_sign",
                params: [message, signerAddress],
            });
            return { signature, signerAddress };
        } catch (error) {
            console.error("Error signing message with Wallet", error);
            return null;
        }
    } else {
        console.log("Please install Wallet!");
        return null;
    }
};

const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
        .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
        signedMessage: signedMessage,
        publicKey: address,
    };
};

async function Download(_fileName, _fileUrl) {
    const name = _fileName + ".txt";
    const fileUrl = _fileUrl;
    saveAs(fileUrl, name);
    console.log("executed");
}