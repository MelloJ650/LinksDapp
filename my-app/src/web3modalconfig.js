import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { useEffect, useState } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, avalanche, bsc, fantom, mainnet, optimism, polygon } from 'wagmi/chains'

/*
// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
}
*/
const projectId = "6fb332978c26814f53dad8213a3b325b"

// 2. Configure wagmi client
const chains = [mainnet, polygon, optimism, arbitrum, avalanche, fantom, bsc]
const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'web3Modal', chains }),
  provider
})

// 3. Configure modal ethereum client
export const ethereumClient = new EthereumClient(wagmiClient, chains)

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          
        </WagmiConfig>
      ) : null}

      {/* Demo purposes only, if custom path is set, we initialize different Web3Modal instance */}
      {(
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      )}
    </>
  )
}
