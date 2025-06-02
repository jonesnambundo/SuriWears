import { Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, User } from "Lucide-react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  //user Toggle
  const handleUser = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <>
        <div className="py-4 shadow-md">
          <ul className="max-w-[1024px] mx-auto flex flex-wrap justify-between md:flex-row px-4 md:px-2 items-center relative">
            <div className="flex gap-4">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/">FAQs</Link>
              </li>
              <li>
                <Link to="/">Contact</Link>
              </li>
            </div>

            <div
              className={`${
                isOpen
                  ? "flex flex-col absolute right-0 md:right-0 top-12 z-10 bg-zinc-50 p-4 gap-4"
                  : "hidden"
              }`}
            >
              <li>
                <Link to="/">Sign</Link>
              </li>
              <li>
                <Link to="/">My Account</Link>
              </li>
            </div>
            <User
              size={40}
              className="bg-gray-200 p-2 text-black rounded cursor-pointer"
              onClick={handleUser}
            />
          </ul>
        </div>

        <nav className="max-w-[1024px] flex justify-between items-center container mx-auto md:py-6 px-2">
          <div className="flex items-center">
            <Link to="/">
              <h1 className="bg-gray-700 py-2 px-4 rounded">SuriWear</h1>
            </Link>
          </div>

          <form className="w-1/2 sm:block hidden">
            <input
              type="text"
              placeholder="Search Product"
              className="bg-zinc-100100 rounded-md border border-zinc-200 focus:outline-none py-3 px-3 w-full"
            />
          </form>

          <Link>
            <ShoppingCart
              size={54}
              className="cursor-pointer bg-gray-100 px-3 py-2 rounded-full"
            />
          </Link>
        </nav>
      </>
    </header>
  );
}

export default Header;
