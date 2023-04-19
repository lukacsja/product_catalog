import banner1 from '../banner-images/banner-1.jpg';
import banner2 from '../banner-images/banner-2.jpg';
import banner3 from '../banner-images/banner-3.jpg';
import banner1tablet from '../banner-images/banner-1-tablet_desktop.jpg';

export const bannerImagesMobile = [
  {
    name: banner1,
    path: '/phones',
  },
  {
    name: banner2,
    path: '/tablets',
  },
  {
    name: banner3,
    path: '/accessories',
  },
];

export const bannerImagesTabletPlus = [
  {
    name: banner1tablet,
    path: '/phones',
  },
  {
    name: banner2,
    path: '/tablets',
  },
  {
    name: banner1,
    path: '/accessories',
  },
];

export const navItems: { name: string, path: string }[] = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'phones',
    path: '/phones',
  },
  {
    name: 'tablets',
    path: '/tablets',
  },
  {
    name: 'accessories',
    path: '/accessories',
  },
];
