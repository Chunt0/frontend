import React from 'react';
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const ConnectButton: React.FC = () => {

  return (
    <WalletMultiButton />
  );
};

export default ConnectButton
