import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage/CartPage";
import Header from "./components/Header";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Checkout from "./pages/Checkout";

function App() {
  return (
   
     <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
     </Provider>
 
  );
}

export default App;
