import React, { useCallback, useContext } from "react";
import { ThemeContext } from "../state/ThemeContext";
import "./styles.css";

const Sun = () => <>&#9728;</>;
const Moon = () => <>&#9790;</>;

const ThemeToggle = () => {
  const { isDarkTheme, setTheme } = useContext(ThemeContext);
  const onToggle = useCallback(() => {
    setTheme((theme) => !theme);
  }, [setTheme]);

  const themeSymbol = isDarkTheme ? <Sun /> : <Moon />;
  return (
    <button className="theme-toggle" onClick={onToggle}>
      {themeSymbol}
    </button>
  );
};

export default ThemeToggle;
