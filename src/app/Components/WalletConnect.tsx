"use client"
import React from 'react'
import Connect from './ConnectButton'
import { FaRegCreditCard } from "react-icons/fa";
import { AnonAadhaarProof, LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";
export default function Hero() {

  const [anonAadhaar] = useAnonAadhaar();
  React.useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "10%" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "65px", fontWeight: 400 }}>Empowering Transactions</div>
          <div style={{ fontSize: "65px", fontWeight: 400 }}> with Blockchain Technology</div>
          <div style={{ fontSize: "18px", color: "GrayText", fontWeight: 600 }}>Fast, Reliable, and Transparent Payments</div></div>
        <div style={{marginTop:"5%"}}>
          <Connect />
        </div>
      </div>

    </>
  )
}







{/* <div>
          <div style={{ fontSize: "65px", fontWeight: 400 }}>Empowering Transactions</div>
          <div style={{ fontSize: "65px", fontWeight: 400 }}> with Blockchain Technology</div>
          <div style={{ fontSize: "18px", color: "GrayText", fontWeight: 600 }}>Fast, Reliable, and Transparent Payments</div></div> */}