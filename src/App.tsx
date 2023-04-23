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
import phonesFromServer from './api/phones.json';
import { Footer } from './Components/Footer';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prevState => !prevState);
  }, []);

  // BrandNewModels >>>
  const numberOfBrandNews = 8;
  const phonesByYear = phonesFromServer.sort((phone1, phone2) => (
    phone2.year - phone1.year));
  const brandNewList = phonesByYear.slice(0, numberOfBrandNews);

  // Hotprices >>>
  const numberOfDiscounted = 8;
  const phonesByDiscount = phonesFromServer.sort((phone1, phone2) => {
    const discountA = ((phone1.fullPrice - phone1.price)
      / phone1.fullPrice) * 100;
    const discountB = ((phone2.fullPrice - phone2.price)
      / phone2.fullPrice) * 100;

    return discountB - discountA;
  });

  const hotPricesList = phonesByDiscount.slice(0, numberOfDiscounted);

  // eslint-disable-next-line no-console
  console.log(hotPricesList);
  // eslint-disable-next-line no-console
  console.log(hotPricesList === brandNewList);

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
        <Route
          path="/"
          element={(
            <Home
              brandNews={brandNewList}
              hotPrices={hotPricesList}
            />
          )}
        />
        <Route path="/phones" element={<Phones />} />
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/accessories" element={<Accessories />} />
        {/* <Route path="*" element={<Home />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
