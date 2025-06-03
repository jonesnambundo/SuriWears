import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

type Props = {
  products: Product[];
};

const ProductsList = ({ products }: Props) => {
  if (products.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto my-10 text-center text-gray-500">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-10">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              <ProductCard {...product} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
