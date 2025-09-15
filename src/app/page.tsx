'use client';

import WalletInfo from '@/components/wallet-info';
import TransferSOL from '@/components/transfer-s-o-l';
import RequestAirdrop from '@/components/request-airdrop';
// import SignMessage from '@/components/sign-message';
// import CreateAndMintToken from '@/components/create-and-mint-token';
import { useState } from 'react';

export default function Home() {
  const [refreshBalance, setRefreshBalance] = useState<boolean>(false);

  const Airdrop = () => {
    setRefreshBalance(true);
  };

  return (
    <>
      <main className='grid h-full w-full grid-cols-1 gap-4 pt-20 lg:grid-cols-2'>
        <div className='grid w-full grid-cols-1 gap-4'>
          <WalletInfo
            refreshBalance={refreshBalance}
            setRefreshBalance={setRefreshBalance}
          />
          <RequestAirdrop onAirdrop={Airdrop} />
        </div>
        <div className='grid w-full grid-cols-1 gap-4'>
          {/* <SignMessage /> */}
          <TransferSOL />
          {/* <CreateAndMintToken /> */}
        </div>
      </main>
    </>
  );
}
