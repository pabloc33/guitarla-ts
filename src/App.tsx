import { useEffect, useReducer } from "react";
import { Footer, Guitar, Header } from "./components";
import { cartReducer, initialState } from "./reducers/cart-reducer";

function App() {
  const [{ data, cart }, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Header cart={cart} dispatch={dispatch} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} dispatch={dispatch} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
