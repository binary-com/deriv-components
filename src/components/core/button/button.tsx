import type { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import css from './button.module.scss';

export const button_size_type = ['small', 'medium', 'large', 'hero'];
export const button_color_type = ['primary', 'primary-light', 'secondary', 'tertiary'];

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: typeof button_size_type[number];
    color?: typeof button_color_type[number];
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
