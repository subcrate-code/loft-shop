"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren
} from "react";

import { computeCartTotals } from "@/lib/pricing";
import { getProductImage, type Product } from "@/data/products";

type CartLine = {
  id: string;
  productSlug: Product["slug"];
  productTitle: string;
  bundleQuantity: number;
  bundlePrice: number;
  quantity: number;
  selectedOptions: string[];
  previewImage: string;
};

type CartState = {
  items: CartLine[];
  pulseKey: number;
  hydrated: boolean;
};

type AddCartItemInput = Omit<CartLine, "id" | "quantity" | "previewImage"> & {
  quantity?: number;
};

type CartContextValue = {
  items: CartLine[];
  hydrated: boolean;
  cartCount: number;
  cartUnits: number;
  cartTotal: number;
  pulseKey: number;
  addItem: (item: AddCartItemInput) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

type Action =
  | { type: "hydrate"; payload: CartLine[] }
  | { type: "add"; payload: AddCartItemInput }
  | { type: "update"; payload: { id: string; quantity: number } }
  | { type: "remove"; payload: { id: string } }
  | { type: "clear" };

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "loft-shop-cart";

function makeId(item: Pick<CartLine, "productSlug" | "bundleQuantity" | "selectedOptions">) {
  return [item.productSlug, item.bundleQuantity, ...item.selectedOptions].join("__");
}

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return {
        ...state,
        hydrated: true,
        items: action.payload
      };
    case "add": {
      const id = makeId(action.payload);
      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        return {
          ...state,
          pulseKey: state.pulseKey + 1,
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + (action.payload.quantity ?? 1)
                }
              : item
          )
        };
      }

      const next: CartLine = {
        ...action.payload,
        id,
        quantity: action.payload.quantity ?? 1,
        previewImage: getProductImage(action.payload.productSlug, action.payload.selectedOptions[0] || "placeholder")
      };

      return {
        ...state,
        pulseKey: state.pulseKey + 1,
        items: [next, ...state.items]
      };
    }
    case "update":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: Math.max(1, Math.min(25, action.payload.quantity))
                }
              : item
          )
          .filter((item) => item.quantity > 0)
      };
    case "remove":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id)
      };
    case "clear":
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  pulseKey: 0,
  hydrated: false
};

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      dispatch({
        type: "hydrate",
        payload: stored ? (JSON.parse(stored) as CartLine[]) : []
      });
    } catch {
      dispatch({ type: "hydrate", payload: [] });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    localStorage.setItem(storageKey, JSON.stringify(state.items));
  }, [state.hydrated, state.items]);

  const addItem = useCallback((item: AddCartItemInput) => {
    dispatch({ type: "add", payload: item });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: "remove", payload: { id } });
      return;
    }

    dispatch({ type: "update", payload: { id, quantity } });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "remove", payload: { id } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const totals = useMemo(
    () => computeCartTotals(state.items.map((item) => ({ bundlePrice: item.bundlePrice, quantity: item.quantity }))),
    [state.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      hydrated: state.hydrated,
      pulseKey: state.pulseKey,
      cartCount: state.items.reduce((sum, item) => sum + item.quantity, 0),
      cartUnits: state.items.reduce((sum, item) => sum + item.quantity * item.bundleQuantity, 0),
      cartTotal: totals.grandTotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart
    }),
    [addItem, clearCart, removeItem, state.hydrated, state.items, state.pulseKey, totals.grandTotal, updateQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
