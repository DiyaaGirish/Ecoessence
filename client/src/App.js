import React from 'react';
import ProductList from './components/ProductList';
import Header from './components/Header';
import CustomItemContext from './context/ItemContext'; // Ensure this path is correct
import './App.css';

const App = () => {
  return (
    <CustomItemContext>
      <Header />
      <ProductList />
    </CustomItemContext>
  );
};

export default App;
