// ------- lighthouse functions

import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import { saveAs } from "file-saver";

const lighthouseKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;

// encrypts a text file using lighthouse with a wallet
export async function encryptUsingLighthouse(textData) {
    try {
        console.log("encrypting..");
        const encryptionAuth = await signAuthMessage();
        if (!encryptionAuth) {
            console.error("Failed to sign the message.");
            return;
        }

        const { signature, signerAddress } = encryptionAuth;

        // for a text upload
        const output = await lighthouse.textUploadEncrypted(
            textData,
            lighthouseKey,
            signerAddress,
            signature
        );

        // for a file upload
        // const output = await lighthouse.uploadEncrypted(
        //     file,
        //     apiKey,
        //     signerAddress,
        //     signature,
        //   )

        console.log("Upload Successful", output);
        console.log("cid", output.data.Hash);

        return output.data.Hash;
    } catch (error) {
        console.error("Error uploading encrypted file:", error);
    }
}

// decrypts the file using the same wallet that encrypted it
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