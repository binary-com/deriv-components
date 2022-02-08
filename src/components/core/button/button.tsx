import type { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import css from './button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'large' | 'hero';
    color?: 'primary' | 'primary-light' | 'secondary' | 'tertiary';
    variant?: 'general' | 'hero';
    block?: boolean;
    dark?: boolean;
}

const Button = ({ children, block, dark, color = 'primary', size = 'medium', ...props }: ButtonProps) => {
    return (
        <button className={classNames(css.btn, css[size], css[color], block && css.full, dark && css.dark)} {...props}>
            {children}
        </button>
    );
};

export default Button;
