import React, { useState } from "react";

import { Currency } from "@dataverse/dataverse-connector";
import LivepeerClient from "@dataverse/livepeer-client-toolkit";

interface IProps {
  address?: string;
  livepeerClient: LivepeerClient;
  setAsset: Function;
}

export const LivepeerWidget = ({
  address,
  livepeerClient,
  setAsset,
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const [fileInput, setFileInput] = useState<any>(null);
  const [streamId, setStreamId] = useState<string>();

  const uploadVideo = async () => {
    if (!fileInput) throw new Error("Please select a file");
    try {
      setLoading(true);
      const res = await livepeerClient.uploadVideo(fileInput);
      console.log("File uploaded successfully, res:", res);
      setAsset(res.videoMeta);
      setStreamId(res.stream.streamId);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error while uploading file:", err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileInput(files[0]);
    } else {
      setFileInput(null);
    }
  };

  const getVideoMetaList = async () => {
    const res = await livepeerClient.getVideoMetaList();
    console.log("getVideoMetaList res:", res);
  };

  const monetizeVideoMeta = async () => {
    if (!streamId || !address) {
      console.error("streamId or address undefined");
      return;
    }
    await livepeerClient.monetizeVideoMeta({
      address,
      streamId,
      lensNickName: "jackieth",
      datatokenVars: {
        currency: Currency.WMATIC,
        amount: 0.0001,
        collectLimit: 1000,
      },
    });
    console.log("monetizeAssetMeta success.");
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} className='upload' />
      <button onClick={uploadVideo} disabled={loading}>
        uploadVideo
      </button>
      <button onClick={getVideoMetaList}>getVideoMetaList</button>
      <button onClick={monetizeVideoMeta}>monetizeVideoMeta</button>
    </div>
  );
};
