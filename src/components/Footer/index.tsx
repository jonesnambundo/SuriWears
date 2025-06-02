import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 shadow-md">
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="min-h-16">
          <div className="flex justify-between items-center flex-col md:flex-row py-10">
            <h2 className="text-3xl font-bold text-white">
              Subscribe Our Newsletter
            </h2>
            <form className="md:w-1/3 w-full mt-8 md:mt-0 relative">
              <input
                type="text"
                placeholder="Enter your Email"
                className="py-4 px-4 rounded shadow-md w-full bg-white"
              />
              <button
                type="submit"
                className="bg-gray-200 py-3 px-4 rounded-full absolute right-3 top-1"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 text-white py-8">
        <div className="max-w-[1024px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div>
              <Link to="/">
                <h1 className="text-xl font-semibold my-4">SuriWear</h1>
              </Link>
              <p className="text-sm">
                Lorem, ipsum dolor sit amet consectetur numquam perferendis,
                modi laborum?
              </p>
              <div className="flex items-center gap-2 mt-5">
                <Facebook
                  size={40}
                  className="bg-white text-black rounded-md p-2 cursor-pointer"
                />
                <Twitter
                  size={40}
                  className="bg-white text-black rounded-md p-2 cursor-pointer"
                />
                <Youtube
                  size={40}
                  className="bg-white text-black rounded-md p-2 cursor-pointer"
                />
                <Instagram
                  size={40}
                  className="bg-white text-black rounded-md p-2 cursor-pointer"
                />
              </div>
            </div>

            <div className="text-sm">
              <h2 className="text-xl font-semibold my-4">Pages</h2>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/faqs">FAQs</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="text-sm">
              <h2 className="text-xl font-semibold my-4">Category</h2>
              <ul>
                <li>
                  <Link to="/category/electronics">Electronics</Link>
                </li>
                <li>
                  <Link to="/category/jewelery">Jewelery</Link>
                </li>
                <li>
                  <Link to="/category/mens-clothing">Men's Clothing</Link>
                </li>
                <li>
                  <Link to="/category/womens-clothing">Women's Clothing</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold my-4">Contact</h2>
              <div className="text-sm">
                <p>Rua Maria De Lordes Sodre Azevedo, 172, Brasil</p>
                <p>+35 91925561</p>
                <p>+35 91965581</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center text-xs py-4 text-white">
        <p>Copyright &copy; 2025 - SuriWear. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
