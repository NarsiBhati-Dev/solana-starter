'use client';

import WalletInfo from '@/components/wallet-info';
import SendTransaction from '@/components/send-transaction';
import RequestAirdrop from '@/components/request-airdrop';
import SignMessage from '@/components/sign-message';
import { useState } from 'react';

export default function Home() {
  const [refreshBalance, setRefreshBalance] = useState<boolean>(false);

  const Airdrop = () => {
    setRefreshBalance(refreshBalance ? !refreshBalance : true);
  };

  return (
    <>
      <main className='w-full h-full pt-20 grid lg:grid-cols-2 grid-cols-1 gap-4'>
        <div className='w-full grid grid-cols-1 gap-4'>
          <WalletInfo refreshBalance={refreshBalance} setRefreshBalance={setRefreshBalance} />
          <RequestAirdrop onAirdrop={Airdrop} />
        </div>
        <div className='w-full grid grid-cols-1 gap-4'>
          <SignMessage />
          <SendTransaction />
        </div>
      </main >
    </>
  );
}
