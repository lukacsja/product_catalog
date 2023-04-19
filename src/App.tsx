import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import { Home } from './Pages/Home';
import { Phones } from './Pages/Phones';
import { Tablets } from './Pages/Tablets';
import { Accessories } from './Pages/Accessories';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/phones" Component={Phones} />
        <Route path="/tablets" Component={Tablets} />
        <Route path="/accessories" Component={Accessories} />
        {/* <Route path="*" Component={Home} /> */}
      </Routes>
    </div>
  );
};

export default App;
