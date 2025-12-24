import {createContext, useContext, useState } from "react";

const WhatToShowContext = createContext({});

export const useWhatToShow = () => {
    return useContext(WhatToShowContext);
}  

export default function WhatToShowProvider({children}) {
    const [show, setShow] = useState("dashboard");

    return (
        <WhatToShowContext.Provider value={{show, setShow}}>
            {children}
        </WhatToShowContext.Provider>
    );
}