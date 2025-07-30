// store.js
import img1 from "../assets/catagoryImage/1.jpg";
import img2 from "../assets/catagoryImage/2.jpg";
import img3 from "../assets/catagoryImage/3.jpg";
import img4 from "../assets/catagoryImage/4.jpg";
import img5 from "../assets/catagoryImage/5.jpg";
import img6 from "../assets/catagoryImage/6.jpg";
import dhokraImage1 from '../assets/image/cos1.jpg'; 
import dhokraImage2 from '../assets/image/cos2.jpg';
import dhokraImage3 from '../assets/image/cos3.jpg';

const categories = [
  {
    name: "GI Bengal Dokra",
    image: img1,
    link: "/product/gi-bengal-dokra",
  },
  {
    name: "Pating Finish",
    image: img2,
    link: "/product/pating-finish-on-dokra",
  },
  {
    name: "Wall hanging",
    image: img3,
    link: "/product/wall-hanging",
  },
  {
    name: "Table Top",
    image: img4,
    link: "/product/table-top",
  },
  {
    name: "Home Decor",
    image: img5,
    link: "/product/home-decor",
  },
  {
    name: "Candle Stand",
    image: img6,
    link: "/product/candle-stands",
  },
];


export const slides = [
  {
    id: 1,
    image: 'https://5.imimg.com/data5/SELLER/Default/2024/9/453492298/VM/OQ/VY/232573763/dokra-dhokra-palki-tribal-art-03.jpg',
    alt: 'Dokra Artisan Crafting',
    title: 'Authentic Bengal Dokra Crafts',
    description: 'Handcrafted using ancient metalworking techniques',
  },
  {
    id: 2,
    image: 'https://punarnawa.com/cdn/shop/files/punarnawa-soul-of-artistry-dokra-decor-front-facing-dokra-craft-animals-the-pigeon-32440699289657.jpg?v=1705106304',
    alt: 'Traditional Dokra Products',
    title: 'Heritage Metal Artistry',
    description: 'Each piece tells a story of Bengal\'s rich culture',
  },
  {
    id: 3,
    image: 'https://folkcanvas.com/wp-content/uploads/2024/11/the-art-of-dhokra-handmadeinindia-housenama.jpg',
    alt: 'Handmade Metal Crafts',
    title: 'Timeless Dokra Creations',
    description: 'Preserving centuries-old craftsmanship',
  },
];


export const featuredProducts = [
  {
    id: 1,
    name: 'Dhokra Elephant Statue',
    maxprice: '2,499',
    price: '2,499',
    image: dhokraImage1,
  },
  {
    id: 2,
    name: 'Tribal Dhokra Wall Art',
    maxprice: '2,499',
    price: '1,799',
    image: dhokraImage2,
  },
  {
    id: 3,
    name: 'Premium Dhokra Jewelry Set',
    maxprice: '2,499',
    price: '5208',
    image: dhokraImage3,
  },
  {
    id: 4,
    name: 'Tribal Dhokra Wall Art',
    maxprice: '2,499',
    price: '1,799',
    image: dhokraImage2,
  },
  {
    id: 5,
    name: 'Premium Dhokra Jewelry Set',
    maxprice: '2,499',
    price: '5208',
    image: dhokraImage3,
  },
];

export const trendingProducts = [
  {
    id: 1,
    name: 'Dhokra Elephant Statue hihluhjoh ulhrjlhkjl hkjlerhkjlgr hlg hl',
    maxprice: '2,499',
    price: '1,899',
    rating: 4.8,
    image: dhokraImage1,
    link: '/product/dhokra-elephant'
  },
  {
    id: 2,
    name: 'Tribal Wall Hanging',
    maxprice: '1,799',
    price: '1,599',
    rating: 4.5,
    image: dhokraImage2,
    link: '/product/tribal-wall-hanging'
  },
  {
    id: 3,
    name: 'Dhokra Candle Stand',
    maxprice: '1,299',
    price: '1,799',
    rating: 4.7,
    image: dhokraImage3,
    link: '/product/candle-stand'
  },
  {
    id: 4,
    name: 'Dhokra Elephant Statue',
    maxprice: '2,499',
    price: '1,899',
    rating: 4.8,
    image: dhokraImage1,
    link: '/product/dhokra-elephant'
  },
];


export const navItems = [
    { name: "GI Bengal Dokra", path: "/product/gi-bengal-dokra" },
    { name: "Patina Finish on Dokra", path: "/product/patina-finish-on-dokra" },
    { name: "Wall hanging", path: "/product/wall-hanging" },
    { name: "Table Top", path: "/product/table-top" },
    { name: "Home Decore", path: "/product/home-decore" },
    { name: "Candle Stand", path: "/product/candle-stands" },
    { name: "Trending", path: "/product/trending" },
    { name: "Available Collection", path: "/product/available-collection" },
];

export const navItems2 = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload", path: "/dashboard/upload" },
    { name: "All Products", path: "/dashboard/all-products" },
    { name: "Trending", path: "/dashboard/trending" },
    { name: "Stock Products", path: "/dashboard/stock-products" },
    { name: "Upload Gallery", path: "/dashboard/upload-gallery" },
];

const store = {
  categories,
};

export default store;