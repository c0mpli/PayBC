/* eslint-disable react/jsx-key */
"use client";
import React, { ChangeEventHandler, useState } from "react";
import { Card, Form, Input, Select, Button, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BlockOptions } from "@/app/Options/BlockOptions";
import { UnitOptions } from "@/app/Options/UnitOptions";
import "../style/TransactionForm.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/provider/redux/store";
import { ChangeTxHash } from "@/provider/redux/SetTxHash";
import { transferEther } from "@/assets/web3/contract/contractETH";
import convertToUnits from "@/assets/web3/unitConverter";
import { ChangeUnit } from "@/provider/redux/SetUnit";
import { ChangeBlockchain } from "@/provider/redux/SetBlockchain";
import { ChangeRecipient } from "@/provider/redux/SetRecipient";
import { ChangeAmount } from "@/provider/redux/SetAmount";
import meta from "../../assets/MetaMask_Fox.svg-removebg-preview.png";
import { ChangeAccount } from "@/provider/redux/SetAccount";
import { Cover } from "./sparkles/cover";

interface FormValues {
	username?: string;
	number?: string;
	Choices1?: string;
	Choices2?: string;
}

export default function TransferCard() {
	const [current, setCurrent] = React.useState<number>(0);
	const [Unit, setUnit] = React.useState<FormValues | undefined>(undefined);
	const [security, setSecurity] = React.useState<FormValues | undefined>(
		undefined
	);
	const [Transaction, setTransaction] = React.useState<FormValues | undefined>(
		undefined
	);

	const userName = useSelector((state: RootState) => state.SetUsername.name);
	const accountName = useSelector((state: RootState) => state.SetAccount.name);
	const txHash = useSelector((state: RootState) => state.SetTxHash.name);
	const unit = useSelector((state: RootState) => state.SetUnit.name);
	const blockchain = useSelector(
		(state: RootState) => state.SetBlockchain.name
	);
	const amount = useSelector((state: RootState) => state.SetAmount.amount);
	const [recipient, setRecipient] = useState<string>("");
	const dispatch = useDispatch();

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

	async function callContract(
		type: string,
		to: string,
		account: string,
		amount: number,
		unit: string
	) {
		try {
			let Hash: string;
			const convertedAmounts = convertToUnits(amount, unit);
			if (type === "ETH") {
				Hash = await transferEther(
					to,
					convertedAmounts,
					account,
					unit,
					blockchain
				);
				dispatch(ChangeTxHash(Hash));
			}
		} catch (error) {
			console.error("Error transferring ether:", error);
		}
	}

	const handleUnitChange = (value: string) => {
		console.log(value);
		dispatch(ChangeUnit(value));
	};

	const handleBlockChainChange = (value: string) => {
		console.log(value);
		dispatch(ChangeBlockchain(value));
	};

	const handleRecipient: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (event) => {
		console.log(event.target.value);
		setRecipient(event.target.value);
		dispatch(ChangeRecipient(event.target.value));
	};

	const handleAmount: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (event) => {
		console.log(event.target.value);
		dispatch(ChangeAmount(Number(event.target.value)));
	};

	const handleTransfer = async () => {
		console.log("Checkpoint");
		try {
			await callContract(blockchain, recipient, accountName, amount, unit);
			console.log("Checkpoint1");
		} catch (error) {
			console.error("Error calling contract:", error);
		}
	};

	const onFinishIDForm = (value: FormValues) => {
		setTransaction(value);
		setCurrent(current + 1);
	};
	const onFinishUNITForm = (value: FormValues) => {
		setUnit(value);
		setCurrent(current + 1);
	};

	const onFinish = (value: FormValues) => {
		setSecurity(value);
		setCurrent(current + 1);
	};

	const goPrevious = () => {
		setCurrent(current - 1);
	};

	const forms = [
		<TransactionID
			onFinish={onFinishIDForm}
			initialValues={Transaction}
			handleRecipient={handleRecipient}
			handleAmount={handleAmount}
			connectMetaMask={connectMetaMask}
		/>,
		<BlockchainUnit
			onFinish={onFinishUNITForm}
			initialValues={Unit}
			goPrevious={goPrevious}
			handleUnitChange={handleUnitChange}
			handleBlockChainChange={handleBlockChainChange}
		/>,
		<Final goPrevious={goPrevious} handleTransfer={handleTransfer} />,
	];

	return (
		<div className="transfer-card-container">
			<div className="left-part" style={{ marginTop: "9%" }}>
				<div>
					<button className="buttonn">Anon Aadhar</button>
				</div>
				<div>
					<h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
						<Cover>Your Ultimate Secure Transaction Hub</Cover>
					</h1>
				</div>
				<div>
					<div style={{ fontSize: 20 }}>
						Our application, PayBc, currently supports multiple EVM-based
						blockchains across various networks. It also synchronizes with
						MetaMask to seamlessly track changes in accounts and different
						blockchains.
					</div>
				</div>
			</div>
			<div className="right-part">
				<div className="main-title">Proceed To Transfer</div>
				<Card className="main-style">{forms[current]}</Card>
			</div>
		</div>
	);
}

