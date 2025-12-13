import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            ShopGara - A complete Ecommerce Platform
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Crafting modern design,fashion with creativity and Fast delivery. Building
            trust through innovation and design excellence.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors"
              >
                Vendors
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Our Work</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors"
              >
                Fashion
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors"
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors"
              >
                Grocery
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors"
              >
                Goods
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter for insights, updates, and offers.
          </p>
          <form className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg px-3 py-2 text-sm 
                         bg-gray-800 text-white placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium 
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-6">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} ShopGara
            rights reserved.
          </p>

          <div className="flex gap-4 mx-10">
            <a
              href="https://www.facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-3h2v-2c0-2 1.2-3.2 3-3.2.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2v1.8h2.5l-.4 3h-2v7A10 10 0 0 0 22 12" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm4.8-3.6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
