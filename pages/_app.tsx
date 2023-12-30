import { ChakraProvider } from '@chakra-ui/react';
import { ThirdwebProvider, coinbaseWallet, metamaskWallet, trustWallet, walletConnect } from "@thirdweb-dev/react";
import { extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import "../globals.css"

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config, colors: { "main": "#9f30cd" } });
const activeChain = process.env.NEXT_PUBLIC_APP_CHAIN || "binance-testnet";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ThirdwebProvider clientId="b8d93116787f5535594041bb91a64ae8" activeChain={activeChain} supportedWallets={[ metamaskWallet(), coinbaseWallet(), walletConnect(), trustWallet() ]}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ChakraProvider>
  );
};

export default MyApp;
