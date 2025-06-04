import { useEffect, useState, type JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { setSelectedCategory } from "../../store/cartSlice"; 
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

function Home(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const searchTerm = useSelector((state: RootState) => state.cart.searchTerm);
  const selectedCategory = useSelector((state: RootState) => state.cart.selectedCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    // Carregar as categorias da API
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data: string[]) => {
        setCategories(["All", ...data]); // Adiciona "All" à lista de categorias
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = "https://fakestoreapi.com/products"; 

    // Se uma categoria for selecionada, filtramos os produtos por categoria
    if (selectedCategory !== "All") {
      url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
    }

    // Carregar os produtos da API
    fetch(url)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [selectedCategory]); // Recarregar quando a categoria mudar

  const filteredBySearchTerm = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleCategoryClick(category: string) {
    dispatch(setSelectedCategory(category)); // Atualiza a categoria selecionada no Redux
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
              className={`py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-green-700 text-white"
                  : "bg-white text-black hover:bg-gray-200 border border-gray-300"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-xl font-semibold">
            Loading products...
          </div>
        ) : (
          <ProductsList products={filteredBySearchTerm} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
