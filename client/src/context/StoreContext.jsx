import { createContext, useState } from "react";

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
    };

    return (
        <StoreContext.Provider value={{ cart, addToCart }}>
            {children}
        </StoreContext.Provider>
    );
}