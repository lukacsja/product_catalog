import cn from 'classnames';
import React, { useCallback, useState } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header';
import { MobileMenu } from './Components/MobileMenu';
import { Home } from './Pages/Home';
import { Phones } from './Pages/Phones';
import { Tablets } from './Pages/Tablets/Tablets';
import { Accessories } from './Pages/Accessories/Accessories';
import { Footer } from './Components/Footer';
import phones from './api/phones.json';
import { Phone } from './Types/Phone';
import { ProductDetails } from './Components/ProductDetails';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prevState => !prevState);
  }, []);

  const getBrandNews = (itemCount: number): Phone[] => {
    const sortByYear = phones.sort((phone1, phone2) => (
      phone2.year - phone1.year));

    return sortByYear.slice(0, itemCount);
  };

  const getHotPrices = (itemCount: number): Phone[] => {
    const phonesByDiscount = phones.sort((phone1, phone2) => {
      const discountA = ((phone1.fullPrice - phone1.price)
        / phone1.fullPrice) * 100;
      const discountB = ((phone2.fullPrice - phone2.price)
        / phone2.fullPrice) * 100;

      return discountB - discountA;
    });

    return phonesByDiscount.slice(0, itemCount);
  };

  // const colorMap = () => {
  //   const result: string[] = [];

  //   phones.map(phone => {
  //     if (!result.includes(phone.color)) {
  //       result.push(phone.color);
  //     }

  //     return null;
  //   });

  //   return result;
  // };

  // // eslint-disable-next-line no-console
  // console.log(colorMap());

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
          path="*"
          element={(
            <Home
              brandNews={getBrandNews(8)}
              hotPrices={getHotPrices(10)}
            />
          )}
        />
        <Route
          path="/"
          element={(
            <Home
              brandNews={getBrandNews(8)}
              hotPrices={getHotPrices(10)}
            />
          )}
        />
        <Route
          path="/phones"
          element={<Phones products={phones} />}
        />
        <Route
          path="phones/:phoneId"
          element={<ProductDetails />}
        />

        <Route path="/tablets" element={<Tablets />} />
        <Route path="/accessories" element={<Accessories />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
