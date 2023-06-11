// import Image from "next/image";
"use client";
import Web3 from "web3";
import "../styles/style.css";
import React, { useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/constant";
export default function Home() {
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window) {
      const { ethereum } = window;
      if (ethereum) {
        try {
          console.log("account");
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log(account);
          setAddress(account[0]);
          let web3 = new Web3(ethereum);
          let c = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
          setContract(c);
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  };
  console.log("Address ", address);
  console.log("CONTRACT ", contract);

  const mintNft = async () => {
    setLoading(true);
    try {
      // const name = await contract.methods.name().call();
      const mint = await contract.methods.safeMint().send({ from: address });
      console.log(mint);
      setLoading(false);
      console.log("NAME ", name);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <>
      <main className="flex flex-col gap-4 items-center justify-center min-h-screen">
        {loading ? (
          <div className="loader ">
            <div className="cell d-0"></div>
            <div className="cell d-1"></div>
            <div className="cell d-2"></div>

            <div className="cell d-1"></div>
            <div className="cell d-2"></div>

            <div className="cell d-2"></div>
            <div className="cell d-3"></div>

            <div className="cell d-3"></div>
            <div className="cell d-4"></div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold">Interact with contract</h1>
            {address ? (
              <button
                onClick={mintNft}
                className="py-2 px-4 rounded-xl bg-white text-black transform hover:scale-105"
              >
                Mint NFT
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="py-2 px-4 rounded-xl bg-white text-black transform hover:scale-105"
              >
                Connect Wallet
              </button>
            )}
          </>
        )}
      </main>
    </>
  );
}
