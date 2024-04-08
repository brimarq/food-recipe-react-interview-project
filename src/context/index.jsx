import { createContext } from "react";
import PropTypes from "prop-types";
import { useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await res.json();

      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
      }

      console.log(`DATA:`, data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }

    console.log(loading, recipeList);
  }

  return (
    <GlobalContext.Provider
      value={{ searchParam, loading, recipeList, setSearchParam, handleSubmit }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalState.propTypes = {
  children: PropTypes.node,
};
