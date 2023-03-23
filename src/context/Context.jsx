import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [passid , setPassid] = useState("");
    return (
        <div>
            <Context.Provider value={{ auth, setAuth, passid, setPassid }}>
                {children}
            </Context.Provider>
        </div>
    )
}

export default AppContext
