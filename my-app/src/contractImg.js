import { useContractRead } from "wagmi";
import { LinksABI } from './linksABI.ts'

const GetURL = (URL) => {
  var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",URL,false);
    Httpreq.send(null);
    return Httpreq.responseText; 
}

const ContractImg = () =>{
  const { data, isError, isLoading } = useContractRead({
    address: '0x8a2b94860e34f6fdd2bb76ee881b280598f759e2',
    abi: LinksABI,  
    functionName: 'tokenURI',
    args: ['8519'],
  })
  //console.log(data);
  //console.log(data.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/'));
  //console.log(typeof(data.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')));
  //use a GET HTTP request to retrieve json info from ipfs link
  var nft = JSON.parse(GetURL(data.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')));
  //console.log(nft.image.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/'));

  if (isError)
  return(<div>Error Loading NFT</div>)
  if (isLoading)
  return( <div>Loading NFT...</div> )
  return (
    <>
    <img src={nft.image.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')}/>
    </>
  )
}
export default ContractImg
