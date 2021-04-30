import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [isDarkTheme, setTheme] = useState(
    () => JSON.parse(localStorage.getItem("isDarkTheme")) || false
  );
  useEffect(() => {
    localStorage.setItem("isDarkTheme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);
  return (
    <ThemeContext.Provider value={{ isDarkTheme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
