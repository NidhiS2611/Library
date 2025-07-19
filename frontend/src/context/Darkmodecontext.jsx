import { createContext, useContext, useState, useEffect } from "react";

// 1. Context Create
export const Darkmodecontext = createContext();

// 2. Provider Component
export const Darkmodeprovider = ({ children }) => {
const [darkMode, setDarkMode] = useState(() => {
  const storedPref = localStorage.getItem("darkMode");
  return storedPref === "true"; // boolean return karo
});

  const Toggletheme = () => {
      setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode); // Save user preference
      return newMode;
    });
  };
   useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark'); // YAHI PE `dark` class lag rahi hai
    } else {
      root.classList.remove('dark'); // YAHI se hat rahi hai
    }
  }, [darkMode]);

  return (
    <Darkmodecontext.Provider value={{ darkMode, Toggletheme }}>
      {children}
    </Darkmodecontext.Provider>
  );
};


