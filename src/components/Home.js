import React from 'react';

const Home = ({title, price, nbeds}) => (
  <div>
    <h2>{title}</h2>
    <p>
      price: {price}<br />
      nbeds: {nbeds} beds
    </p>
  </div>
);

export default Home;
