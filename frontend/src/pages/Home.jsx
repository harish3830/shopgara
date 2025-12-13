import { Link, useNavigate } from "react-router-dom";
import bags from "../assets/bags.jpg"
import causal from "../assets/casual.jpg"
import winterware from "../assets/winterware.jpg"
import shoes from "../assets/shoes.jpg"
import header from "../assets/header.jpg"
import shoe from "../assets/shoe.jpg"
import jacket from "../assets/jacket.jpg"
import hoodie from "../assets/hoodie.jpg"
import street from "../assets/street.jpg"
import Footer from "../components/Footer";
const offers = [
  {
    title: "Premium Winter Wear",
    desc: "Stylish jackets, sweaters and hoodies designed for warmth.",
    img : winterware
  },
  {
    title: "Footwear & Sneakers",
    desc: "Choose from 100+ trending sneaker styles.",
    img: shoes,
  },
  {
    title: "Bags & Accessories",
    desc: "Modern bags and accessories to complete your outfit.",
    img: bags,
  },
  {
    title: "Daily Wear Fashion",
    desc: "Handpicked everyday outfits for men and women.",
    img: causal ,
  },
];

const categories = [
  {
    name: "Hoodies",
    img: hoodie,
  },
  {
    name: "Sneakers",
    img: shoe,
  },
  {
    name: "Jackets",
    img: jacket,
  },
  {
    name: "Streetwear",
    img: street,
  },
];

const newArrivals = [
  {
    title: "Classic White Sneakers",
    price: "₹2,299",
    img: shoe,
  },
  {
    title: "Winter Fur Jacket",
    price: "₹3,799",
    img: jacket,
  },
  {
    title: "Premium Brown Bag",
    price: "₹1,999",
    img: bags,
  },
  {
    title: "Oversized Hoodie",
    price: "₹1,299",
    img: hoodie,
  },
];

export default function Home() {
  const navigate = useNavigate();

  const openCategory = (name) => {
    navigate(`/products?category=${name.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#f3f5fa]">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 pt-20">
        <div className="flex flex-col justify-center space-y-4">
          <p className="font-semibold text-gray-600">WINTER COLLECTION</p>

          <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
            CHOOSE YOUR <br />
            WINTER <span className="bg-lime-300 px-2 italic">LOOK</span> CAMPAIGN
          </h1>

          <p className="text-gray-600 text-lg">
            Fresh winter fashion curated for comfort, warmth & modern style.
          </p>

          <Link to="/products">
            <button className="w-fit bg-black text-white px-8 py-3 rounded-xl text-lg font-medium mt-4">
              Shop Now
            </button>
          </Link>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img
            src= {header}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </section>

      {/* OFFERS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Offer</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <img src={item.img} className="rounded-xl h-52 w-full object-cover" alt="" />
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">Trending Categories</h2>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => openCategory(cat.name)}
              className="min-w-[200px] bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition"
            >
              <img src={cat.img} className="h-40 w-full object-cover" alt="" />
              <h4 className="text-center py-3 font-semibold">{cat.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-lg">
              <img src={item.img} className="rounded-xl h-56 w-full object-cover" alt="" />
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="font-bold mt-2">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO */}
      <section className="max-w-6xl mx-auto bg-black rounded-3xl overflow-hidden my-16">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1400&q=80"
            className="w-full h-[300px] object-cover opacity-60"
            alt=""
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-bold">Winter Sale 50% OFF</h2>
            <p className="mt-2 text-gray-300">
              Limited time only — shop before it's gone!
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src= {header}
            className="rounded-3xl shadow-lg"
            alt=""
          />

          <div>
            <h2 className="text-3xl font-bold">About ShopGara</h2>
            <p className="text-gray-600 text-lg mt-4">
              ShopGara is a modern fashion marketplace focused on premium quality,
              verified vendors, and fast delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-10">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-xl font-bold">✔ Verified Vendors</h3>
            <p className="text-gray-600 mt-2">Every seller is verified for quality.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-xl font-bold">✔ Fast Delivery</h3>
            <p className="text-gray-600 mt-2">Get products quickly with tracking.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-xl font-bold">✔ Quality Assurance</h3>
            <p className="text-gray-600 mt-2">Top-notch quality ensured.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 text-center">
        <div>
          <h3 className="text-4xl font-bold text-blue-600">10k+</h3>
          <p className="text-gray-600 mt-2">Happy Customers</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-blue-600">1.2k+</h3>
          <p className="text-gray-600 mt-2">Products</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-blue-600">80+</h3>
          <p className="text-gray-600 mt-2">Verified Vendors</p>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="p-6 bg-gray-100 rounded-xl shadow-md">
            <p>“Amazing quality and fast delivery. Love the winter styles!”</p>
            <h4 className="mt-3 font-semibold">— Priya Sharma</h4>
          </div>

          <div className="p-6 bg-gray-100 rounded-xl shadow-md">
            <p>“Great pricing and verified sellers. Highly recommended!”</p>
            <h4 className="mt-3 font-semibold">— Arjun Mehta</h4>
          </div>

          <div className="p-6 bg-gray-100 rounded-xl shadow-md">
            <p>“ShopGara is my go-to for winter shopping now!”</p>
            <h4 className="mt-3 font-semibold">— Meera Kapoor</h4>
          </div>
        </div>
      </section>
    <Footer/>
    </div>
  );
}
