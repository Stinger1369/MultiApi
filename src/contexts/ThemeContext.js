// Import
import { createContext, useContext, useState } from "react";

// Declare
const ThemeContext = createContext();
export default ThemeContext;

// -------------------------------
// HOOK personalisé
// -------------------------------
// export const ThemeProvider = ({ children }) => {
    // const [theme, setTheme] = useState( {color: 'light', light: '#e8f1f5ab', dark: '#080110d9'} ) 
    // const toggleTheme = () => {
    //     setTheme(theme => (
    //         {
    //             ...theme,
    //             color: (color === 'light' ? 'dark' : 'light')
    //         }
    //     ));
    // };

//     const [theme, setTheme] = useState('light'); // 'light' est la valeur par défaut
//     const toggleTheme = () => {
//         setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };


// Hook personnalisé pour utiliser le contexte
// const useTheme = () => useContext(ThemeContext);
// export default useTheme;