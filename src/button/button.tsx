import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { styled } from 'goober';

const StyledButton = styled('button')`
    border: none;
    background-colour: red;
    color: white;
`;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variants?: string;
    children: ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};
