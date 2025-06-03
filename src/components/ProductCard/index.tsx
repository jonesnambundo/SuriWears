type Props = {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

function ProductCard({ title, price, description, image, category }: Props) {
  const getDescription = (description: string) => {
    if (description.length > 65) {
      return description.slice(0, 61) + "...";
    }
    return description;
  };
  return (
    <div className="shadow-lg border-2 border-zinc-200 rounded-md cursor-pointer max-w-sm">
      <div className="border-zinc-200 p-2 bg-white">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain rounded-md"
        />
      </div>

      <div className="bg-gray-50 p-4">
        <h2 className="text-lg font-semibold my-4 truncate">{title}</h2>

        <p className="text-sm text-zinc-500 pb-4">{getDescription(description)}</p>
        <h1 className="text-sm text-zinc-500 border-b-2 pb-4">{category}</h1>

        <div className="flex justify-between mt-4 items-center">
          <p className="text-xl font-semibold">${price.toFixed(2)}</p>
          <p>View Details</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
