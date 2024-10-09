"use client";
import React, { useEffect, useState } from "react";
import { Card, Image } from "antd";
import { useSelector } from "react-redux";
import { ethers, formatEther } from "ethers";
import { Alchemy, Network, AlchemySubscription } from "alchemy-sdk";
import Nav from "@/app/Components/Nav";
import Loader from "@/app/Components/Loader";
import { RootState } from "@/provider/redux/store";
import "../../style/Sound2.css";
import QR from "../../../assets/QR.png";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function Page() {
	const [eventData, setEventData] = useState<{
		from: string;
		to: string;
		amount: string;
		name: string;
		blockchain: string;
	} | null>(null);
	const [audioUrl, setAudioUrl] = useState<string | null>(null); // State to hold the audio URL

	const accountName = useSelector((state: RootState) => state.SetAccount.name);
	const router = useRouter();

	useEffect(() => {
		if (!accountName) {
			router.push("/");
		}
	}, [accountName]);

	useEffect(() => {
		//clear the event data after 10 seconds
		const timeout = setTimeout(() => {
			setEventData(null);
			setAudioUrl(null);
		}, 20000);
		//71e89a0c05b448458d48ef45235ce7c8

		return () => clearTimeout(timeout);
	}, [eventData]);

	useEffect(() => {
		let alchemy: Alchemy | null = null;

		const setupTransactionListener = async () => {
			try {
				// Configure Alchemy SDK
				alchemy = new Alchemy({
					apiKey: "_gPw1Qyi1DIUueFZi2-5ia42ZA3OJy7l", // Replace with your Alchemy API key
					network: Network.ETH_SEPOLIA, // Use the appropriate network
				});

				console.log("Setting up listener for account:", accountName);

				alchemy.ws.on("block", async (blockNumber) => {
					console.log("Checking block", blockNumber);
					const block = await alchemy?.core.getBlockWithTransactions(
						blockNumber
					);

					block?.transactions.forEach(async (tx) => {
						if (tx.to && tx.to.toLowerCase() === accountName.toLowerCase()) {
							console.log("Confirmed transaction to account detected:", tx);
							// const data = {
							// 	voice_engine: "PlayHT2.0-turbo",
							// 	text: `पेबीसी पर ${formatEther(
							// 		tx.value.toString()
							// 	)} ईथर प्राप्त हुए`,
							// 	voice:
							// 		"s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
							// 	output_format: "mp3",
							// 	sample_rate: "44100",
							// 	speed: 1,
							// };
							// axios
							// 	.post(url, data, { ...options, responseType: "blob" }) // Get the response as a Blob
							// 	.then((response) => {
							// 		const audioBlob = new Blob([response.data], {
							// 			type: "audio/mpeg",
							// 		});
							// 		const audioUrl = URL.createObjectURL(audioBlob);
							// 		setAudioUrl(audioUrl); // Set the audio URL for playback
							// 	})
							// 	.catch((error) => {
							// 		console.error("Error:", error.message);
							// 	});

							const res = await axios.get(
								`http://api.voicerss.org/?key=71e89a0c05b448458d48ef45235ce7c8&hl=hi-in&c=MP3&src=पेबीसी,पर,${formatEther(
									tx.value.toString()
								)},ईथर,प्राप्त,हुए`,
								{ responseType: "blob" } // Set the response type to 'blob'
							);
							// Create a URL for the audio blob
							const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
							//res is the audio file in mp3 format
							//play the audio file
							const audioUrl = URL.createObjectURL(audioBlob);
							setAudioUrl(audioUrl);
							setEventData({
								from: tx.from,
								to: tx.to,
								amount: formatEther(tx.value.toString()),
								name: "ETH",
								blockchain: "Sepolia",
							});
						}
					});
				});

				alchemy.ws.on(
					{
						method: AlchemySubscription.PENDING_TRANSACTIONS,
						toAddress: accountName,
					},
					(tx) => console.log(tx)
				);
			} catch (error) {
				console.error("Error setting up transaction listener:", error);
			}
		};

		if (accountName) {
			setupTransactionListener();
		}
	}, [accountName]);

	useEffect(() => {
		if (audioUrl) {
			const audio = new Audio(audioUrl);
			audio.play();
		}
	}, [audioUrl]);

	return (
		<div>
			<Nav />
			<div
				style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}
			>
				{eventData ? (
					<Card className="leftyCardss">
						<Card className="leftyCard">
							<div className="invoice" style={{ color: "white" }}>
								<div className="check-icon">✓</div>
								<h1 style={{ fontSize: "50px", textAlign: "center" }}>
									{eventData.amount} <span>ETH</span>
								</h1>
								<div
									className="details"
									style={{
										color: "white",
										marginTop: "6%",
										textAlign: "center",
									}}
								>
									<p className="tran-id">
										<strong style={{ marginRight: "20px" }}>Sender:</strong>
										{eventData.from}
									</p>
									<p className="tran-id">
										<strong style={{ marginRight: "20px" }}>Receiver:</strong>
										{eventData.to}
									</p>
									<p className="tran-id">
										<strong style={{ marginRight: "20px" }}>Unit:</strong>
										{eventData.name}
									</p>
								</div>
							</div>
						</Card>
					</Card>
				) : (
					<Card className="leftyCardss">
						<Card className="leftyCard">
							<div>
								<Image src={QR.src} alt="QR" width={200} height={200} />
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									margin: "10%",
								}}
							>
								<Loader />
							</div>
							<div style={{ textAlign: "center", color: "rgb(179, 174, 174)" }}>
								-------------- Waiting for transactions --------------
							</div>
						</Card>
					</Card>
				)}
			</div>
		</div>
	);
}
