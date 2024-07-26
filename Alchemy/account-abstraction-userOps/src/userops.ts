import { LocalAccountSigner, arbitrumSepolia } from "@alchemy/aa-core";
import Example from "../artifacts/Example.json";
import dotenv from "dotenv";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { Hex, encodeFunctionData } from "viem";

dotenv.config();

const { abi } = Example["contracts"]["contracts/Example.sol:Example"];

const privateKey = require("crypto").randomBytes(32).toString("hex");
// signer (userop) -> bundler eoa (transaction [userop,userop]) -> EP -> sca -> contract
const signer = LocalAccountSigner.privateKeyToAccountSigner(`0x${privateKey}`);

const contractAddress: Hex = "0x6ECC0b414881E2E6d1b5fd8C3C25789D83a1c933";

(async () => {
  // modular account client
  const client = await createModularAccountAlchemyClient({
    apiKey: process.env.ALCHEMY_API_KEY!,
    chain: arbitrumSepolia,
    signer,
    gasManagerConfig: {
      policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID!,
    },
  });

  const uos = [1, 2, 3, 4, 5, 6, 7].map((num) => {
    return {
      target: contractAddress,
      data: encodeFunctionData({
        abi,
        functionName: "changeNum",
        args: [num],
      }),
    };
  });

  const result = await client.sendUserOperation({
    uo: uos,
  });
  const transactionHash = await client.waitForUserOperationTransaction(result);
  console.log(transactionHash);

  const x = await client.readContract({
    abi,
    address: contractAddress,
    functionName: "num",
  });

  console.log(x);
})();
