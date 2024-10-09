/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import "../style/About.css"
import sound from "../../assets/advertisement.png"
import verify from "../../assets/icons8-blockchain-98.png"
import connnecton from "../../assets/icons8-blockchain-60.png"
import phone from "../../assets/icons8-speaker-96.png"
import { Image } from 'antd'

export default function About() {
    return (
        <div>
            <div className='cards-layout'>

                <div className='cards-child'>
                <div
                        className="h-[22em] w-[20em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[#5a58d76c] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]"
                    >
                        <div>
                            <div style={{display:"flex" , justifyContent:"center"}}>
                            <Image preview={false} src={verify.src} width={85} height={90} ></Image>
                            </div>
                            
                            <p className="text-[0.85em]" style={{marginTop:"15%",fontSize:"16px"}}>
                            Seamlessly onboard with our secure, anonymous Aadhaar-based KYC system for fast and private verification.

                            </p>
                        </div>

                        
                    </div>
                </div>
                <div>
                <div
                        className="h-[22em] w-[20em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[#5a58d76c] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]"
                    >
                        <div>
                            <div style={{display:"flex", justifyContent:"center"}}><Image preview={false} src={connnecton.src}  width={85} height={90}></Image></div>
                            
                            <p className="text-[0.85em]" style={{marginTop:"15%",fontSize:"16px"}}>
                            Transfer Ethereum across multiple EVM-based blockchains in various currencies with ease and security.

                            </p>
                        </div>

                        
                    </div>
                </div>
                <div>
                  
                <div
                        className="h-[22em] w-[20em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[#5a58d76c] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]"
                    >
                        <div>
                            <div style={{display:"flex", justifyContent:"center"}}>
                            <Image preview={false} src={phone.src}  width={85} height={90}></Image>    
                            </div>
                            
                            <p className="text-[0.85em]" style={{marginTop:"15%" , fontSize:"16px"}}>
                            Receive real-time audio notifications for your transactions and select specific blockchains to monitor for precise updates.
                            </p>
                        </div>

                    </div>
                </div>


            </div>

        </div>
    )
}


 {/*  <Image src={sound.src} width={150} height={150}></Image>
                    <p>Lorem idivsum dolor sit amet, consectetuer adidiviscing elit. Aenean commodo
                        ligula eget dolor. Aenean massa</p> */}