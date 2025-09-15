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

export default function WalletInfo({
    refreshBalance,
    setRefreshBalance,
}: WalletInfoProps) {
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
                    const lamports = await connection.getBalance(
                        new PublicKey(publicKey),
                    );
                    setBalance(lamports / LAMPORTS_PER_SOL);
                } catch {
                    toast.error('Failed to fetch balance');
                    setBalance(null);
                }
            } else {
                toast.error('No wallet connected');
                setBalance(null);
            }
        };

        if (connected && publicKey) {
            if (refreshBalance) {
                toast.success('Refreshing balance due to airdrop...');
                setRefreshBalance(false);
            }
            fetchBalance();
        } else {
            toast.error('No wallet connected');
            setBalance(null);
        }
    }, [connected, publicKey, refreshBalance, setRefreshBalance]);

    if (!connected) {
        return (
            <p className='h-full w-full text-gray-500 lg:min-h-48'>
                No wallet connected
            </p>
        );
    }

    return (
        <div className='flex h-full w-full flex-col items-center justify-center rounded-lg bg-white/10 p-4 shadow-lg lg:min-h-48'>
            <p className='flex flex-wrap items-center gap-2 truncate text-center font-mono text-xs text-gray-200 lg:text-base'>
                <span className='font-semibold'>Wallet:</span>{' '}
                {publicKey?.toBase58().slice(0, 10)}...
                {publicKey?.toBase58().slice(-10)}
                <button
                    className='cursor-pointer rounded-md bg-white/10 p-1 text-purple-300 lg:px-2'
                    onClick={handleCopy}
                >
                    Copy
                </button>
            </p>
            <p className='mt-2 truncate text-center text-lg font-bold text-purple-300'>
                Balance: {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
            </p>
        </div>
    );
}
