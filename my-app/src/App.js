import React from 'react';
import './App.css';
import FloorPrice from './FloorPrice';

const App = () => {
  //initialize the floor price of linksdao and links champions
  //to follow hook call syntax (Hooks can only be called in the beginning of a function/hook)
  var dao = FloorPrice('linksdao');
  var champ = FloorPrice('linksdao-champions');
  //empty handle event for when button1 is clicked
  const handleMenuOne = () => {
    console.log('clicked one');
  };
  //empty handle event for when button2 is clicked
  const handleMenuTwo = () => {
    console.log('clicked two');
  };

  return (
    //return JSX with a trigger for Floor Price
    <Dropdown
      trigger={<button>Floor Price</button>}
      menu={[
        <button onClick={handleMenuOne}>Links DAO : {dao.price}</button>,
        <button onClick={handleMenuTwo}>Links Champions : {champ.price}</button>,
      ]}
    />
  );
};

//create a function for a dropdown menu
const Dropdown = ({ trigger, menu }) => {
  //use hook to set the open state to closed
  const [open, setOpen] = React.useState(false);

  //to open and close dropdown menu when clicked
  const handleOpen = () => {
    setOpen(!open);
  };

  return(
    //JSX for dropdown menu
    <div className="dropdown">
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {React.cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                  },
                })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default App;
