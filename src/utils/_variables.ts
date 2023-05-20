import bannerMobileMain from '../banner-images/banner-1.jpg';
import mobilePhones from '../banner-images/banner-2.jpg';
import mobileTablets from '../banner-images/banner-3.jpg';
import bannerTabletMain from '../banner-images/banner-1-tablet_desktop.jpg';
import bannerAccessories from '../banner-images/banner-accessories.png';
import bannerPhones from '../banner-images/banner-phones.png';
import bannerTablets from '../banner-images/banner-tablets.png';

export const bannerImagesMobile = [
  {
    name: bannerMobileMain,
    path: '/phones',
    id: 1,
  },
  {
    name: mobileTablets,
    path: '/tablets',
    id: 2,
  },
  {
    name: mobilePhones,
    path: '/accessories',
    id: 3,
  },
];

export const bannerImagesTabletPlus = [
  {
    name: bannerTabletMain,
    path: '/phones',
    id: 4,
  },
  {
    name: bannerTablets,
    path: '/tablets',
    id: 5,
  },
  {
    name: bannerPhones,
    path: '/phones',
    id: 6,
  },
  {
    name: bannerAccessories,
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

export const getProductColors = (color: string) => {
  const customColors = [
    { customColor: 'gold', cssColor: '#F9E5C9' },
    { customColor: 'spacegray', cssColor: '#535150' },
    { customColor: 'silver', cssColor: '#EBEBE3' },
    { customColor: 'black', cssColor: '#1F2020' },
    { customColor: 'rosegold', cssColor: '#FAD7BD' },
    { customColor: 'white', cssColor: '#FFFFFF' },
    { customColor: 'red', cssColor: '#BA0C2E' },
    { customColor: 'yellow', cssColor: '#FFE681' },
    { customColor: 'green', cssColor: '#AEE1CD' },
    { customColor: 'purple', cssColor: '#B8AFE6' },
    { customColor: 'midnightgreen', cssColor: '#4E5851' },
    { customColor: 'coral', cssColor: '#EE7762' },
  ];

  const foundColor = customColors.find((item) => item.customColor === color);

  return foundColor?.cssColor;
};
