import { useEffect, useMemo, useState } from "react";
import { CartItem, GuitarI } from "../interfaces/interfaces";
import { db } from "../data/data";

export const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");

    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: GuitarI) {
    const itemExit = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExit >= 0) {
      //existe en el carrito
      if (cart[itemExit].quantity >= MAX_ITEMS) return;
      const updateCart = [...cart];
      updateCart[itemExit].quantity++;
      setCart(updateCart);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  }

  function removeFromCart(id: GuitarI["id"]) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id: GuitarI["id"]) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCart(updateCart);
  }

  function decreaseQuantity(id: GuitarI["id"]) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCart(updateCart);
  }

  function clearCart() {
    setCart([]);
  }

  // State Derivado
  const isNotEmpty = useMemo(() => cart.length > 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    //* Properties
    cart,
    data,
    isNotEmpty,
    cartTotal,
    //* Methods
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
};
