import React from "react";
import { useState, useContext } from "react";

const SidebarContext = React.createContext();
const UpdateState = React.createContext();

export function useSidebar() {
    return useContext(SidebarContext)
};

export function useUpdateSidebar() {
    return useContext(UpdateState)
};

export function SidebarProvider({ children }) {

    const [sidebar, setSidebar] = useState(() => false)

    function toggleSidebar() {
        setSidebar((prevState) => !prevState)
    };

    return (
        <SidebarContext.Provider value={sidebar}>
            <UpdateState.Provider value={toggleSidebar}>
                {children}
            </UpdateState.Provider>
        </SidebarContext.Provider>
    )
}