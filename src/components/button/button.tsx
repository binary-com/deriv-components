import type { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size: 'small' | 'medium' | 'large';
    colour: 'primary' | 'primary-light' | 'secondary' | 'tertiary';
}

const StyledButton = styled.button<ButtonProps>`
    border: none;
    border-radius: 4px;

    ${({ size }) => {
        switch (size) {
            case 'small':
                return css`
                    padding: 3px 8px;
                `;

            default:
            case 'medium':
                return css`
                    padding: 6px 16px;
                `;

            case 'large':
                return css`
                    padding: 10px 16px;
                `;
        }
    }}

    ${({ colour }) => {
        switch (colour) {
            case 'primary':
                return css`
                    background-color: #ff444f;
                    color: white;

                    &:hover {
                        background-color: #eb3e48;
                    }

                    &:disabled {
                        opacity: 0.32;
                    }
                `;
            case 'primary-light':
                return css`
                    background-color: rgba(255, 68, 79, 0.14);
                    color: #ff444f;

                    &:hover {
                        background-color: rgba(255, 68, 79, 0.24);
                    }

                    &:disabled {
                        opacity: 0.16;
                    }
                `;

            case 'secondary':
                return css`
                    border: 3px solid #333333;

                    &:hover {
                        background-color: rgba(0, 0, 0, 0.08);
                    }
                `;

            case 'tertiary':
                return css``;

            default:
                return css`
                    padding: 3px 8px;
                `;
        }
    }}
`;

const Button = ({ children, ...props }: ButtonProps) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
