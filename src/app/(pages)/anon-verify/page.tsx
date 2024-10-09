/* eslint-disable jsx-a11y/alt-text */
"use client"
import React from 'react'
import Nav from '@/app/Components/Nav'
import Card from '@/app/Components/Card'
import '../../style/AnonNeeds.css'
import ModalReadme from '@/app/Components/ModalReadme'
import verify from "../../../assets/icons8-blockchain-49.png"
import connnecton from "../../assets/icons8-blockchain-60.png"
import phone from "../../assets/icons8-speaker-96.png"
import { Image } from 'antd'

export default function page() {

  return (
    <div>
      <Nav />
      <div style={{ marginTop: "-3%" }}>
        <div style={{zIndex:"1" , marginBottom : "300px"}}>
          <Card />
        </div>
        

        <div style={{ marginTop: "3%" }}>
          <div className="hero text-center mt-8" style={{ marginTop: "100px" }}>
            <h1 className="text-globe">How Does It Exactly Works ?</h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", margin: "2% 8% 9% 8%", fontSize: "20px" }}>
            <p>How Anon Aadhaar Works Anon Aadhaar leverages advanced cryptographic techniques, particularly zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge), to ensure that users can prove their identity without revealing any underlying personal data.
            </p>
            <br></br>
            <p>
Aadhaar Secure QR Code: The foundation of this process lies in the Aadhaar Secure QR code, which encapsulates essential identity data. This QR code is signed by the Unique Identification Authority of India (UIDAI) and contains a SHA-256 hash and an RSA signature.Zero-Knowledge Proof Generation: The core of Anon Aadhaar's privacy-preserving magic happens here. The protocol uses zk-SNARKs to create a proof that validates the correctness of the hash and RSA signature without ever exposing the actual data. This ensures that the identity verification is both secure and private.


            </p><br></br>
            <p>Circuit Implementation: The underlying cryptographic circuit is designed to process and verify the Aadhaar data. It ensures that the user's identity can be authenticated without directly revealing personal details like name, address, or contact information.</p>
          </div>
        </div>


      </div>



    </div>
  )
}


