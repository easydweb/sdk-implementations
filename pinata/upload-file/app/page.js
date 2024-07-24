"use client"
import Image from "next/image";
import { uploadFileToIPFS } from "@/utils";
import { useState } from "react";



export default function Home() {
  const [file, setFile] = useState()
  const [uploadedFileIpfsHash, setUploadedFileIpfsHash] = useState("")
  function handleFileChange(e) {
    const fileBlob = e.target.files[0]
    if (fileBlob) {
      setFile(fileBlob)
    }
  }
  async function uploadFile() {
    if (file) {
      const res = await uploadFileToIPFS(file)
      setUploadedFileIpfsHash(res)
    } else {
      console.log("empty data sent as file")
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center space-y-24 p-24">

      <input onChange={handleFileChange} type="file" name="" id="" />
      <button className="border-4 border-white rounded-xl p-6 " onClick={uploadFile}>upload to ipfs Using pinata</button>
      <p>ipfs hash : {uploadedFileIpfsHash}</p>

    </main>
  );
}