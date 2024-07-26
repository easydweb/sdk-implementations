import { Hex, createWalletClient, http, publicActions } from "viem";
import { arbitrumSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import Example from "../artifacts/Example.json";
import dotenv from "dotenv";

dotenv.config();

const { abi, bin } = Example["contracts"]["contracts/Example.sol:Example"];
const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(privateKey as Hex);

(async () => {
  const client = createWalletClient({
    account,
    chain: arbitrumSepolia,
    transport: http(process.env.API_URL),
  }).extend(publicActions);

  const hash = await client.deployContract({
    abi,
    bytecode: `0x${bin}`,
  });

  const receipt = await client.getTransactionReceipt({ hash });
  console.log(receipt);
})();
