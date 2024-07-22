"use client";
import {
    DataverseConnector,
    SYSTEM_CALL,
    RESOURCE,
} from "@dataverse/dataverse-connector";
import React, { useState } from "react";

export default function Home() {
    const [pkh, setPkh] = useState("");
    const [inputs, setInputs] = useState({
        text: "",
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
                appId: "4e6d651a-77ea-441d-9198-a3edf968e9f4",
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
                    "kjzl6hvfrbw6c8eukmrwgbdmhdy2h7vw4l0ypd2yfkli7xfo1qt6ogp3srr376v",
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
                <div>
                    <p>Load File</p>
                    <input
                        type="text"
                        className="text-black"
                        placeholder="file id"
                        onChange={(e) =>
                            setInputs({ ...inputs, fileId: e.target.value })
                        }
                    />
                    <button onClick={loadWithDataverse}>Load</button>
                    <p>data: {fetchedData}</p>
                </div>
            </div>
        </div>
    );
}
