import { WagmiConfig, createClient, configureChains, mainnet  } from 'wagmi'
//import { getDefaultProvider } from 'ethers'
import Profile from './Profile'
import { publicProvider } from 'wagmi/providers/public'

const { provider } = configureChains([mainnet], [publicProvider()])

const client = createClient({
 autoConnect: true,
 provider,
})

/*
const client = createClient({
 autoConnect: true,
 provider: getDefaultProvider(),
})*/

//wrap wagmiconfig around wallet profile
function App() {
 return (
  <WagmiConfig client={client}>
    <Profile />
  </WagmiConfig>
 )
}

export default App;
  