import React, { useState, useEffect, useCallback, useContext } from "react";

import { Currency } from "@dataverse/dataverse-connector";
import {
  useApp,
  useCollectFile,
  useCreateIndexFile,
  useDatatokenInfo,
  useFeedsByAddress,
  useMonetizeFile,
  useStore,
  useUnlockFile,
  useUpdateIndexFile,
} from "@dataverse/hooks";
import { Model } from "@dataverse/model-parser";
import ReactJson from "react-json-view";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../main";

export const Home = () => {
  const { modelParser, appVersion: postVersion } = useContext(AppContext);
  const navigate = useNavigate();
  const [postModel, setPostModel] = useState<Model>();
  const [currentFileId, setCurrentFileId] = useState<string>();

  useEffect(() => {
    const postModel = modelParser.getModelByName("post");
    setPostModel(postModel);
  }, []);

  /**
   * @summary import from @dataverse/hooks
   */

  const { pkh, filesMap: posts } = useStore();

  const { connectApp } = useApp({
    appId: modelParser.appId,
    autoConnect: true,
    onSuccess: result => {
      console.log("[connect]connect app success, result:", result);
    },
  });

  const { createdIndexFile, createIndexFile } = useCreateIndexFile({
    onSuccess: result => {
      console.log("[createFile]create file success:", result);
      setCurrentFileId(result.fileContent.file.fileId);
    },
  });

  const {
    createdIndexFile: createdEncryptedFile,
    createIndexFile: createEncryptedFile,
  } = useCreateIndexFile({
    onSuccess: result => {
      console.log(
        "[createEncryptedFile]create encrypted file success:",
        result,
      );
      setCurrentFileId(result.fileContent.file.fileId);
    },
  });

  const { loadFeedsByAddress } = useFeedsByAddress({
    onError: error => {
      console.error("[loadPosts]load files failed,", error);
    },
    onSuccess: result => {
      console.log("[loadPosts]load files success, result:", result);
    },
  });

  const { updatedFileContent: updatedPost, updateIndexFile } =
    useUpdateIndexFile({
      onSuccess: result => {
        console.log("[updateFile]update file success, result:", result);
      },
    });

  const { monetizedFileContent: monetizedPost, monetizeFile } = useMonetizeFile(
    {
      onSuccess: result => {
        console.log("[monetize]monetize file success, result:", result);
      },
    },
  );

  const { datatokenInfo, getDatatokenInfo } = useDatatokenInfo({
    onSuccess: result => {
      console.log("[datatokenInfo]get datatoken info success, result:", result);
    },
  });

  const { collectedFileContent: collectedPost, collectFile } = useCollectFile({
    onSuccess: result => {
      console.log("[collectFile]collect file success, result:", result);
    },
  });

  const { unlockedFileContent: unlockedPost, unlockFile } = useUnlockFile({
    onSuccess: result => {
      console.log("[unlockPost]unlock file success, result:", result);
    },
  });

  /**
   * @summary custom methods
   */
  const connect = useCallback(async () => {
    connectApp();
  }, [connectApp]);

  const createPost = useCallback(async () => {
    if (!postModel) {
      console.error("postModel undefined");
      return;
    }

    createIndexFile({
      modelId: postModel.streams[postModel.streams.length - 1].modelId,
      fileName: "create file test",
      fileContent: {
        modelVersion: postVersion,
        text: "hello",
        images: [
          "https://bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4.ipfs.w3s.link",
        ],
        videos: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }, [postModel, createIndexFile]);

  const createEncryptedPost = useCallback(async () => {
    if (!postModel) {
      console.error("postModel undefined");
      return;
    }

    createEncryptedFile({
      modelId: postModel.streams[postModel.streams.length - 1].modelId,
      fileName: "create file test",
      fileContent: {
        modelVersion: postVersion,
        text: "hello",
        images: [
          "https://bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4.ipfs.w3s.link",
        ],
        videos: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        encrypted: {
          text: true,
          images: true,
          videos: false,
        },
      },
    });
  }, [postModel, createEncryptedFile]);

  const loadPosts = useCallback(async () => {
    if (!postModel) {
      console.error("postModel undefined");
      return;
    }
    if (!pkh) {
      console.error("pkh undefined");
      return;
    }

    await loadFeedsByAddress({
      pkh,
      modelId: postModel.streams[postModel.streams.length - 1].modelId,
    });
  }, [postModel, pkh, loadFeedsByAddress]);

  const updatePost = useCallback(async () => {
    if (!currentFileId) {
      console.error("currentFileId undefined");
      return;
    }
    updateIndexFile({
      fileId: currentFileId,
      fileName: "update file test",
      fileContent: {
        text: "update my post -- " + new Date().toISOString(),
        images: [
          "https://bafkreidhjbco3nh4uc7wwt5c7auirotd76ch6hlzpps7bwdvgckflp7zmi.ipfs.w3s.link",
        ],
      },
      encrypted: {
        text: true,
        images: true,
        videos: false,
      },
    });
  }, [currentFileId, updateIndexFile]);

  const monetizePost = useCallback(async () => {
    if (!currentFileId) {
      console.error("currentFileId undefined");
      return;
    }

    monetizeFile({
      fileId: currentFileId,
      datatokenVars: {
        currency: Currency.WMATIC,
        amount: 0.0001,
        collectLimit: 1000,
      },
      unlockingTimeStamp: String(Date.now() / 1000 + 5 * 60),
    });
  }, [currentFileId, monetizeFile]);

  const getDatatokenInfoByFileId = useCallback(async () => {
    if (!currentFileId) {
      console.error("currentFileId undefined");
      return;
    }
    getDatatokenInfo(currentFileId);
  }, [getDatatokenInfo, currentFileId]);

  const collectPost = useCallback(async () => {
    if (!currentFileId) {
      console.error("currentFileId undefined");
      return;
    }
    collectFile(currentFileId);
  }, [collectFile]);

  const unlockPost = useCallback(async () => {
    if (!currentFileId) {
      console.error("currentFileId undefined");
      return;
    }
    unlockFile(currentFileId);
  }, [unlockFile]);

  return (
    <>
      <button onClick={connect}>connect</button>
      <div className='black-text'>{pkh}</div>
      <hr />
      <button onClick={createPost}>createPost</button>
      {createdIndexFile && (
        <div className='json-view'>
          <ReactJson src={createdIndexFile} collapsed={true} />
        </div>
      )}
      <button onClick={createEncryptedPost}>createEncryptedPost</button>
      {createdEncryptedFile && (
        <div className='json-view'>
          <ReactJson src={createdEncryptedFile} collapsed={true} />
        </div>
      )}
      <button onClick={loadPosts}>loadPosts</button>
      {posts && (
        <div className='json-view'>
          <ReactJson src={posts} collapsed={true} />
        </div>
      )}
      <button onClick={updatePost}>updatePost</button>
      {updatedPost && (
        <div className='json-view'>
          <ReactJson src={updatedPost} collapsed={true} />
        </div>
      )}
      <button onClick={monetizePost}>monetizePost</button>
      {monetizedPost && (
        <div className='json-view'>
          <ReactJson src={monetizedPost} collapsed={true} />
        </div>
      )}
      <button onClick={getDatatokenInfoByFileId}>datatokenInfo</button>
      {datatokenInfo && (
        <div className='json-view'>
          <ReactJson src={datatokenInfo} collapsed={true} />
        </div>
      )}
      <br />
      <div className='red'>
        You need to switch another account to collect the post and unlock the
        post.
      </div>
      <button onClick={collectPost}>collectPost</button>
      {collectedPost && (
        <div className='json-view'>
          <ReactJson src={collectedPost} collapsed={true} />
        </div>
      )}
      <button onClick={unlockPost}>unlockPost</button>
      {unlockedPost && (
        <div className='json-view'>
          <ReactJson src={unlockedPost} collapsed={true} />
        </div>
      )}
      <hr />
      <button onClick={() => navigate("/toolkits")}>Go To Toolkits Page</button>
      <br />
    </>
  );
};
