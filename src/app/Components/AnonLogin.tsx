import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/provider/redux/store";
import { ChangeStatus } from "@/provider/redux/SetStatus";
import { ChangeAge } from "@/provider/redux/SetAge";

export default function AnonLogin() {
	const username = useSelector((state: RootState) => state.SetUsername.name);
	const accountName = useSelector((state: RootState) => state.SetAccount.name);
	const anonStatus = useSelector((state: RootState) => state.SetStatus.name);
	const anonAge = useSelector((state: RootState) => state.SetAge.name);

	console.log(anonAge);
	console.log(anonStatus);

	const [anonAadhaar] = useAnonAadhaar();
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const [ageAbove18, setAgeAbove18] = useState<boolean | undefined>(undefined);
	const [gender, setGender] = useState<string | undefined>(undefined);
	const [pinCode, setPinCode] = useState<string | undefined>(undefined);
	const [state, setState] = useState<string | undefined>(undefined);
	const dispatch = useDispatch();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	//////////////////////////

	const fields = {
		revealAgeAbove18: true,
		revealGender: true,
		revealPinCode: true,
		revealState: true,
	};
	type FieldKey =
		| "revealAgeAbove18"
		| "revealGender"
		| "revealPinCode"
		| "revealState";

	const fieldsToReveal = (): FieldKey[] => {
		const fieldsToReveal: FieldKey[] = [];
		if (fields.revealAgeAbove18) fieldsToReveal.push("revealAgeAbove18");
		if (fields.revealGender) fieldsToReveal.push("revealGender");
		if (fields.revealPinCode) fieldsToReveal.push("revealPinCode");
		if (fields.revealState) fieldsToReveal.push("revealState");
		return fieldsToReveal;
	};

	const dataMapping = {
		revealAgeAbove18: "ageAbove18",
		revealGender: "gender",
		revealPinCode: "pinCode",
		revealState: "state",
	};

	useEffect(() => {
		console.log("AnonAadhaar", anonAadhaar);
		if (anonAadhaar) {
			dispatch(ChangeStatus(anonAadhaar.status));
			if (anonAadhaar.status === "logged-in") {
				const proof = JSON.parse(anonAadhaar.anonAadhaarProofs["0"].pcd).proof;
				setAgeAbove18(proof?.ageAbove18);
				setGender(proof?.gender);
				setPinCode(proof?.pinCode);
				setState(proof?.state);
				dispatch(ChangeAge(proof?.ageAbove18 ? proof.ageAbove18 : 0));
			} else if (anonAadhaar.status === "logged-out") {
				setAgeAbove18(undefined);
				setGender(undefined);
				setPinCode(undefined);
				setState(undefined);
				dispatch(ChangeAge(0));
			}
		}
		console.log("Inside useEffect - Status:", anonStatus, "Age:", anonAge);
	}, [anonAadhaar, anonAadhaar?.status, dispatch, anonStatus, anonAge]);

	///////////////////////

	return (
		<div>
			<button
				onClick={showModal}
				disabled={false}
				type="button"
				className="font-bold text-white bg-black hover:bg-black-800 focus:ring-4 focus:ring-blue-300 font-large rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800 inline-flex items-center"
				style={{ fontSize: "16px", border: "1px solid white" }}
			>
				<svg
					aria-hidden="true"
					role="status"
					className="inline w-4 h-4 mr-3 text-white animate-spin"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="#E5E7EB"
					></path>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentColor"
					></path>
				</svg>
				ANON-VERIFY        
			</button>

			<Modal
				footer={null}
				title="Verify your aadhar card"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div style={{ fontSize: "20px", fontWeight: 600 }}>
					<p>What you want as to use</p>
				</div>
				<div>
					<section style={{ margin: "20px 0 0 40px" }}>
						{Object.entries(fields).map(([key, value]) => (
							<label
								key={key}
								style={{ display: "flex", marginBottom: "10px" }}
							>
								<input
									type="checkbox"
									className="ui-checkbox"
									checked={value}
								/>
								<span
									style={{
										marginLeft: "10px",
										fontSize: "15px",
										fontWeight: 500,
									}}
								>
									{dataMapping[key as FieldKey]}
								</span>
							</label>
						))}
					</section>
				</div>
				<div style={{ marginTop: "10px 0 10px 0", fontWeight: "500" }}>
					Use the QR of your Aadhar card
				</div>
				<div style={{ marginTop: "10px" }}>
					<LogInWithAnonAadhaar
						nullifierSeed={1234}
						fieldsToReveal={fieldsToReveal()}
						signal={accountName}
					/>
					<div className="mt-4">
						<p
							className={`text-lg ${
								anonAadhaar?.status === "logged-out"
									? "text-red-500"
									: "text-green-300"
							}`}
						>
							Status: {anonAadhaar?.status}
						</p>
					</div>
				</div>
			</Modal>
		</div>
	);
}
