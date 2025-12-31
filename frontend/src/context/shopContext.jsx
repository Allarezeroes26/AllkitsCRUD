import { createContext } from "react";

export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {
    const value = {

    }

    return (
        <ShopContext.Provider>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider