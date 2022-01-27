import type { ButtonHTMLAttributes } from 'react';
import classes from './button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button className={classes.size_m} {...props}>
            {children}
        </button>
    );
};

export default Button;
