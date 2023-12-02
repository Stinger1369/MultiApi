import { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';
// import { useTheme } from '../../contexts/ThemeContext';
import './ThemeControl.scss';

export default function ThemeControl() {
    const { color, light, dark, setTheme } = useContext(ThemeContext)
    // const { theme, toggleTheme } = useTheme()

    function handleSetTheme() {
        const body = document.body;
        if(color == 'light') {
            setTheme(theme => ({...theme, color: 'dark'}) );
            body.style.backgroundColor = dark;
        } else {
            setTheme(theme => ({...theme, color: 'light'}) );
            body.style.backgroundColor = light;
        }        
    }

    return <>
        <button className='btn theme-control'
                // onClick={toggleTheme}
                onClick={handleSetTheme}
        >
            { 
                color == 'light' ? 
                <i className="bi bi-brightness-high-fill"></i> :
                <i className="bi bi-moon"></i>
            }       
        </button>
    </>
}