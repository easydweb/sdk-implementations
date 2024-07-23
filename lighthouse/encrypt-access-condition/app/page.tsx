"use client";
import { useState } from "react";
import { encryptUsingLighthouse, decryptUsingLighthouse } from "../utils";

export default function Home() {
    const [text, setText] = useState<String | null>(null);
    const [cid, setCID] = useState<any>(null);

    async function callEncrypt() {
        const cid = await encryptUsingLighthouse(text);
        setCID(cid);
    }

    async function callDecrypt() {
        const decryptedText = await decryptUsingLighthouse(cid);
    }

    return (
        <div className="flex flex-col gap-[0.8rem] items-center">
          <h2 className="text-2xl flex justify-center">Lighthouse Demo</h2>
            <input
                type="text"
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter Text"
                className="text-black"
            />
            <button onClick={callEncrypt}>Encrypt</button>
            <button onClick={callDecrypt}>Decrypt</button>
            <p>Cid: {cid}</p>
        </div>
    );
}
