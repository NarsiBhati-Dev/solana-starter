'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { SOLANA_ENDPOINT } from '@/config';
import toast from 'react-hot-toast';

const connection = new Connection(SOLANA_ENDPOINT);

interface WalletInfoProps {
    refreshBalance: boolean;
    setRefreshBalance: (refreshBalance: boolean) => void;
}

export default function WalletInfo({ refreshBalance, setRefreshBalance }: WalletInfoProps) {
    const { connected, publicKey } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(publicKey?.toBase58() || '');
        toast.success('Copied to clipboard');
    };

    // fetch balance when wallet connects or when refresh is requested
    useEffect(() => {
        const fetchBalance = async () => {
            if (publicKey) {
                try {
                    const lamports = await connection.getBalance(new PublicKey(publicKey));
                    setBalance(lamports / LAMPORTS_PER_SOL);
                } catch (error) {
                    console.error('Failed to fetch balance:', error);
                    setBalance(null);
                }
            } else {
                setBalance(null);
            }
        };

        if (connected && publicKey) {
            fetchBalance();
            // Reset refresh flag if it was set
            if (refreshBalance) {
                setRefreshBalance(false);
            }
        } else {
            setBalance(null);
        }
    }, [connected, publicKey, refreshBalance, setRefreshBalance]);


    if (!connected) {
        return <p className="text-gray-500 w-full lg:min-h-48 h-full">No wallet connected</p>;
    }

    return (
        <div className="w-full lg:min-h-48 h-full rounded-lg bg-white/10 p-4 shadow-lg flex flex-col items-center justify-center">
            <p className="font-mono text-xs lg:text-base text-center truncate text-gray-200 flex flex-wrap items-center gap-2">
                <span className="font-semibold">Wallet:</span>{' '}
                {publicKey?.toBase58().slice(0, 10)}...{publicKey?.toBase58().slice(-10)}
                <button className="text-purple-300 cursor-pointer bg-white/10 p-1 lg:px-2 rounded-md" onClick={handleCopy}>Copy</button>
            </p>
            <p className="mt-2 text-lg text-center truncate font-bold text-purple-300">
                Balance: {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
            </p>
        </div>
    );
}