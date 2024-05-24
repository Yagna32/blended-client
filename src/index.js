import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
import ShopProductsContextProvider from './Context/ShopProductsContext';
import OrderContextProvider from './Context/OrderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <OrderContextProvider>
  <ShopContextProvider>
    <ShopProductsContextProvider>
      <App />
    </ShopProductsContextProvider>
  </ShopContextProvider>
  </OrderContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
