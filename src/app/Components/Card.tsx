import React from 'react'
import '../style/Card.css'
import Checker from "../../assets/icons8-datasets-64.png"
import identity from "../../assets/icons8-checked-identification-documents-64.png"
import eighteen from "../../assets/icons8-18-100.png"
import { Image } from 'antd'

import AnonLogin from './AnonLogin'
import MeteorCard2 from './meteorCard2'
export default function Card() {
    return (
        <div style={{display:"flex" , justifyContent:"center" , marginTop:"6%"}} className='Anon-card-align'>
            <div className="card">
               <div className="hero BigText text-center mt-8" style={{ marginTop : "20px"}}>
                    <h1 className="text">Verify Anon-Aadhar</h1>
                    <h1 className="text2 mt-3" style={{fontSize:"24px"}}>
                        
Anon Aadhaar is a cutting-edge zero-knowledge protocol developed by the Ethereum Foundation’s Privacy and Scaling Explorations team. It allows Indian citizens with Aadhaar cards to verify their identity without disclosing any personal information. By using zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge), Anon Aadhaar ensures privacy while proving identity
                    </h1>
                </div>
               
               <div style={{display:"flex" , justifyContent:"center" , marginTop:"6%" , marginBottom : "50px"}}>
                <AnonLogin />
               </div>
               <div>
                
               </div>
               
                <MeteorCard2  />
              
           
            </div>
        </div>
        
    )
}
