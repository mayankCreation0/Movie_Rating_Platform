import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
    const [auth, setAuth] = useState(false);
    return (
        <div>
            <Context.Provider value={{ auth, setAuth }}>
                {children}
            </Context.Provider>
        </div>
    )
}

export default AppContext
