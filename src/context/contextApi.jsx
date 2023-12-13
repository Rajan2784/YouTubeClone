import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { fetchDataFromApi } from "../utils/api";

export const context = createContext();

const AppContext = ({children}) => {
    const [loading,setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectCategories, setSelectCategories] = useState("New");
    const [mobileView, setMobileView] = useState(false);

    useEffect(()=>{
        fetchSelectedCategories(selectCategories);
    },[selectCategories]);

    const fetchSelectedCategories = (query) => {
        setLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then(({contents})=>{
            setSearchResults(contents)
            setLoading(false)
        })
    }

    return(
        <context.Provider value={{loading,searchResults,mobileView,setMobileView,setLoading,selectCategories,setSelectCategories}}>
            {children}
        </context.Provider>
    )
}

export default AppContext;