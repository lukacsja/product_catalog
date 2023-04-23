import banner1 from '../banner-images/banner-1.jpg';
import banner2 from '../banner-images/banner-2.jpg';
import banner3 from '../banner-images/banner-3.jpg';
import banner1tablet from '../banner-images/banner-1-tablet_desktop.jpg';

export const bannerImagesMobile = [
  {
    name: banner1,
    path: '/phones',
    id: 1,
  },
  {
    name: banner2,
    path: '/tablets',
    id: 2,
  },
  {
    name: banner3,
    path: '/accessories',
    id: 3,
  },
];

export const bannerImagesTabletPlus = [
  {
    name: banner1tablet,
    path: '/phones',
    id: 4,
  },
  {
    name: banner1tablet,
    path: '/tablets',
    id: 5,
  },
  {
    name: banner1tablet,
    path: '/accessories',
    id: 6,
  },
  {
    name: banner1tablet,
    path: '/accessories',
    id: 7,
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
