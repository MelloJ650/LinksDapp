//import alchemy API
import { Network, Alchemy } from "alchemy-sdk";
import { useEffect, useState, useCallback } from 'react';

//set the settings for the Alchemy API to retrieve Wallet NFTs
const settings = {
  apiKey: '6u_8KgIjEfp36-IPxokHs3JUzrlElCHG', // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.

};

//GetNFTS(WalletAddress)
//@param - WalletAddress - Takes a wallet address in either hex digits or ENS name
//@param - NftName - Takes a name of the NFT you want, must match ASCII of name in metadata of NFT
//@return - A list of excluseively Links Champions that the wallet owns
const GetNFTS = (WalletAddress, NftName) => {
  //set useState Hook as an empty array to store NFT image URLs
  const [nfts, setNfts] = useState([]);
  //loadNftsFromServer()
  //An async function that loads the Nfts from the Alchemy API, the func is called using
  //useCallback function to ensure calling this function is only when the WalletAddress is changed/updated
  const loadNftsFromServer = useCallback(async () => {
    const alchemy = new Alchemy(settings);
    try{
      //await API call to get NFTs from owner
      var data = await alchemy.nft.getNftsForOwner(WalletAddress);
    }
    catch(error) {
      //if empty parameter, i.e. wallet is not connnected then print error and do nothing
      console.log(error);
      return;
    }
    //reset useState to empty array for new wallet
    setNfts([]);
    //for loop to iterate over all the NFTs in the wallet
    for (let i = 0; i < data.ownedNfts.length; i++) {
      //get the name of i'th NFT
      let name = data.ownedNfts[i].rawMetadata.name;
      //if the name of the i'th NFT is Links Champion change the image URL to the proper prefix
      //and add the image URL to the Hook array
      if (!NftName.localeCompare(name.substring(0,NftName.length))){
        //fix link https://ipfs.infura.io/ipfs/  https://ipfs.madewithmason.com/ipfs/ https://ipfs.io/ipfs/
        setNfts( nfts => [...nfts, (data.ownedNfts[i].rawMetadata.image.replace('ipfs://',"https://ipfs.madewithmason.com/ipfs/"))]);
      }
    } //if WalletAddress changes, the useCallback() is called
  }, [WalletAddress, NftName])

  //useEffect to call loadNftsFromServer
  useEffect(() => {
    loadNftsFromServer()
  }, [loadNftsFromServer])
  //return the nfts set in Hook call
  return (nfts)
}
export default GetNFTS;