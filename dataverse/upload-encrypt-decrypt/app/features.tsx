// similar to page.tsx
"use client";
import {
    DataverseConnector,
    SYSTEM_CALL,
    RESOURCE,
} from "@dataverse/dataverse-connector";
import React, { useState } from "react";

export default function Home() {
    const [conditionAddress, setConditionAddress] = useState();
    const [pkh, setPkh] = useState("");
    const [inputs, setInputs] = useState({
        text: "",
        updateText: "",
        fileId: "",
    });

    const [fetchedData, setFetchedData] = useState<any>();
    const [fileId, setFileId] = useState<String | undefined>();
    const [loading, setLoading] = useState(false);

    const dataverseConnector = new DataverseConnector();

    const login = async () => {
        await createCapability();
    };
    
    const createCapability = async () => {
        await dataverseConnector.connectWallet();
        const pkh = await dataverseConnector.runOS({
            method: SYSTEM_CALL.createCapability,
            params: {
                appId: "f5661a5a-cbe3-4c00-862f-cf8f8ac38899",
                resource: RESOURCE.CERAMIC,
            },
        });
        console.log("pkh:", pkh);
        setPkh(pkh);
        return pkh;
    };

    const uploadWithDataverse = async () => {
        setLoading(true);
        const encrypted = JSON.stringify({
            text: false,
            images: false,
            videos: false,
        });

        await dataverseConnector.connectWallet();
        const res = await dataverseConnector.runOS({
            method: SYSTEM_CALL.createIndexFile,
            params: {
                modelId:
                    "kjzl6hvfrbw6c56aaaabngouspro7na03id4zdvvuax1lpakx48soehix9dnk69",
                fileName: "test",
                fileContent: {
                    modelVersion: "0",
                    text: inputs.text,
                    images: [],
                    videos: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    encrypted,
                },
            },
        });
        // console.log("file id:", res.fileContent.file.contentId);
        setFileId(res.fileContent.file.contentId);
        setLoading(false);
    };

    const loadWithDataverse = async () => {
        const res = await dataverseConnector.runOS({
            method: SYSTEM_CALL.loadFile,
            params: inputs.fileId,
        });

        setFetchedData(res.fileContent.content.text);
        console.log("fetched", res.fileContent.content.text);

        console.log(res);
    };

    const updateWithDataverse = async () => {
        const encrypted = JSON.stringify({
            text: false,
            images: false,
            videos: false,
        });

        await dataverseConnector.connectWallet();
        const res = await dataverseConnector.runOS({
            method: SYSTEM_CALL.updateIndexFile,
            params: {
                fileId: inputs.fileId,
                fileName: "test",
                fileContent: {
                    modelVersion: "0",
                    text: inputs.text,
                    images: [],
                    videos: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    encrypted,
                },
            },
        });
        console.log("file id:", res);
        setFileId(res.fileContent.file.contentId);
    };

    return (
        <div>
            <div className=" mb-4">
                {pkh ? (
                    <p>{pkh}</p>
                ) : (
                    <button onClick={login}>Connect Wallet</button>
                )}
            </div>
            <div className=" mb-4">
                <p>Upload File</p>
                <input
                    type="text"
                    className="text-black"
                    onChange={(e) =>
                        setInputs({ ...inputs, text: e.target.value })
                    }
                />
                <button onClick={uploadWithDataverse}>Upload</button>
                {loading ? <p>Loading..</p> : <p>file id: {fileId}</p>}
            </div>
            <div className=" mb-4">
                <p>Update File</p>
                <input
                    type="text"
                    className="text-black"
                    placeholder="file id"
                    onChange={(e) =>
                        setInputs({ ...inputs, fileId: e.target.value })
                    }
                />
                <input
                    type="text"
                    className="text-black"
                    placeholder="inputs"
                    onChange={(e) =>
                        setInputs({ ...inputs, updateText: e.target.value })
                    }
                />
                <button onClick={updateWithDataverse}>Update</button>
                <p>file id: {fileId}</p>
            </div>
            <div className=" mb-4">
                <p>Load File</p>
                <input
                    type="text"
                    className="text-black"
                    onChange={(e) =>
                        setInputs({ ...inputs, fileId: e.target.value })
                    }
                />
                <button onClick={loadWithDataverse}>Load</button>
                <p>data: {fetchedData}</p>
            </div>
        </div>
    );
}
