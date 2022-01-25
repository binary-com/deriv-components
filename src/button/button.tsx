import type { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: red;
    border: none;
    border-radius: 6px;
    padding: 24px;
    color: white;
`;

const Button = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
