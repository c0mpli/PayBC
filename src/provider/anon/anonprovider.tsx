"use client";

import { AnonAadhaarProvider } from "@anon-aadhaar/react";

const activeChain = "ethereum";
export default function AnonProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AnonAadhaarProvider _useTestAadhaar={true}>{children}</AnonAadhaarProvider>
	);
}
