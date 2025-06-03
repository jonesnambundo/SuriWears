import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data: Product) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        })
      );
      alert("Added to cart!");
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/" className="text-blue-600">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1024px] mx-auto px-4 py-8">
      <Link to="/" className="mb-8 inline-block text-blue-600">
        &larr; Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="shadow-md p-4 rounded w-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto rounded"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="mb-6">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Category</h3>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm">
              {product.category}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-zinc-200 px-8 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-zinc-300"
          >
            <ShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
