//import logo from './logo.svg';
import React from 'react';
//import "./button.css";
import './App.css';
import Button from './button';

const App = () => {
  var dao = Button('linksdao');
  var champ = Button('linksdao-champions');
  const handleMenuOne = () => {
    console.log('clicked one');
  };

  const handleMenuTwo = () => {
    
  };

  return (
    <Dropdown
      trigger={<button>Floor Price</button>}
      menu={[
        <button onClick={handleMenuOne}>Links DAO : {dao.price}</button>,
        <button onClick={handleMenuTwo}>Links Champions : {champ.price}</button>,
      ]}
    />
  );
};
const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return(
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
