//import wagmi API to connect wallet
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import GetNFTS from './getNfts'
import App from './App1'

import "./styles.css"

const Profile = () => {
  //setup useAccount to connect to wallet
 const { address, isConnecting, isConnected, isReconnecting } = useAccount()
 const { data: ensName } = useEnsName({ address })
 //console.log("CALLING");
 var NFTS = GetNFTS(address,"Links Champion");
 const { connect } = useConnect({
 connector : new InjectedConnector({
  options: {
    shimDisconnect: true,
    name: (detectedName) =>
      `Injected (${
        typeof detectedName === 'string'
          ? detectedName
          : detectedName.join(', ')
      })`,
  }
 }),
 onSuccess(data) {
  console.log('Connect', data)
 },
 })
 const { disconnect } = useDisconnect({
  onSuccess(data) {
    console.log('Success', data)
  },
  onError(error) {
    console.log('Error', error)
  },
 })
 if (isReconnecting)
 return(<div>Reconnecting...</div>)
 if (isConnecting)
 return(<div>Connecting...</div>)
 if (isConnected){
  //console.log("NFTS: " + Object.prototype.toString.call(NFTS));
  return (
  <div>
    <>
    Connected to {ensName ?? address}
    </>
    <button onClick={() => disconnect()}>Disconnect</button>
    <ul>
      {NFTS.map((image, index) => {
        return <img src={image} key={index} alt="Links Champion" className='photo'/>
      })}
    </ul>
    <App/>
  </div>
  )
 }
 
 return (
  <div>
    <button onClick={() => connect()}>Connect Wallet</button>
  </div>
 )
}
export default Profile;