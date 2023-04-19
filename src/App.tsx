import cn from 'classnames';
import React, { useCallback, useState } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header';
import { MobileMenu } from './Components/MobileMenu';
import { Home } from './Pages/Home';
import { Phones } from './Pages/Phones';
import { Tablets } from './Pages/Tablets';
import { Accessories } from './Pages/Accessories';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prevState => !prevState);
  }, []);

  return (
    <div className={cn(
      'App',
      { 'disable-scroll': isMobileMenuOpen },
    )}
    >
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
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
