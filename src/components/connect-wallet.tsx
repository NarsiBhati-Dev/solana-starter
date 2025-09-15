'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import '@/styles/wallet.css';

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);

  // Only render on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='w-full rounded-lg bg-white/10 p-4 shadow-lg'>
        <div className=''>Connect Wallet</div>
      </div>
    );
  }

  return <WalletMultiButton className='wallet-button' />;
}
