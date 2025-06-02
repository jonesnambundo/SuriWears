import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/store";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../store/cartSlice";
import { Link } from "react-router-dom";

function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

   if (cartItems.length === 0)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2>Your Cart is Empty</h2>
          <p className="text-gray-600 mb-4">
            Add some Products to your Cart to see them here
          </p>
          <Link
            to="/"
            className="inline-block bg-zinc-200 px-6 py-2 rounded-lg hover:bg-zinc-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );

  return (
    <div className="max-w-[1024px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Shopping Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white lg:col-span-2 shadow-md p-4 rounded-md">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-fill rounded" />

              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    +
                  </button>
                  <div
                    className="ml-4 text-red-500 cursor-pointer"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    🗑️
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white shadow-md p-6 rounded-md">
            <h3 className="text-xl font-bold mb-4">Order summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>SubTotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 font-bold">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-zinc-200 px-6 py-3 rounded-lg hover:bg-zinc-300">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
