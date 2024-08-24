import React, { ChangeEvent, FormEvent, useState } from "react";
import { SET_MESSAGE_FUNCTION } from "../constants";
import { useAptosWallet } from "@razorlabs/wallet-kit";
import "../App.css";

interface MessageDisplayProps {
  message: string;
  setMessage: (message: string) => void;
}

const MessageCreate: React.FC<MessageDisplayProps> = ({ setMessage }) => {
  const [inputMessage, setInputMessage] = useState("");
  const { signAndSubmitTransaction } = useAptosWallet();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await signAndSubmitTransaction({
        payload: {
          function: SET_MESSAGE_FUNCTION,
          functionArguments: [inputMessage],
        },
      });
      setMessage("Transacting...");
      if (result.status === "Approved") {
        setMessage(inputMessage);
        alert(
          `Transaction: https://explorer.movementlabs.xyz/txn/${result.args.hash}?network=testnet`
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="message-create-container">
      <form onSubmit={handleSubmit} className="message-form">
        <label htmlFor="messageInput" className="message-label">
          New Message:
        </label>
        <input
          type="text"
          id="messageInput"
          value={inputMessage}
          onChange={handleChange}
          required
          className="message-input"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MessageCreate;
