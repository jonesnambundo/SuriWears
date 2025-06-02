import { useEffect, useState, type JSX } from "react";
import ProductsList from "../../components/ProductsList";
import Footer from "../../components/Footer";
import CartPage from "../CartPage/CartPage";


export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const categories: string[] = [
  "All",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

function Home(): JSX.Element {

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Filtra produtos ao mudar categoria
  function handleCategoryClick(category: string) {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        )
      );
    }
  }

  return (
    <div>
      <div className="bg"></div>
      <div className="max-w-[1024px] mx-auto my-10 px-4">
        <div className="flex gap-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`py-2 px-4 rounded-md text-black transition-all ease-in ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-yellow-100 scale-105"
                  : "bg-yellow-50 hover:bg-zinc-400 cursor-pointer"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <ProductsList products={filteredProducts} />
        <CartPage />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
