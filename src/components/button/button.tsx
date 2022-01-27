import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size: 'small' | 'medium' | 'large';
    colour: 'primary' | 'primary-light' | 'secondary' | 'tertiary';
}

const Button = ({ children, size, colour, ...props }: ButtonProps) => {
    return <button {...props}>{children}</button>;
};

export default Button;
