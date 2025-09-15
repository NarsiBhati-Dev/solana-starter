import ConnectWallet from './connect-wallet';

export default function Header() {
  return (
    <header className='flex items-center justify-between p-2 px-4 lg:px-0 text-neutral-200'>
      <h1 className='text-base font-bold lg:text-2xl'>
        Solana Starter <span className='text-xs text-neutral-400'>Devnet</span>
      </h1>
      <ConnectWallet />
    </header>
  );
}
