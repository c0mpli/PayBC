"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/provider/redux/store";
import { ChangeAccount } from "@/provider/redux/SetAccount";
import { useAnonAadhaar } from "@anon-aadhaar/react";
import Nav from "./Components/Nav";
import About from "./Components/About";
import meta from "../assets/MetaMask_Fox.svg-removebg-preview.png";
import { Image } from "antd";
import "../app/style/main.css";
import MeteorCard from "./Components/metorComponent";

export default function Home() {
	const username = useSelector((state: RootState) => state.SetUsername.name);
	const accountName = useSelector((state: RootState) => state.SetAccount.name);
	const dispatch = useDispatch();

	const [anonAadhaar] = useAnonAadhaar();

	const connectMetaMask = async () => {
		console.log(accountName);
		if (window.ethereum) {
			try {
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				dispatch(ChangeAccount(accounts[0]));
			} catch (error) {
				const errorMessage =
					(error as any).code === 4001
						? "MetaMask connection request was rejected by the user."
						: "An error occurred while connecting to MetaMask. Please try again.";
				alert(errorMessage);
				console.error(error);
			}
		} else {
			alert("MetaMask extension not detected!");
		}
	};

	return (
		<div>
			<Nav />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					marginTop: "10%",
				}}
			>
				<div className="hero BigText text-center mb-2">
					<h1 className="text-s mb-[-20px]">PayBc: Mutli-EVM Transactions</h1>
					<h1 className="text-s">with Zero Proofs</h1>
					<h1 className="text2 mt-4" style={{ fontWeight: "500" }}>
						Seamless Ethereum transfers across multiple blockchains with
						anonymous Aadhaar-based KYC
					</h1>
				</div>

				<div style={{ marginTop: "5%" }}>
					{accountName ? (
						<>
							<button className="Documents-btn" onClick={connectMetaMask}>
								<span className="folderContainer">
									<Image preview={false} src={meta.src}></Image>
								</span>
								<p className="text">Connected</p>
							</button>
						</>
					) : (
						<>
							{" "}
							<button className="Documents-btn" onClick={connectMetaMask}>
								<span className="folderContainer">
									<Image preview={false} src={meta.src}></Image>
								</span>
								<p className="text">Connect</p>
							</button>
						</>
					)}
				</div>
			</div>

			<div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginTop: "20%",
					}}
				>
					<h1 className="text-section">How It Works!</h1>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						color: "gainsboro",
					}}
				>
					<h1 className="text2">
						Payu: Effortless multi-chain Ethereum transfers with secure KYC and
						real-time alerts
					</h1>
				</div>
				<div></div>
			</div>

			{/* <About/> */}
			<div style={{ marginTop: "4%", marginBottom: "6%" }}>
				<MeteorCard />
			</div>
		</div>
	);
}
