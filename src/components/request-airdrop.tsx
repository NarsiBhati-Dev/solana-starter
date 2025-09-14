"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import toast from "react-hot-toast";

interface RequestAirdropProps {
    onAirdrop?: () => void; // optional callback to refresh balance outside
}

export default function RequestAirdrop({ onAirdrop }: RequestAirdropProps) {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [loading, setLoading] = useState(false);
    const [txSig, setTxSig] = useState<string | null>(null);
    const [airdropAttempted, setAirdropAttempted] = useState(false);
    const [amount, setAmount] = useState(1);

    async function airdropSol() {
        if (!publicKey) {
            toast.error("Please connect your wallet");
            return;
        }

        if (airdropAttempted) {
            toast.error("Airdrop already attempted today. Try again tomorrow!");
            return;
        }

        setLoading(true);
        setAirdropAttempted(true);
        try {
            const sig = await connection.requestAirdrop(
                publicKey,
                amount * LAMPORTS_PER_SOL
            );
            setTxSig(sig);
            toast.success(`Airdropped ${amount} SOL successfully!`);
            if (onAirdrop) onAirdrop();
        } catch {
            toast.error("Airdrop limit reached. Try again tomorrow!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-full h-full bg-white/10 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Request Airdrop</h3>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount in SOL"
                className="w-full p-2 mb-4 bg-white/5 text-white rounded-md outline-none"
            />
            <button
                onClick={airdropSol}
                disabled={!publicKey || loading}
                className="w-full bg-gradient-to-b from-purple-300 to-purple-400 text-black font-bold py-2 px-4 transition duration-200 shadow-lg rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Processing..." : "Request Airdrop"}
            </button>
        </div>
    );
}