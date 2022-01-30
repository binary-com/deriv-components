import type { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import classes from './button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'primary-light' | 'secondary';
    block?: boolean;
    dark?: boolean;
}

const Button = ({ children, block, color = 'primary', size = 'medium', ...props }: ButtonProps) => {
    return (
        <button className={classNames(classes.btn, classes[size], classes[color], block && classes.full)} {...props}>
            {children}
        </button>
    );
};

export default Button;
