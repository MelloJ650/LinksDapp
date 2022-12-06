import react, { useState } from 'react';

const Button = (NFT) => {
  const [price, setPrice] = useState(0);
  
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  //fetch collection stats of links dao
  let apilink = 'https://api.opensea.io/api/v1/collection/' + NFT + '/stats';
  fetch(apilink, options)
    .then(response => response.json())
    .then(data => {
      console.log(data.stats.floor_price);
      setPrice(data.stats.floor_price);
    } )
    .catch(err => console.error(err));

  return({price});
}

export default Button;