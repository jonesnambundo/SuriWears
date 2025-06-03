import { useEffect, useState, type JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import ProductsList from "../../components/ProductsList";
import Footer from "../../components/Footer";

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
  const [loading, setLoading] = useState(true); // Estado de loading
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const searchTerm = useSelector((state: RootState) => state.cart.searchTerm);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const filteredByCategory = products.filter((product) => {
    if (selectedCategory === "All") return true;
    return product.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const filteredBySearchTerm = filteredByCategory.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleCategoryClick(category: string) {
    setSelectedCategory(category);
  }

  return (
    <div>
      <div className="bg"></div>
      <div className="max-w-[1280px] mx-auto my-10 px-4">
       <div className="flex flex-wrap gap-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`py-2 px-4 rounded-md text-black transition-all ease-in ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-gray-200 scale-105"
                  : "bg-gray-200 hover:bg-zinc-400 cursor-pointer"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-xl font-semibold">Loading products...</div>
        ) : (
          <ProductsList products={filteredBySearchTerm} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
