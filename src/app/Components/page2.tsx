'use client';

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toTransferPolygon from "@/hooks/toTransferPolygon";
import toTransferETH from "@/hooks/toTransferETH";
import toTransferBSC from "@/hooks/toTransferBSC";
import { formatEther } from "ethers";
import { RootState } from "@/provider/redux/store";
import Nav from "@/app/Components/Nav";
import { Card } from "antd";
import '../../style/Sound.css'

const SoundBox = () => {
  const [type, setType] = useState<string>("ETH");
  const [eventData, setEventData] = useState<{ from: string; to: string; amount: string; name: string; blockchain: string; } | null>(null);
  const accountName = useSelector((state: RootState) => state.SetAccount.name);

  useEffect(() => {
    let contractEventListeners: (() => void)[] = [];

    const setupListener = async () => {
      const handleTransferEvent = (_from: string, _to: string, _amount: string, _name: string, _blockchain: string) => {
        const message = `${_from} sent ${formatEther(_amount)} to ${_to} on ${_blockchain} blockchain with name ${_name}`;
        console.log("Event Data:", message);
        if (_to.toLowerCase() === accountName.toLowerCase()) {
          setEventData({ from: _from, to: _to, amount: formatEther(_amount), name: _name, blockchain: _blockchain });
        }
      };

      const setupEventListener = async (getContract: any) => {
        const TransferTokenContract = getContract();
        console.log("Contract:", TransferTokenContract);

        await TransferTokenContract.on("Transfer", handleTransferEvent);
        contractEventListeners.push(() => TransferTokenContract.removeAllListeners("Transfer"));
      };

      if (type === 'ETH') {
        const { getContractETH } = toTransferETH();
        await setupEventListener(getContractETH);
      } else if (type === 'BSC') {
        const { getContractBSC } = toTransferBSC();
        await setupEventListener(getContractBSC);
      } else if (type === 'PLG') {
        const { getContractPolygon } = toTransferPolygon();
        await setupEventListener(getContractPolygon);
      }
    };

    setupListener();

    return () => {
      contractEventListeners.forEach(removeListener => removeListener());
    };
  }, [type, accountName]);

  useEffect(() => {
    if (eventData) {
      const message = `${eventData.from} sent ${eventData.amount} to ${eventData.to} on ${eventData.blockchain} blockchain with name ${eventData.name}`;
      console.log("Speaking:", message);
      speak(message);
    }
  }, [eventData]);

  const speak = (text: string) => {
    if (!speechSynthesis) {
      console.error("SpeechSynthesis API is not available.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0] || null; // Use the first available voice or null
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <Nav />
      <Card className="Card">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <select onChange={(e) => setType(e.target.value)} value={type} className="select-box">
            <option value="ETH">Ethereum</option>
            <option value="BSC">Binance Smart Chain</option>
            <option value="PLG">Polygon</option>
          </select>
        </div>

        <div className="amount">12,378,954,61</div>
        <div className="trans">Transaction Details</div>
        <div className="display-box">
          {eventData ? (
            <>
              <div className="block-align">
                <div className="card">
                  <div className="card__content">
                    <p style={{ padding: "10px" }}>From: {eventData.from}</p>
                  </div>
                </div>
              </div>
              <div className="block-align">
                <div className="card">
                  <div className="card__content">
                    <p style={{ padding: "10px" }}>To: {eventData.to}</p>
                  </div>
                </div>
              </div>
              <div className="block-align">
                <div className="card">
                  <div className="card__content">
                    <p style={{ padding: "10px" }}>Amount: {eventData.amount}</p>
                  </div>
                </div>
              </div>
              <div className="block-align">
                <div className="card">
                  <div className="card__content">
                    <p style={{ padding: "10px" }}>Name: {eventData.name}</p>
                  </div>
                </div>
              </div>
              <div className="block-align">
                <div className="card">
                  <div className="card__content">
                    <p style={{ padding: "10px" }}>Blockchain: {eventData.blockchain}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <><div className="block-align">
            <div className="card">
              <div className="card__content">
                <p style={{ padding: "10px" }}>From: </p>
              </div>
            </div>
          </div>
          <div className="block-align">
            <div className="card">
              <div className="card__content">
                <p style={{ padding: "10px" }}>To: </p>
              </div>
            </div>
          </div>
          <div className="block-align">
            <div className="card">
              <div className="card__content">
                <p style={{ padding: "10px" }}>Name: </p>
              </div>
            </div>
          </div>
          <div className="block-align">
            <div className="card">
              <div className="card__content">
                <p style={{ padding: "10px" }}>Blockchain: </p>
              </div>
            </div>
          </div></>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SoundBox;
