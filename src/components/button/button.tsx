import type { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'primary-light' | 'secondary';
    block?: boolean;
    dark?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 4px;
    width: ${({ block }) => (block ? '100%' : 'fit-content')};
    ${({ size = 'medium', color = 'primary' }) => {
        switch (size) {
            case 'small':
                return css`
                    padding: 3px 8px;
                    ${['secondary', 'tertiary'].includes(color) && 'border-width: 1px;'}
                `;
            case 'medium':
                return css`
                    padding: 6px 16px;
                    ${['secondary', 'tertiary'].includes(color) && 'border-width: 1px;'};
                `;

            case 'large':
                return css`
                    padding: 10px 16px;
                    ${['secondary', 'tertiary'].includes(color) && 'border-width: 2px;'};
                `;
        }
    }}
    ${({ color = 'primary' }) => {
        switch (color) {
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
                    border-style: solid;
                    border-color: #999999;

                    &:hover {
                        background-color: rgba(0, 0, 0, 0.08);
                    }

                    &:disabled {
                        opacity: 0.32;
                    }
                `;
        }
    }};
`;

const Button = ({ children, ...props }: ButtonProps) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
