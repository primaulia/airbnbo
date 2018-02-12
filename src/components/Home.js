import React from 'react';

const Home = ({title, price, nbeds}) => (
  <div className="fl w-third pa2">
    <h2>{title}</h2>
    <p>
      price: {price}<br />
      nbeds: {nbeds} beds
    </p>
  </div>
);

export default Home;
