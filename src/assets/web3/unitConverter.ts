import { parseUnits, formatUnits } from "ethers";

export default function convertToUnits(number: number, toUnit: string): string {
    const units: { [key: string]: number } = {
        'wei': 0,
        'kwei': 3,
        'mwei': 6,
        'gwei': 9,
        'szabo': 12,
        'finney': 15,
        'ether': 18
    };

    if (!(toUnit in units)) {
        return "Invalid unit";
    }

    try {
        const amountInDesiredUnit = parseUnits(number.toString(), units[toUnit]);
        return amountInDesiredUnit.toString();
    } catch (error) {
        console.error("Error converting units:", error);
        return "Conversion error";
    }
}