interface TransactionIDProps {
	onFinish: (value: FormValues) => void;
	initialValues: FormValues | undefined;
	handleRecipient: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	handleAmount: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	connectMetaMask: () => Promise<void>;
}

function TransactionID({
	onFinish,
	initialValues,
	handleRecipient,
	handleAmount,
	connectMetaMask,
}: TransactionIDProps) {
	return (
		<Form
			layout="vertical"
			className="font-color"
			onFinish={onFinish}
			initialValues={initialValues}
		>
			<label className="form-title">Transaction Info</label>
			<Form.Item
				label="Receiver Wallet ID"
				name="USERID"
				rules={[{ required: true, message: "Please input your username!" }]}
			>
				<Input
					size="large"
					color="white"
					prefix={<UserOutlined />}
					onChange={handleRecipient}
					type="string"
				/>
			</Form.Item>
			<Form.Item
				label="Amount"
				name="amount"
				rules={[{ required: true, message: "Please input Amount!" }]}
			>
				<Input
					style={{ color: "white" }}
					size="large"
					color="white"
					onChange={handleAmount}
					type="number"
				/>
			</Form.Item>
			<Button className="button-inner" type="primary" htmlType="submit">
				Next
			</Button>
			<div
				style={{
					textAlign: "center",
					marginTop: "4%",
					color: "white",
					cursor: "pointer",
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
					alignItems: "center",
				}}
				onClick={connectMetaMask}
			>
				<Image preview={false} src={meta.src} width={40} height={40}></Image>
				<div style={{ marginLeft: "2%" }}>Sync with MetaMask</div>
			</div>
		</Form>
	);
}

interface BlockchainUnitProps {
	onFinish: (value: FormValues) => void;
	initialValues: FormValues | undefined;
	goPrevious: () => void;
	handleUnitChange: (value: string) => void;
	handleBlockChainChange: (value: string) => void;
}

function BlockchainUnit({
	onFinish,
	initialValues,
	goPrevious,
	handleUnitChange,
	handleBlockChainChange,
}: BlockchainUnitProps) {
	return (
		<Form
			layout="vertical"
			className="font-color"
			onFinish={onFinish}
			initialValues={initialValues}
		>
			<label className="form-title">Choose Blockchain</label>
			<Form.Item
				label="BlockChain"
				name="Choices1"
				rules={[{ required: true, message: "Please select a blockchain!" }]}
			>
				<Select
					size="large"
					showSearch
					optionFilterProp="label"
					onChange={handleBlockChainChange}
					options={BlockOptions}
				/>
			</Form.Item>
			<Form.Item
				label="Unit"
				name="Choices2"
				rules={[{ required: true, message: "Please select a unit!" }]}
			>
				<Select
					size="large"
					showSearch
					optionFilterProp="label"
					onChange={handleUnitChange}
					options={UnitOptions}
				/>
			</Form.Item>
			<Button
				className="button-inner"
				type="default"
				onClick={goPrevious}
				style={{ marginRight: "8px", marginBottom: "8px" }}
			>
				Previous
			</Button>
			<Button className="button-inner" type="primary" htmlType="submit">
				Next
			</Button>
		</Form>
	);
}

interface FinalProps {
	goPrevious: () => void;
	handleTransfer: () => void;
}

function Final({ goPrevious, handleTransfer }: FinalProps) {
	return (
		<div className="final-step">
			<label className="form-title">Click To Transfer</label>
			<div className="transaction-card-wrapper">
				<Button
					className="button-inner"
					onClick={goPrevious}
					style={{ marginRight: "8px", marginBottom: "8px" }}
				>
					Previous
				</Button>
				<Button className="button-inner" onClick={handleTransfer}>
					Transfer
				</Button>
			</div>
		</div>
	);
}
