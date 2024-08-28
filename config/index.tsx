// config/index.tsx
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

// Your WalletConnect Cloud project ID
console.log(process.env.WALLET_CONNECT);
export const projectId = "ce9dd715d19979c9524cd1acd55cd609";

// Create a metadata object
const metadata = {
  name: "Escow System",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const localNetwork = {
  id: 31337, // Replace with your local network's Chain ID (e.g., 1337 for Ganache)
  name: "Hardhat",
  network: "localhost",
  rpcUrls: {
    default: {
      http: ["http://localhost:8545"], // Replace with your local network's RPC URL
    },
  },
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
};
// Create wagmiConfig
const chains = [mainnet, sepolia, localNetwork] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  // ...wagmiOptions, // Optional - Override createConfig parameters
});
