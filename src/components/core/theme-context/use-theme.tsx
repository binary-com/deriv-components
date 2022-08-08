import { useContext } from 'react';
import ThemeContext from './theme-context';

const useTheme = () => {
    return useContext(ThemeContext);
};

export default useTheme;
