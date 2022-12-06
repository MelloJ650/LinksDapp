//retrieve linksDAOChamp floor price

const floor_price = () => {
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  //fetch collection stats of links dao
  fetch('https://api.opensea.io/api/v1/collection/linksdao-champions/stats', options)
    .then(response => response.json())
    .then(data => {
      //let floor_price = document.createElement('h1');
      //floor_price.innerText = 'Floor Price: ' + data.stats.floor_price;
      //document.body.appendChild(floor_price)
      console.log(data.stats.floor_price);
      return(data.stats.floor_price);
    } )
    .catch(err => console.error(err));

}

export default floor_price;
/*
const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));
*/