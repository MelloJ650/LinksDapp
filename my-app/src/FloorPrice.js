//import usestate() for hooks in react
import { useState } from 'react';

//FloorPrice function that takes the connection_slug of any NFT in opensea
//and returns the price of the corresponding NFT
const FloorPrice = (NFT) => {
  //initialize price hook with useState, initialize price to 0
  const [price, setPrice] = useState(0);
  
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  //fetch collection stats of NFT
  let apilink = 'https://api.opensea.io/api/v1/collection/' + NFT + '/stats';
  fetch(apilink, options)
    .then(response => response.json())
    .then(data => {
      //set the price to the floor price of given NFT
      setPrice(data.stats.floor_price);
    } )
    .catch(err => console.error(err));

  //return the price that was set in fetch()
  return({price});
}

export default FloorPrice;