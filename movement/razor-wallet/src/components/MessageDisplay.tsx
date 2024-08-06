import React from "react";
import { aptosClient } from "../aptosClient";
import { GET_MESSAGE_FUNCTION } from "../constants";
import { useAptosWallet } from "@razorlabs/wallet-kit";

interface MessageDisplayProps {
  message: string;
  setMessage: (message: string) => void;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  setMessage,
}) => {
  const { address: connectedAddress } = useAptosWallet();

  const handleGetMessage = async () => {
    try {
      const fetchedMessage = await aptosClient().view({
        payload: {
          function: GET_MESSAGE_FUNCTION,
          functionArguments: [connectedAddress],
        },
      });
      // setMessage(fetchedMessage[0]);
      setMessage(fetchedMessage[0])
    } catch (error) {
      setMessage("No message found at your address, create one below!");
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleGetMessage}>Get Message</button>
      <h3>{message}</h3>
    </>
  );
};

export default MessageDisplay;
